import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";
import { useRef } from "react";

const MealItemForm = ({ id, onAddToCart }) => {
  const inputRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    const enteredAmount = parseInt(inputRef.current.value);
    if (enteredAmount >= 1) onAddToCart(enteredAmount);
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <Input
        label="Amount"
        ref={inputRef}
        input={{
          id: "amount_" + id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button type="submit">+ Add</button>
    </form>
  );
};

export default MealItemForm;
