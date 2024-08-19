import axios from "axios";
import { createContext, useContext, useState } from "react";
import { UserContext } from "./UserContext";

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  const { token } = useContext(UserContext);
  const headers = { token };

  const [numberOfCartItems, setNumberOfCartItems] = useState(0);

  function addProductToCart(productId) {
    return axios
      .post(`${import.meta.env.VITE_BASE_URL}/cart`, { productId }, { headers })
      .then((data) => {
        setNumberOfCartItems(data.data.numOfCartItems);
        return data.data;
      })
      .catch((error) => error.response.data.message);
  }

  function removeItemFromCart(productId) {
    return axios
      .delete(`${import.meta.env.VITE_BASE_URL}/cart/${productId}`, { headers })
      .then((data) => {
        console.log(data);
        
        setNumberOfCartItems(data.numOfCartItems);
        return data.data;
      })
      .catch((error) => error);
  }

  return (
    <CartContext.Provider
      value={{ numberOfCartItems, addProductToCart, removeItemFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
