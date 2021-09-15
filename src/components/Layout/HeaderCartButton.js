import classes from "./HeaderCartButton.module.css";
import CartIcon from "./CartIcon";
import { useEffect, useState } from "react";
import { useCart } from "../../hooks/useCart";

const HeaderCartButton = ({ onClick }) => {
  const [bump, setBump] = useState(false);

  const cart = useCart();
  const num = cart.items.reduce((curNum, item) => curNum + item.amount, 0);

  useEffect(() => {
    if (cart.items.length === 0) return;
    setBump(true);
    const timeout = setTimeout(() => {
      setBump(false);
    }, 300);
    return () => {
      clearTimeout(timeout);
    };
  }, [cart.items]);

  return (
    <button
      className={classes.button + ` ${bump ? classes.bump : ""}`}
      onClick={onClick}
    >
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{num}</span>
    </button>
  );
};

export default HeaderCartButton;
