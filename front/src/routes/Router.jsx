import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from '../pages/HomePage/HomePage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import ShoppingCartPage from '../pages/ShoppingCartPage/ShoppingCartPage';
import SearchPage from '../pages/SearchPage/SearchPage';

const Router = () => {
    return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path="/carrinho" element={<ShoppingCartPage />}/>
            <Route path="/busca" element={<SearchPage />}/>
            <Route path="*" element={<NotFoundPage />}/>
        </Routes>
      </BrowserRouter>
    );
  };
  
  export default Router;