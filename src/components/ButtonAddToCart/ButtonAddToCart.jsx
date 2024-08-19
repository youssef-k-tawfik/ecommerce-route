// import Style from './ButtonAddToCart.module.css';

import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import toast from "react-hot-toast";

export default function ButtonAddToCart({ style = "", productID }) {
  const { addProductToCart } = useContext(CartContext);

  async function addToCart(productID) {
    toast.promise(addProductToCart(productID), {
      loading: "Loading",
      success: (data) => {
        console.log(data);
        return "Added!";
      },
      error: "Item wasn't added!",
    });
  }

  return (
    <button
      className={`bg-green-400 dark:bg-green-700 px-4 py-2 rounded-lg ${style}`}
      onClick={() => addToCart(productID)}
    >
      Add to cart
    </button>
  );
}
