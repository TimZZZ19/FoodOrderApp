import { useContext, useState } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import CartContext from "../../store/CartContenxt";
import Checkout from "./Checkout";

export default function Cart({ hideCart }) {
  const cartContext = useContext(CartContext);
  const [showCheckout, setShowCheckout] = useState(false);

  const totalAmount = `$${cartContext.totalAmount.toFixed(2)}`;
  const hasItems = cartContext.items.length > 0;

  const addCartItem = (item) => {
    cartContext.addItem({ ...item, amount: 1 });
  };

  const removeCartItem = (id) => {
    cartContext.removeItem(id);
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartContext.items.map((item) => (
        <CartItem
          {...item}
          key={item.id}
          addCartItem={addCartItem.bind(null, item)}
          removeCartItem={removeCartItem.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  const showCheckoutForm = () => {
    setShowCheckout(true);
  };

  const modalAction = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={hideCart}>
        Close
      </button>
      {hasItems && (
        <button className={classes["button"]} onClick={showCheckoutForm}>
          Order
        </button>
      )}
    </div>
  );

  const submitOrderHandler = (userData) => {
    fetch("https://foodapp-15506-default-rtdb.firebaseio.com/order.json", {
      method: "POST",
      body: JSON.stringify({ user: userData, orderedItems: cartContext.items }),
    });
  };

  return (
    <Modal hideCart={hideCart}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {showCheckout && (
        <Checkout onSubmit={submitOrderHandler} onCancel={hideCart} />
      )}
      {!showCheckout && modalAction}
    </Modal>
  );
}
