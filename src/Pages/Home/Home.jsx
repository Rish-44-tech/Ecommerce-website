import Header from "../../Components/Header";
import "./Home.css";
import ProductsGrid from "./ProductsGrid";

export default function Home({ cart }) {
  return (
    <>
      <link rel="icon" href="images/home-favicon.png" />
      <Header cart={cart} />
      <div className="home-page">
        <ProductsGrid />
      </div>
    </>
  );
}
