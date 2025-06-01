import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../context/StoreContext';
import './PlaceOrder.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';



const PlaceOrder = () => {
  const navigate = useNavigate();
  const { cartItems, food_list, token, url} = useContext(StoreContext);

  const cartEntries = food_list.filter(item => cartItems[item._id] > 0);

  const [userData, setUserData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipCode:"",
    country:"",
    phone:"",
  })

const onChangeHandler = (event)=>{
  const name = event.target.name;
  const value = event.target.value;
  setUserData(data=>({...data, [name]:value}))

}

  const subtotal = cartEntries.reduce((acc, item) => {
    return acc + item.price * cartItems[item._id];
  }, 0);

  const deliveryFee = 2;
  const total = subtotal + deliveryFee;



  
  const handlePlaceOrder = async (event) => {
    event.preventDefault();

    let orderItems = [];
    food_list.map((item)=>{
      if(cartItems[item._id]>0){
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo)

      }
    })
    let orderData = {
      address:userData,
      items:orderItems,
      amount:total
    }
    let response = await axios.post(url+"/api/order/place", orderData, {headers:{token}})
    console.log(response)
    if(response.data.success)
    {
      const {session_url} = response.data
      window.location.replace(session_url)
    }
    else
    {
      alert("Error Placing Order")
    }
  };
useEffect(()=>{
if(!token || total===0)
{
  navigate("/cart")
}

}, [token, total])
  return (
    <form className='place-order-container' onSubmit={handlePlaceOrder}>
      <div className="place-order-left">
        <p className='title'>Delivery Information</p>
        <div className="multi-field-input">
          <input required name='firstName' onChange={onChangeHandler} value={userData.firstName} type='text' placeholder='First name'  />
          <input required name='lastName' onChange={onChangeHandler} value={userData.lastName} type='text' placeholder='Last name'  />
        </div>
        <input required name='email' onChange={onChangeHandler} value={userData.email} type="email" placeholder='Email address'  />
        <input required name='street' onChange={onChangeHandler} value={userData.street} type="text" placeholder='Street number'  />
        <div className="multi-field-input">
          <input required name='city' onChange={onChangeHandler} value={userData.city} type='text' placeholder='City' />
          <input required name='state' onChange={onChangeHandler} value={userData.state} type='text' placeholder='State' />
        </div> 
        <div className="multi-field-input">
          <input required name='zipCode' onChange={onChangeHandler} value={userData.zipCode} type='text' placeholder='Zip code' />
          <input required name='country' onChange={onChangeHandler} value={userData.country} type='text' placeholder='Country' />
        </div>
        <input required name='phone' onChange={onChangeHandler} value={userData.phone} type='text' placeholder='Phone number' />
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

   
    <button type='submit' className="cart-checkout-placeorder">Place Order</button>
  </div>
</div>

    </form>
  );
};

export default PlaceOrder;
