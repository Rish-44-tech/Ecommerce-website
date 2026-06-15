import axios from "axios";
import { Routes, Route } from "react-router";
import { useState,useEffect } from "react";
import Home from "./Pages/Home/Home.jsx";
import Checkout from "./Pages/Checkout/Checkout.jsx";
import Orders from "./Pages/Orders.jsx";
import Tracking from "./Pages/Tracking.jsx";
import NotFound from "./Pages/NotFound.jsx";
import "./App.css";

function App() {
  const[cart,setCart]=useState([]);
  useEffect(()=>{
      axios.get("/api/cart-items?expand=product").then((response) =>{
      setCart(response.data);
    });
  },[]);
  return (
    <Routes>
      <Route path="/" element={<Home cart={cart}/>}></Route>
      <Route path="/checkout" element={<Checkout cart={cart}/>}></Route>
      <Route path="/orders" element={<Orders cart={cart}/>}></Route>
      <Route path="/tracking" element={<Tracking cart={cart}/>}></Route>
      <Route path="*" element={<NotFound cart={cart}/>}></Route>
    </Routes>
  );
}

export default App;
