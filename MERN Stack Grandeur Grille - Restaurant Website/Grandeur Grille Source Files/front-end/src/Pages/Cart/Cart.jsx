import React, { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { Link } from 'react-router-dom';  // import Link for routing
import './Cart.css';

const Cart = () => {
  const { cartItems, food_list, removeFromCart } = useContext(StoreContext);

  const cartEntries = food_list.filter(item => cartItems[item.id] > 0);

  const subtotal = cartEntries.reduce((acc, item) => {
    return acc + item.price * cartItems[item.id];
  }, 0);

  const deliveryFee = 2;
  const total = subtotal + deliveryFee;

  return (
    <div className='cart-icon'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Image</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Action</p>
        </div>
        <hr />
        {cartEntries.map((item) => (
          <div key={item.id}>
            <div className="cart-items-item">
              <img src={item.image} alt={item.name} />
              <p>{item.name}</p>
              <p>${item.price}</p>
              <p>{cartItems[item.id]}</p>
              <p>${(item.price * cartItems[item.id]).toFixed(2)}</p>
              <button className="remove-btn" onClick={() => removeFromCart(item.id)}>x</button>
            </div>
            <hr />
          </div>
        ))}
      </div>

      <div className="cart-bottom">
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
            <p className='total-amount'>Total</p>
            <p className='total-amount'>${total.toFixed(2)}</p>
          </div>
        </div>

        {cartEntries.length > 0 ? (
          <button className='cart-checkout'>Proceed to Checkout</button>
        ) : (
         <Link to="/" className="order-button">
  No items in your cart. Click here to start ordering 😋
</Link>

        )}
      </div>
    </div>
  );
};

export default Cart;
