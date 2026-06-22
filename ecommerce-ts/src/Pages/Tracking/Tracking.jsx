import axios from "axios";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import { useParams } from "react-router";
import Header from "../../Components/Header";
import "./Tracking.css";

export default function Tracking({ cart }) {
  const { orderId, productId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const getTrackingData = async () => {
      const response = await axios.get(
        `/api/orders/${orderId}?expand=products`,
      );
      setOrder(response.data);
    };
    getTrackingData();
  }, [orderId]);

  if (!order) {
    return null;
  }

  const product = order.products.find((product) => {
    return product.productId === productId;
  });

  const totalTimeMs=product.estimatedDeliveryTimeMs-order.orderTimeMs;
  const timePassedMs=dayjs().valueOf()-order.orderTimeMs;
  let deliveryPercent=(timePassedMs/totalTimeMs)*100;
  let message="Arriving on ";
  if(deliveryPercent>100){
    message="Delivered on ";
    deliveryPercent=100;
  }
  let isPreparing="";
  let isShipped="";
  let isDelivered="";

  if(deliveryPercent<33){isPreparing="current-status";}
  else if(deliveryPercent<100){isShipped="current-status";}
  else{isDelivered="current-status";}

  return (
    product != null && (
      <>
        <title>Tracking</title>
        <link rel="icon" href="images/tracking-favicon.png" />
        <Header cart={cart} />
        <div className="tracking-page">
          <div className="order-tracking">
            <Link className="back-to-orders-link link-primary" to="/orders">
              View all orders
            </Link>

            <div className="delivery-date">
              {message + dayjs(product.estimatedDeliveryTimeMs).format("dddd, MMMM D")}
            </div>

            <div className="product-info">{product.product.name}</div>

            <div className="product-info">Quantity: {product.quantity}</div>

            <img className="product-image" src={product.product.image} />

            <div className="progress-labels-container">
              <div className={`progress-label ${isPreparing}`}>Preparing</div>
              <div className={`progress-label ${isShipped}`}>Shipped</div>
              <div className={`progress-label ${isDelivered}`}>Delivered</div>
            </div>

            <div className="progress-bar-container">
              <div className="progress-bar" style={{width:`${deliveryPercent}%`}}></div>
            </div>
          </div>
        </div>
      </>
    )
  );
}
