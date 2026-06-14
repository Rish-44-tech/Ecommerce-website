import { Link } from "react-router";
import "./Header.css";
import logo_white from "../assets/images/logo-white.png";
import mob_logo_white from "../assets/images/mobile-logo-white.png";
import cart_icon from "../assets/images/icons/cart-icon.png";
import search from "../assets/images/icons/search-icon.png";

export default function Header({cart}) {
  let totalQuantity=0;
  cart.forEach((cart_item)=>{
    totalQuantity+=cart_item.quantity;
  })
  return (
    <div className="header">
      <div className="left-section">
        <Link to="/" className="header-link">
          <img className="logo" src={logo_white} />
          <img className="mobile-logo" src={mob_logo_white} />
        </Link>
      </div>

      <div className="middle-section">
        <input className="search-bar" type="text" placeholder="Search" />

        <button className="search-button">
          <img className="search-icon" src={search} />
        </button>
      </div>

      <div className="right-section">
        <Link className="orders-link header-link" to="/orders">
          <span className="orders-text">Orders</span>
        </Link>

        <Link className="cart-link header-link" to="/checkout">
          <img className="cart-icon" src={cart_icon} />
          <div className="cart-quantity">{totalQuantity}</div>
          <div className="cart-text">Cart</div>
        </Link>
      </div>
    </div>
  );
}
