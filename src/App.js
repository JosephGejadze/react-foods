// @modules
import { useState } from "react";

// @components
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";

const App = () => {
  const [cartShown, setCartShown] = useState(false);
  return (
    <>
      {cartShown && <Cart onClose={() => setCartShown(false)} />}
      <Header onCartClick={() => setCartShown(true)} />
      <main>
        <Meals />
      </main>
    </>
  );
};

export default App;
