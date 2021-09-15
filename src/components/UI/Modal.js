import { createPortal } from "react-dom";
import classes from "./Modal.module.css";

const Backdrop = ({ onClick }) => {
  return <div className={classes.backdrop} onClick={onClick}></div>;
};

const ModalOverlay = ({ children }) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{children}</div>
    </div>
  );
};

const Modal = ({ onClose, children }) => {
  const overlay = document.getElementById("overlays");
  return (
    <>
      {createPortal(<Backdrop onClick={onClose} />, overlay)}
      {createPortal(<ModalOverlay>{children}</ModalOverlay>, overlay)}
    </>
  );
};

export default Modal;
