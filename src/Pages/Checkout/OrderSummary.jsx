import axios from "axios";
import dayjs from "dayjs";
import formatPrice from "../../utils/money";
import DeliveryOptions from "./DeliveryOptions";

export default function OrderSummary({cart,deliveryOptions,loadCart,loadPaymentSummary}) {

  return (
    <div className="order-summary">
      {deliveryOptions.length > 0 &&
        cart.map((cartItem) => {
          const delOption = deliveryOptions.find((deliveryOption) => {
            return deliveryOption.id === cartItem.deliveryOptionId;
          });

          const deleteItem=async ()=>{
            await axios.delete(`/api/cart-items/${cartItem.productId}`);
            await loadCart();
            await loadPaymentSummary();
          }
          return (
            <div key={cartItem.productId} className="cart-item-container">
              <div className="delivery-date">
                Delivery date:{" "}
                {dayjs(delOption.estimatedDeliveryTimeMs).format(
                  "dddd, MMMM D",
                )}
              </div>

              <div className="cart-item-details-grid">
                <img className="product-image" src={cartItem.product.image} />

                <div className="cart-item-details">
                  <div className="product-name">{cartItem.product.name}</div>
                  <div className="product-price">
                    {formatPrice(cartItem.product.priceCents)}
                  </div>
                  <div className="product-quantity">
                    <span>
                      Quantity:{" "}
                      <span className="quantity-label">
                        {cartItem.quantity}
                      </span>
                    </span>
                    <span className="update-quantity-link link-primary">
                      Update
                    </span>
                    <span className="delete-quantity-link link-primary" onClick={deleteItem}>
                      Delete
                    </span>
                  </div>
                </div>
                <DeliveryOptions deliveryOptions={deliveryOptions} cartItem={cartItem} loadCart={loadCart} loadPaymentSummary={loadPaymentSummary}/>
              </div>
            </div>
          );
        })}
    </div>
  );
}
