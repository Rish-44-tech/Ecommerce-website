import { Link, useNavigate, useSearchParams } from "react-router";
import { useState } from "react";
import "./Header.css";
import logo_white from "../assets/images/logo-white.png";
import mob_logo_white from "../assets/images/mobile-logo-white.png";
import cart_icon from "../assets/images/icons/cart-icon.png";
import search from "../assets/images/icons/search-icon.png";

export default function Header({ cart }) {
  const nav = useNavigate();

  const [searchParams] = useSearchParams();
  const searches = searchParams.get("search");

  const [searchData, setSearchData] = useState(searches || null);

  let totalQuantity = 0;

  Object.entries(cart).forEach((cart_item) => {
    totalQuantity += cart_item[1].quantity;
  });

  return (
    <div className="header">
      <div className="left-section">
        <Link to="/" className="header-link">
          <img className="logo" src={logo_white} />
          <img className="mobile-logo" src={mob_logo_white} />
        </Link>
      </div>

      <div className="middle-section">
        <input
          className="search-bar"
          type="text"
          placeholder="Search"
          value={searchData || ""}
          onChange={(event) => {
            setSearchData(event.target.value);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              nav(`/?search=${searchData}`);
            }
          }}
        />

        <button
          className="search-button"
          onClick={() => {
            nav(`/?search=${searchData}`);
          }}
        >
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
