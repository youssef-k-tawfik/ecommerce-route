// import Style from './ButtonAddToWishList.module.css';

import { useContext, useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { WishlistContext } from "../../context/WishlistContext";

export default function ButtonAddToWishList({ productID }) {
  const {
    wishlistIDs,
    addProductToWishlist,
    removeProductFromWishlist,
    isFetching,
  } = useContext(WishlistContext);
  const [redColor, setRedColor] = useState(false);

  useEffect(() => {
    wishlistIDs?.includes(productID) ? setRedColor(true) : setRedColor(false);
  }, [wishlistIDs, productID]);

  function handleHeartClick(productID) {
    if (redColor) {
      removeProductFromWishlist(productID);
    } else {
      addProductToWishlist(productID);
    }
  }

  return (
    <button
      onClick={() => handleHeartClick(productID)}
      disabled={isFetching}
      className="relative"
    >
      <FaHeart
        className={`text-2xl ${redColor ? "text-red-600" : "text-gray-300"}`}
      />
    </button>
  );
}
