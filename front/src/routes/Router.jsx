import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from '../pages/HomePage/HomePage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import ShoppingCartPage from '../pages/ShoppingCartPage/ShoppingCartPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import SignupPage from '../pages/SignupPage/SignupPage';
import SubscriptionAddressPage from '../pages/SubscriptionAddressPage/SubscriptionAddressPage';
import OrdersPage from '../pages/OrdersPage/OrdersPage';
import OrdersDetailsPage from '../pages/OrdersDetailsPage/OrdersDetailsPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/loja" element={<HomePage />} />
        <Route path="/carrinho" element={<ShoppingCartPage />} />
        <Route path="/cadastro" element={<SignupPage />} />
        <Route path="/cadastro-endereco" element={<SubscriptionAddressPage />} />
        <Route path="/pedidos" element={<OrdersPage />} />
        <Route path="/pedidos/:id" element={<OrdersDetailsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;