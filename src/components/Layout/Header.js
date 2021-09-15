import classes from "./Header.module.css";
import Meals from "../../assets/meals.jpg";
import HeaderCartButton from "./HeaderCartButton";

const Header = ({ onCartClick }) => {
  return (
    <>
      <header className={classes["header"]}>
        <h1>ReactMeals</h1>
        <HeaderCartButton onClick={onCartClick} />
      </header>
      <div className={classes["main-image"]}>
        <img src={Meals} alt="meals" />
      </div>
    </>
  );
};

export default Header;
