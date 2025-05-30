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

      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        try {
          await loadCartData(storedToken);
        } catch (cartError) {
          console.log("No cart data found or failed to load cart data:", cartError.response?.data || cartError.message);
          setCartItems({});
        }
      }
    } catch (error) {
      console.error("Error fetching food list:", error);
    }
  };

  fetchFoodList();
}, []);

const loadCartData = async (token)=>{
  try{
  const response = await axios.post(url+"/api/cart/get", {}, {headers:{token}})
  if(response.data.success)
  {
      setCartItems(response.data.cartData);
  }
  else
  {
    setCartItems({})
  }
  }
  catch(error)
{
  console.log("Unexpected Error occured getting cart data", error)
}

}
  const addToCart =  async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({...prev, [itemId]: 1 }));
    }
      else{
       setCartItems ((prev) => ({...prev, [itemId]:prev[itemId]+1}))
      }
      if(token)
      {
        await axios.post(url+"/api/cart/add", {itemId}, {headers:{token}})
      }
    console.log(`addToCart called with itemId: ${itemId}`);
 
  };

  const removeFromCart = async (itemId) => {
    console.log(`removeFromCart called with itemId: ${itemId}`);
    setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    if(token){
      await axios.post(url+"/api/cart/remove", {itemId}, {headers:{token}})
    }
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
