import dayjs from "dayjs";
import formatPrice from "../../utils/money";

export default function DeliveryOptions({ deliveryOptions, cartItem }) {
  return (
    <div className="delivery-options">
      <div className="delivery-options-title">Choose a delivery option:</div>
      {deliveryOptions.map((deliveryOption) => {
        return (
          <div className="delivery-option" key={deliveryOption.id}>
            <input
              type="radio"
              checked={deliveryOption.id === cartItem.deliveryOptionId}
              className="delivery-option-input"
              name={`delivery-option-${cartItem.productId}`}
            />
            <div>
              <div className="delivery-option-date">
                {dayjs(deliveryOption.estimatedDeliveryTimeMs).format(
                  "dddd, MMMM d",
                )}
              </div>
              <div className="delivery-option-price">
                {(deliveryOption.priceCents === 0 && "FREE ") ||
                  (deliveryOption.priceCents != 0 &&
                    `${formatPrice(deliveryOption.priceCents)} - `)}{" "}
                Shipping
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
