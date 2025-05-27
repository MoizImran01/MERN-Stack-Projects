import React, { useContext } from 'react';
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../context/StoreContext';

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

  const handleAddToCart = (id) => {
    console.log(`Adding item with id: ${id}`);
    addToCart(id);
  };

  const handleRemoveFromCart = (id) => {
    console.log(`Removing item with id: ${id}`);
    removeFromCart(id);
  };

  console.log(`Rendering FoodItem with id: ${id}`);

  return (
    <div className={`food-item ${cartItems[id] ? 'expanded' : ''}`}>
      <div className='food-item--img-container'>
        <img className='food-item-image' src={url+'/images/'+image} alt={name} />
        {
          !cartItems[id] ? (
            <img
              className='add'
              onClick={() => handleAddToCart(id)}
              src={assets.add_icon_white}
              alt="Add"
            />
          ) : (
            <div className='food-item-counter'>
              <img
                onClick={() => handleRemoveFromCart(id)}
                src={assets.remove_icon_red}
                alt="Remove"
              />
              <p>{cartItems[id]}</p>
              <img
                onClick={() => handleAddToCart(id)}
                src={assets.add_icon_green}
                alt="Add"
              />
            </div>
          )
        }
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="Rating stars" />
        </div>
        <p className="food-item-descr">{description}</p>
        <p className="food-item-price">
          ${price}
        </p>
      </div>
    </div>
  );
};

export default FoodItem;
