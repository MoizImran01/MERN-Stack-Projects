import React, { useContext, useEffect, useRef, useState } from 'react';
import './MyOrders.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../../assets/assets';
import { FiPackage, FiCheckCircle, FiXCircle, FiClock, FiTruck, FiCalendar } from 'react-icons/fi';

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);
  const hasFetched = useRef(false);

  const fetchOrders = async () => {
    try {
      const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } });
      setData(response.data.data);
    } catch (error) {
      console.log("Error fetching orders: ", error);
    }
  };
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    if (token && !hasFetched.current) {
      fetchOrders();
      hasFetched.current = true;
    }
  }, [token]);

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'food processing':
        return <FiClock className="status-icon processing" />;
      case 'out for delivery':
        return <FiTruck className="status-icon out-for-delivery" />;
      case 'delivered':
        return <FiCheckCircle className="status-icon delivered" />;
      case 'cancelled':
        return <FiXCircle className="status-icon cancelled" />;
      default:
        return <FiPackage className="status-icon default" />;
    }
  };

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {data.length === 0 ? (
          <div className="no-orders">
            <img src={assets.empty_cart} alt="No orders" />
            <p>You haven't placed any orders yet</p>
          </div>
        ) : (
          data.map((order, index) => (         
            <div key={index} className="my-orders-order">
              <img src={assets.parcel_icon} alt="parcel icon" />
              <p>Items:   <strong>{order.items.map((item, i) =>
                  i === order.items.length - 1
                    ? `${item.name} x ${item.quantity}`
                    : `${item.name} x ${item.quantity}, `
                )}</strong>
              </p>
              <p>Total:  <strong>${order.amount}</strong></p>
              <p>Items:  <strong>{order.items.length}</strong></p>
              <p className="order-status">
                <div className="order-status-container">
                   Order Status:  {getStatusIcon(order.status)}
                </div>
             
                <b>{order.status}</b>
              </p>
              <div className="order-date">
              
              <p>Ordered on : <strong>{formatDate(order.date)}</strong></p>
            </div>

             
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyOrders;