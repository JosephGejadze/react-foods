import { useRef, useState, useCallback } from "react";

import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = ({ onCancel, onSubmit }) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    city: true,
    postal: true,
  });

  const nameRef = useRef();
  const streetRef = useRef();
  const postalRef = useRef();
  const cityRef = useRef();

  const handleConfirm = useCallback(
    (event) => {
      event.preventDefault();
      const name = nameRef.current.value;
      const street = streetRef.current.value;
      const postal = postalRef.current.value;
      const city = cityRef.current.value;

      const nameIsValid = !isEmpty(name);
      const streetIsValid = !isEmpty(street);
      const cityIsValid = !isEmpty(city);
      const postalIsValid = isFiveChars(postal);

      setFormInputsValidity({
        name: nameIsValid,
        street: streetIsValid,
        postal: postalIsValid,
        city: cityIsValid,
      });

      const formIsValid =
        nameIsValid && streetIsValid && cityIsValid && postalIsValid;

      if (!formIsValid) {
        // error
        return;
      }
      onSubmit({ name, street, postal, city });
    },
    [onSubmit]
  );

  return (
    <form className={classes.form} onSubmit={handleConfirm}>
      <div
        className={`${classes.control} ${
          formInputsValidity.name ? "" : classes.invalid
        }`}
      >
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameRef} />
        {!formInputsValidity.name && <p>Please, enter a valid name</p>}
      </div>
      <div
        className={`${classes.control} ${
          formInputsValidity.street ? "" : classes.invalid
        }`}
      >
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetRef} />
        {!formInputsValidity.street && <p>Please, enter a valid street</p>}
      </div>
      <div
        className={`${classes.control} ${
          formInputsValidity.postal ? "" : classes.invalid
        }`}
      >
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalRef} />
        {!formInputsValidity.postal && <p>Please, enter a valid postal code</p>}
      </div>
      <div
        className={`${classes.control} ${
          formInputsValidity.city ? "" : classes.invalid
        }`}
      >
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityRef} />
        {!formInputsValidity.city && <p>Please, enter a valid city</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
