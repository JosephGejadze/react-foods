// @modules
import { useState } from "react";
import { useDispatch } from "react-redux";
import cartSlice from "../../store/cart-slice";
// @components
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
// @styles
import classes from "./Cart.module.css";
import { useCart } from "../../hooks/useCart";

const Cart = ({ onClose }) => {
  const [checkout, setCheckout] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const dispatch = useDispatch();
  const cart = useCart();

  const handleCartItemRemove = (id) => {
    dispatch(cartSlice.actions.remove({ id }));
  };

  const handleCartItemAdd = (item) => {
    dispatch(cartSlice.actions.add({ ...item, amount: 1 }));
  };

  const handleSubmitOrder = async (userData) => {
    setSubmitting(true);
    await fetch(
      "https://reactmeals-f07d1-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cart.items,
        }),
      }
    );
    setSubmitting(false);
    setSubmitted(true);
    dispatch(cartSlice.actions.clear());
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cart.items.map((item) => (
        <CartItem
          {...item}
          key={item.id}
          onAdd={handleCartItemAdd.bind(null, item)}
          onRemove={handleCartItemRemove.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  const cartModalContent = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>${cart.totalAmount.toFixed(2)}</span>
      </div>
      {checkout ? (
        <Checkout onCancel={onClose} onSubmit={handleSubmitOrder} />
      ) : (
        <div className={classes.actions}>
          <button className={classes["button--alt"]} onClick={onClose}>
            Close
          </button>
          {cart.items.length > 0 && (
            <button
              className={classes.button}
              onClick={() => setCheckout(true)}
            >
              Order
            </button>
          )}
        </div>
      )}
    </>
  );
  const submittingContent = <p>Sending order data...</p>;
  const submittedContent = <p>Order sent successfully!</p>;

  return (
    <Modal onClose={onClose}>
      {!submitting && !submitted && cartModalContent}
      {submitting && !submitted && submittingContent}
      {!submitting && submitted && submittedContent}
    </Modal>
  );
};

export default Cart;
