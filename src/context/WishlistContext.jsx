import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const WishlistContext = createContext();

export default function WishlistContextProvider({ children }) {
  const [wishlistIDs, setWishlistIDs] = useState([]);
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const { token } = useContext(UserContext);
  const headers = { token };

  const queryClient = useQueryClient();

  const { data: wishlistProductsResponse, isFetching } = useQuery({
    queryKey: ["wishlist"],
    queryFn: () =>
      axios.get(`${import.meta.env.VITE_BASE_URL}/wishlist`, { headers }),
    select: (data) => data.data.data,
    onError: (error) => console.log(error),
    enabled: !!token,
  });

  useEffect(() => {
    // set wishlistIDs
    const wishlistIDsFromProductsList = wishlistProductsResponse?.map(
      (product) => product.id
    );
    setWishlistIDs(wishlistIDsFromProductsList);

    // set wishlistProducts
    setWishlistProducts(wishlistProductsResponse);
  }, [wishlistProductsResponse]);

  function addProductToWishlist(productId) {
    return axios
      .post(
        `${import.meta.env.VITE_BASE_URL}/wishlist`,
        { productId },
        { headers }
      )
      .then((data) => {
        console.log(data.data.data);
        setWishlistIDs(data.data.data);
        queryClient.invalidateQueries({ queryKey: ["wishlist"] });
        return data.data.data;
      })
      .catch((error) => error.response.data.message);
  }

  function removeProductFromWishlist(productId) {
    return axios
      .delete(`${import.meta.env.VITE_BASE_URL}/wishlist/${productId}`, {
        headers,
      })
      .then((data) => {
        console.log(data.data.data);
        setWishlistIDs(data.data.data);
        queryClient.invalidateQueries({ queryKey: ["wishlist"] });
        return data.data.data;
      })
      .catch((error) => console.log(error));
  }

  return (
    <WishlistContext.Provider
      value={{
        addProductToWishlist,
        wishlistIDs,
        wishlistProducts,
        removeProductFromWishlist,
        isFetching,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
