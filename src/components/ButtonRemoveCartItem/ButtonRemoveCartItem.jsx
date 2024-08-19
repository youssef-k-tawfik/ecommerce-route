// import Style from './ButtonRemoveCartItem.module.css';

import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { useQueryClient } from "@tanstack/react-query";

export default function ButtonRemoveCartItem({ productID }) {
  const queryClient = useQueryClient();
  const { removeItemFromCart } = useContext(CartContext);

  async function removeItem(productID) {
    const response = await removeItemFromCart(productID);
    console.log(response);
    queryClient.invalidateQueries(["CartItems"]);
  }

  function handleRemoveClick(productID) {
    removeItem(productID);
  }

  return (
    <button
      onClick={() => handleRemoveClick(productID)}
      className="btn font-medium text-white bg-red-700 hover:bg-red-600"
    >
      Remove
    </button>
  );
}
