import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import { useDispatch } from "react-redux";
import cartSlice from "../../../store/cart-slice";

const MealItem = ({ id, name, description, price }) => {
  const dispatch = useDispatch();
  const handleAddToCart = (amount) => {
    dispatch(cartSlice.actions.add({ id, name, price, amount }));
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{name}</h3>
        <div className={classes.description}>{description}</div>
        <div className={classes.price}>${price.toFixed(2)}</div>
      </div>
      <div>
        <MealItemForm id={id} onAddToCart={handleAddToCart} />
      </div>
    </li>
  );
};

export default MealItem;
