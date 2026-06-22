import axios from "axios";
import { Routes, Route } from "react-router";
import { useState, useEffect } from "react";
import Home from "./Pages/Home/Home";
import Checkout from "./Pages/Checkout/Checkout";
import Orders from "./Pages/Orders/Orders";
import Tracking from "./Pages/Tracking/Tracking";
import NotFound from "./Pages/Not Found/NotFound";
import "./App.css";

function App() {
  const [cart, setCart] = useState([]);
  const loadCart = async () => {
    const response = await axios.get("/api/cart-items?expand=product");
    setCart(response.data);
  };

  useEffect(() => {
    const getCartData = async () => {
      loadCart();
    };

    getCartData();
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={<Home cart={cart} loadCart={loadCart} />}
      ></Route>
      <Route
        path="/checkout"
        element={<Checkout cart={cart} loadCart={loadCart} />}
      ></Route>
      <Route
        path="/orders"
        element={<Orders cart={cart} loadCart={loadCart} />}
      ></Route>
      <Route
        path="/tracking/:orderId/:productId"
        element={<Tracking cart={cart} />}
      ></Route>
      <Route path="*" element={<NotFound cart={cart} />}></Route>
    </Routes>
  );
}

export default App;
