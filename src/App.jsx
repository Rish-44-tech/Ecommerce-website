import { Routes, Route } from "react-router";
import Home from "./Pages/Home.jsx";
import Checkout from "./Pages/Checkout/Checkout.jsx";
import Orders from "./Pages/Orders.jsx";
import Tracking from "./Pages/Tracking.jsx";
import NotFound from "./Pages/NotFound.jsx";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/checkout" element={<Checkout />}></Route>
      <Route path="/orders" element={<Orders />}></Route>
      <Route path="/tracking" element={<Tracking/>}></Route>
      <Route path="*" element={<NotFound/>}></Route>
    </Routes>
  );
}

export default App;
