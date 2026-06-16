import axios from "axios";
import { useNavigate } from "react-router";
import formatPrice from "../../utils/money";

export default function PaymentSummary({paymentSummary,loadCart}) {
  const navigate=useNavigate();

  const placeOrder=async ()=>{
    axios.post('/api/orders');
    loadCart();
    navigate('/orders');
  }

  return (
    <div className="payment-summary">
      <div className="payment-summary-title">Payment Summary</div>
      {paymentSummary != null && (
        <>
          <div className="payment-summary-row">
            <div>Items ({paymentSummary.totalItems}):</div>
            <div className="payment-summary-money">
              {formatPrice(paymentSummary.productCostCents)}
            </div>
          </div>

          <div className="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div className="payment-summary-money">
              {formatPrice(paymentSummary.shippingCostCents)}
            </div>
          </div>

          <div className="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div className="payment-summary-money">
              {formatPrice(paymentSummary.totalCostBeforeTaxCents)}
            </div>
          </div>

          <div className="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div className="payment-summary-money">
              {formatPrice(paymentSummary.taxCents)}
            </div>
          </div>

          <div className="payment-summary-row total-row">
            <div>Order total:</div>
            <div className="payment-summary-money">
              {formatPrice(paymentSummary.totalCostCents)}
            </div>
          </div>

          <button className="place-order-button button-primary" onClick={placeOrder}>
            Place your order
          </button>
        </>
      )}
    </div>
  );
}
