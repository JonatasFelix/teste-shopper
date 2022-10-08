import GlobalContext from '../context/GlobalContext';
import React, { useState, useEffect, useCallback } from 'react';
import { getShoppingCartList } from '../services/getShoppingCartList';

export default function GlobalProvider({ children }) {
    
  const [shoppingCart, setShoppingCart] = useState([]);
  const [loaderCart, setLoaderCart] = useState(false);
  const [cartError, setCartError] = useState(false);

  useEffect(() => {
    getShoppingCartList(setLoaderCart, setShoppingCart, setCartError);
  }, []);

  const states = { shoppingCart, cartError, loaderCart };
  const setters = { setShoppingCart, setLoaderCart, setCartError };
  const data = { states, setters };

  return (
    <GlobalContext.Provider value={data}>{children}</GlobalContext.Provider>
  );
}