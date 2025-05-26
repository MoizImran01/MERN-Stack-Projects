import React, { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import './PlaceOrder.css';

const PlaceOrder = () => {
  const { cartItems, food_list } = useContext(StoreContext);

  const cartEntries = food_list.filter(item => cartItems[item.id] > 0);

  const subtotal = cartEntries.reduce((acc, item) => {
    return acc + item.price * cartItems[item.id];
  }, 0);

  const deliveryFee = 2;
  const total = subtotal + deliveryFee;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    alert('Order placed successfully!');
 
  };

  return (
    <form className='place-order-container' onSubmit={handlePlaceOrder}>
      <div className="place-order-left">
        <p className='title'>Delivery Information</p>
        <div className="multi-field-input">
          <input type='text' placeholder='First name' required />
          <input type='text' placeholder='Last name' required />
        </div>
        <input type="email" placeholder='Email address' required />
        <input type="text" placeholder='Street number' required />
        <div className="multi-field-input">
          <input type='text' placeholder='City' required />
          <input type='text' placeholder='State' required />
        </div>
        <div className="multi-field-input">
          <input type='text' placeholder='Zip code' required />
          <input type='text' placeholder='Country' required />
        </div>
        <input type='text' placeholder='Phone number' required />
      </div>

      <div className="place-order-right">
  <div className="cart-total">
    <h2>Cart Total</h2>
    <div className="cart-total-details">
      <p>Subtotal</p>
      <p>${subtotal.toFixed(2)}</p>
    </div>
    <hr />
    <div className="cart-total-details">
      <p>Delivery Fee</p>
      <p>${deliveryFee.toFixed(2)}</p>
    </div>
    <hr />
    <div className="cart-total-details">
      <p className="total-amount">Total</p>
      <p className="total-amount">${total.toFixed(2)}</p>
    </div>

   
    <button className="cart-checkout-placeorder">Place Order</button>
  </div>
</div>

    </form>
  );
};

export default PlaceOrder;
