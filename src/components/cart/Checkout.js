import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (text) => text.length === 0;
const hasFiveDigits = (zip) => zip.length === 5;

export default function Checkout({ onSubmit, onCancel }) {
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();

  const [formValidity, setFormValidity] = useState({
    nameIsValid: true,
    streetIsValid: true,
    postalIsValid: true,
    cityIsValid: true,
  });

  const submissionHandler = (e) => {
    e.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const nameIsValid = !isEmpty(enteredName);
    const streetIsValid = !isEmpty(enteredStreet);
    const postalIsValid = hasFiveDigits(enteredPostalCode);
    const cityIsValid = !isEmpty(enteredCity);

    const formIsValid =
      nameIsValid && streetIsValid && postalIsValid && cityIsValid;

    setFormValidity({ nameIsValid, streetIsValid, postalIsValid, cityIsValid });

    if (!formIsValid) return;

    onSubmit({
      name: enteredName,
      street: enteredStreet,
      postalCode: enteredPostalCode,
      city: enteredCity,
    });
  };

  return (
    <form className={classes.form} onSubmit={submissionHandler}>
      <div
        className={`${classes.control} ${
          !formValidity.nameIsValid && classes.invalid
        }`}
      >
        <label htmlFor="name">Your Name</label>
        <input id="name" type="text" ref={nameInputRef} />
        {!formValidity.nameIsValid && <p>Please enter a valid input</p>}
      </div>
      <div
        className={`${classes.control} ${
          !formValidity.streetIsValid && classes.invalid
        }`}
      >
        <label htmlFor="street">Street</label>
        <input id="street" type="text" ref={streetInputRef} />
        {!formValidity.streetIsValid && <p>Please enter a valid input</p>}
      </div>
      <div
        className={`${classes.control} ${
          !formValidity.postalIsValid && classes.invalid
        }`}
      >
        <label htmlFor="postal">Postal Code</label>
        <input id="postal" type="text" ref={postalCodeInputRef} />
        {!formValidity.postalIsValid && <p>Please enter a valid input</p>}
      </div>
      <div
        className={`${classes.control} ${
          !formValidity.cityIsValid && classes.invalid
        }`}
      >
        <label htmlFor="city">City</label>
        <input id="city" type="text" ref={cityInputRef} />
        {!formValidity.cityIsValid && <p>Please enter a valid input</p>}
      </div>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
      <button>Confirm</button>
    </form>
  );
}
