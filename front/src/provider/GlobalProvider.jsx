import GlobalContext from '../context/GlobalContext';
import React, { useState, useEffect } from 'react';
import { getShoppingCartList } from '../services/ShoppingCart/getShoppingCartList';
import { decodeToken } from "react-jwt";

export default function GlobalProvider({ children }) {

  const [shoppingCart, setShoppingCart] = useState([]);

  const [loaderCart, setLoaderCart] = useState(true);

  const [cartError, setCartError] = useState(false);

  const [token, setToken] = useState(localStorage.getItem("token") ? localStorage.getItem("token") : "");
  const [tokenPayload, setTokenPayload] = useState(decodeToken(token));

  useEffect(() => {
    if (tokenPayload) {
      getShoppingCartList(setLoaderCart, setShoppingCart, setCartError, token);
    }
  }, [token, tokenPayload]);

  useEffect(() => {
    setTokenPayload(decodeToken(token));
  }, [token]);

  const states = { shoppingCart, cartError, loaderCart, token, tokenPayload };

  const setters = { setShoppingCart, setLoaderCart, setCartError, setToken, setTokenPayload };

  const data = { states, setters };

  return (
    <GlobalContext.Provider value={data}>{children}</GlobalContext.Provider>
  );
};