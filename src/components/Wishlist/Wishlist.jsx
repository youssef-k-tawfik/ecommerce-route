// import Style from './Wishlist.module.css';

import { useContext, useEffect, useState } from "react";
import { WishlistContext } from "../../context/WishlistContext";
import ButtonAddToCart from "../ButtonAddToCart/ButtonAddToCart";
import { FaTrash } from "react-icons/fa";
import Loading from "../Loading/Loading";

export default function Wishlist() {
  const { wishlistProducts, removeProductFromWishlist, isFetching } =
    useContext(WishlistContext);
  const [products, setProducts] = useState([]);
  console.log(isFetching);

  useEffect(() => {
    setProducts(wishlistProducts);
  }, [wishlistProducts]);

  function handleRemoveFromWishlist(productID) {
    removeProductFromWishlist(productID);
  }

  if (isFetching)
    return (
      <>
        <h2 className="text-center">Wishlist</h2>
        <Loading />
      </>
    );

  if (!products?.length)
    return (
      <>
        <h2 className="text-center">Wishlist</h2>
        <div className="text-center">Your wishlist is empty</div>
      </>
    );

  return (
    <>
      <h2 className="text-center">Wishlist</h2>
      {products?.map((product) => (
        <div
          key={product.id}
          className="flex justify-between items-center border-b-[1px] border-gray-300 py-16"
        >
          <div className="productDetails flex items-center gap-4">
            <div className="max-w-48">
              <img src={product.imageCover} className="w-full block" />
            </div>
            <div>
              <h3>{product.title}</h3>
              <p className="my-2">{product.price} EGP</p>
              <button
                className="flex items-center gap-1 text-red-600"
                onClick={() => handleRemoveFromWishlist(product.id)}
              >
                <FaTrash /> Remove
              </button>
            </div>
          </div>
          <div
            onClick={() => handleRemoveFromWishlist(product.id)}
            className="min-w-[115px]"
          >
            <ButtonAddToCart productID={product.id} />
          </div>
        </div>
      ))}
    </>
  );
}
