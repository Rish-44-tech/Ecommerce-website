import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../../Components/Header";
import "./Home.css";
import ProductsGrid from "./ProductsGrid";

export default function Home({ cart }) {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    const getHomeData = async () => {
      const response = await axios.get("/api/products");
      setProducts(response.data);
    };
    getHomeData();
  }, []);

  return (
    <>
      <link rel="icon" href="images/home-favicon.png" />
      <Header cart={cart} />
      <div className="home-page">
        <ProductsGrid products={products} />
      </div>
    </>
  );
}
