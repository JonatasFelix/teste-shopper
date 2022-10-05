import GlobalContext from '../context/GlobalContext';
import React, { useState, useEffect, useCallback } from 'react';

export default function GlobalProvider({ children }) {
    
  const [shoppingCart, setShoppingCart] = useState([]);
  const [loaderCard, setLoaderCard] = useState(false);


  useEffect(() => {
    setShoppingCart([{ id: 1, title: "Camiseta", price: 20, quantity: 1 }])
  }, []);

  const states = { shoppingCart };
  const setters = { setShoppingCart };
  const data = { states, setters };

  return (
    <GlobalContext.Provider value={data}>{children}</GlobalContext.Provider>
  );
}