import axios from "axios";
import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import Header from "../../Components/Header";
import "./Home.css";
import ProductsGrid from "./ProductsGrid";

export default function Home({ cart, loadCart }) {
  const [products, setProducts] = useState([]);

  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");

  useEffect(() => {
    const getHomeData = async () => {
      if (search) {
        const response=await axios.get(`/api/products?search=${search}`);
        setProducts(response.data);
      } else {
        const response = await axios.get("/api/products");
        setProducts(response.data);
      }
    };
    getHomeData();
  }, [search]);

  return (
    <>
      <link rel="icon" href="images/home-favicon.png" />
      <Header cart={cart} />
      <div className="home-page">
        <ProductsGrid products={products} loadCart={loadCart} />
      </div>
    </>
  );
}
