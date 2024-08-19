// import Style from './Cart.module.css';

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import Loading from "../Loading/Loading";
import ButtonRemoveCartItem from "../ButtonRemoveCartItem/ButtonRemoveCartItem";

export default function Cart() {
  const { token } = useContext(UserContext);
  const {
    data: CartItems,
    error,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["CartItems"],
    queryFn: () =>
      axios.get(`${import.meta.env.VITE_BASE_URL}/cart`, {
        headers: { token },
      }),
    select: (data) => data.data.data,
    staleTime: 50000,
  });

  if (isLoading) return <Loading />;

  console.log(CartItems);
  console.log(error);
  if (isError) return <p>{JSON.stringify(error)}</p>;

  return (
    <>
      <div className="text-2xl text-center">Cart</div>

      <div className="flex justify-between items-center mb-2">
        <p>
          Total Amount:{" "}
          <span className="text-green-400">
            {CartItems?.totalCartPrice} EGP
          </span>
        </p>
        <button className="btn bg-red-700 hover:bg-red-600">Clear Cart</button>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-16 py-3">
                <span className="sr-only">Image</span>
              </th>
              <th scope="col" className="px-6 py-3">
                Product
              </th>
              <th scope="col" className="px-6 py-3">
                Qty
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {CartItems?.products.map((item) => (
              <tr
                key={item?._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="p-4">
                  <img
                    src={item?.product?.imageCover}
                    className="w-16 md:w-32 max-w-full max-h-full"
                    alt={item?.product?.title}
                  />
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {item?.product?.title}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center">
                    <button
                      className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                      type="button"
                    >
                      <span className="sr-only">Quantity button</span>
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 2"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M1 1h16"
                        />
                      </svg>
                    </button>
                    <div>
                      <span className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        {item?.count}
                      </span>
                    </div>
                    <button
                      className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                      type="button"
                    >
                      <span className="sr-only">Quantity button</span>
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 18"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 1v16M1 9h16"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {item?.price} EGP
                </td>
                <td className="px-6 py-4">
                  <ButtonRemoveCartItem productID={item?._id}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
