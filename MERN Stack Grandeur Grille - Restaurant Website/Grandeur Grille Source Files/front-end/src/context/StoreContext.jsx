import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = "http://localhost:4000"
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([])
useEffect(() => {
  const fetchFoodList = async () => {
    try {
      const response = await axios.get(url + "/api/food/list");
      setFoodList(response.data.food_data);
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
      }
    } catch (error) {
      console.log("Error fetching food list ", error);
    }
  };

  fetchFoodList();
}, []);
  const addToCart = (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({...prev, [itemId]: 1 }));
    }
      else{
       setCartItems ((prev) => ({...prev, [itemId]:prev[itemId]+1}))
      }
    console.log(`addToCart called with itemId: ${itemId}`);
 
  };

  const removeFromCart = (itemId) => {
    console.log(`removeFromCart called with itemId: ${itemId}`);
    setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
  };

  useEffect(() => {
    console.log('Updated cartItems:', cartItems);
  }, [cartItems]);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    url,
    token,
    setToken
  }

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
