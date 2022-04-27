import { React, useReducer } from "react";
import CartContext from "./CartContenxt";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    // We always want to update the total price amount.
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    // Then we can grab the existing cart item in the items array,
    // it may or may not exist.
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];

    let updatedItems; // declare a copy of the items array for immutable updating

    // If the existing cart item exists, then:
    if (existingCartItem) {
      // first, update the existing item's amount immutably;
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      // copy the items array,
      updatedItems = [...state.items];
      // replace the updated item in the items array,
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      // If not, then just add the item immutably.
      updatedItems = state.items.concat(action.item);
    }

    return { items: updatedItems, totalAmount: updatedTotalAmount };
  }
  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      // const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex].amount--;
    }

    return { items: updatedItems, totalAmount: updatedTotalAmount };
  }

  return defaultCartState;
};

export default function CartProvider({ children }) {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    removeItem: (id) => dispatchCartAction({ type: "REMOVE", id: id }),
    addItem: (item) => dispatchCartAction({ type: "ADD", item: item }),
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}
