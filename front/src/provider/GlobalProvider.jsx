import GlobalContext from '../context/GlobalContext';
import React, { useState, useEffect } from 'react';
import { getShoppingCartList } from '../services/getShoppingCartList';

export default function GlobalProvider({ children }) {
  
  // ESTADO DO CARRINHO
  const [shoppingCart, setShoppingCart] = useState([]);

  // ESTADO DO LOADER DO CARRINHO   
  const [loaderCart, setLoaderCart] = useState(false);

  // ESTADO DO ERRO DO CARRINHO
  const [cartError, setCartError] = useState(false);

  // ESTADO DO NOME DO USUÁRIO
  const [name, setName] = useState(localStorage.getItem("name")? localStorage.getItem("name") : "");


  // SETA O CARRINHO AO INICIAR A APLICAÇÃO
  useEffect(() => {
    getShoppingCartList(setLoaderCart, setShoppingCart, setCartError);
  }, []);

  
  // TODOS OS ESTADOS E FUNÇÕES QUE SERÃO DISPONÍVEIS PARA TODOS OS COMPONENTES
  const states = { shoppingCart, cartError, loaderCart, name };

  // TODOS OS SETADORES DE ESTADOS QUE SERÃO DISPONÍVEIS PARA TODOS OS COMPONENTES
  const setters = { setShoppingCart, setLoaderCart, setCartError, setName };

  // ENGLOBANDO TODOS OS ESTADOS E SETADORES DE ESTADOS EM UM OBJETO
  const data = { states, setters };

  return (
    <GlobalContext.Provider value={data}>{children}</GlobalContext.Provider>
  );
}