import GlobalContext from '../context/GlobalContext';
import React, { useState, useEffect } from 'react';
import { getShoppingCartList } from '../services/getShoppingCartList';

export default function GlobalProvider({ children }) {
    
  const [shoppingCart, setShoppingCart] = useState([]);
  const [loaderCart, setLoaderCart] = useState(false);
  const [cartError, setCartError] = useState(false);
  const [name, setName] = useState(localStorage.getItem("name")? localStorage.getItem("name") : "");

  useEffect(() => {
    getShoppingCartList(setLoaderCart, setShoppingCart, setCartError);
  }, []);

  const states = { shoppingCart, cartError, loaderCart, name };
  const setters = { setShoppingCart, setLoaderCart, setCartError, setName };
  const data = { states, setters };

  return (
    <GlobalContext.Provider value={data}>{children}</GlobalContext.Provider>
  );
}