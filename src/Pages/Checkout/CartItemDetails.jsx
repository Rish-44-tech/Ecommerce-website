import axios from "axios";
import { useState } from "react";
import formatPrice from "../../utils/money";
import DeliveryOptions from "./DeliveryOptions";

export default function CartItemDetails({
  cartItem,
  deliveryOptions,
  loadCart,
}) {
  const [updateQuantity, setUpdateQuantity] = useState(false);
  const [quantity, setQuantity] = useState(cartItem.quantity);

  const deleteItem = async () => {
    await axios.delete(`/api/cart-items/${cartItem.productId}`);
    await loadCart();
  };

  const update = async () => {
    if (updateQuantity) {
      await axios.put(`/api/cart-items/${cartItem.productId}`, {
        quantity: Number(quantity),
      });
      await loadCart();
    }
    setUpdateQuantity(!updateQuantity);
  };

  return (
    <div className="cart-item-details-grid">
      <img className="product-image" src={cartItem.product.image} />

      <div className="cart-item-details">
        <div className="product-name">{cartItem.product.name}</div>
        <div className="product-price">
          {formatPrice(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span>
            Quantity:
            {updateQuantity && (
              <input
                type="text"
                className="quantity-update-input"
                value={quantity}
                onChange={(event) => {
                  setQuantity(event.target.value);
                }}
                onKeyDown={(event)=>{
            if(event.key==="Enter"){
                console.log("hi");
                update();
            }
            else if(event.key==="Escape"){
                setQuantity(cartItem.quantity);
                setUpdateQuantity(false);
            }
          }}
              />
            )}
            <span className="quantity-label">{cartItem.quantity}</span>
          </span>
          <span className="update-quantity-link link-primary" onClick={update}>
            Update
          </span>
          <span
            className="delete-quantity-link link-primary"
            onClick={deleteItem}
          >
            Delete
          </span>
        </div>
      </div>
      <DeliveryOptions
        deliveryOptions={deliveryOptions}
        cartItem={cartItem}
        loadCart={loadCart}
      />
    </div>
  );
}
