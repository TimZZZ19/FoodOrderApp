import { React, useContext } from "react";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import CartContext from "../../../store/CartContenxt";

export default function MealItem({ id, name, description, price }) {
  const cartContext = useContext(CartContext);

  const styledPrice = `$ ${price.toFixed(2)}`;

  const addItemToCart = (amount) => {
    cartContext.addItem({
      id: id,
      name: name,
      amount: amount,
      price: price,
    });
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{name}</h3>
        <div className={classes.description}>{description}</div>
        <div className={classes.price}>{styledPrice}</div>
      </div>
      <div>
        <MealItemForm id={id} addItemToCart={addItemToCart} />
      </div>
    </li>
  );
}
