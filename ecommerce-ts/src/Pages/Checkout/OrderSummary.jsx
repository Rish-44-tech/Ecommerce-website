import dayjs from "dayjs";
import DeliveryOptions from "./DeliveryOptions";
import CartItemDetails from "./CartItemDetails";

export default function OrderSummary({cart,deliveryOptions,loadCart}) {

  return (
    <div className="order-summary">
      {deliveryOptions.length > 0 &&
        cart.map((cartItem) => {
          const delOption = deliveryOptions.find((deliveryOption) => {
            return deliveryOption.id === cartItem.deliveryOptionId;
          });

          return (
            <div key={cartItem.productId} className="cart-item-container">
              <div className="delivery-date">
                Delivery date:{" "}
                {dayjs(delOption.estimatedDeliveryTimeMs).format(
                  "dddd, MMMM D",
                )}
              </div>
              <CartItemDetails cartItem={cartItem} deliveryOptions={deliveryOptions} loadCart={loadCart}/>
            </div>
          );
        })}
    </div>
  );
}
