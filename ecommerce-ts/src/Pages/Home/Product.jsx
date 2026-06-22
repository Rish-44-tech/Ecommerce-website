import axios from "axios";
import { useState,useRef } from "react";
import formatPrice from "../../utils/money";
import checkmark from "../../assets/images/icons/checkmark.png";

export default function Product({ product, loadCart }) {
  const [quantity, setQuantity] = useState(1);
  const addedToCartDivRef=useRef(null);

  async function addToCart() {
    await axios.post("/api/cart-items", {
      productId: product.id,
      quantity: quantity,
    });
    await loadCart();
    addedToCartDivRef.current.style.opacity=100;
    setTimeout(()=>{addedToCartDivRef.current.style.opacity=0;},1500)
  }

  function selectQuantity(event) {
    const newQuantity = Number(event.target.value);
    setQuantity(newQuantity);
  }

  return (
    <div className="product-container" data-testid="product-container">
      <div className="product-image-container">
        <img className="product-image" data-testid="product-image" src={product.image} />
      </div>

      <div className="product-name limit-text-to-2-lines">{product.name}</div>

      <div className="product-rating-container">
        <img
          className="product-rating-stars"
          data-testid="product-rating-stars"
          src={"images/ratings/rating-" + product.rating.stars * 10 + ".png"}
        />
        <div className="product-rating-count link-primary">
          {product.rating.count}
        </div>
      </div>

      <div className="product-price">{formatPrice(product.priceCents)}</div>

      <div className="product-quantity-container">
        <select value={quantity} onChange={selectQuantity} data-testid="quantity-selector">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div className="product-spacer"></div>

      <div className="added-to-cart" ref={addedToCartDivRef}>
        <img src={checkmark} />
        Added to cart
      </div>

      <button className="add-to-cart-button button-primary" data-testid="add-to-cart-button" onClick={addToCart}>
        Add to Cart
      </button>
    </div>
  );
}
