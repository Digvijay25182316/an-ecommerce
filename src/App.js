import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cart from './components/Cart/Cart';
import CheckoutPage from './components/Cart/Checkout';
import OrderPage from './components/Cart/Order';
import LoginForm from './components/Auth/Login';
import Register from './components/Auth/Register';
import Profile from './components/Profile/Profile';
import ChangePassword from './components/Profile/ChangePassword';
import UpdateProfile from './components/Profile/UpdateProfile';
import ForgetPassword from './components/Auth/ForgetPassword';
import Products from './components/Products/Products';
import { ContextProvider } from './context/store';
import Users from './Admin/HandleUsers/Users';
import DashBoard from './Admin/DashBoard/DashBoard';
import Orders from './Admin/HandleOrder/Orders';
import ResetPassword from './components/Auth/ResetPassword';
import ConfirmOrder from './components/Cart/ConfirmOrder';
import CreateProduct from './Admin/CreateProduct/CreateProduct1';
import { Toaster } from 'react-hot-toast';
import Loading from './components/MainComponents/Loading';

export const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function App() {
  return (
    <ContextProvider>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order" element={<OrderPage />} />
            <Route path="/confirmorder" element={<ConfirmOrder />} />
            {/* Auth pages */}
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgetpassword" element={<ForgetPassword />} />
            <Route path="/resetpassword/:token" element={<ResetPassword />} />
            {/* products */}
            <Route path="/product/:id" element={<Products />} />
            {/* profile */}
            <Route path="/myprofile" element={<Profile />} />
            <Route path="/changepassword" element={<ChangePassword />} />
            <Route path="/updateprofile" element={<UpdateProfile />} />

            {/* Admin Routes */}
            <Route path="/admin/product" element={<CreateProduct />} />
            <Route path="/admin/users" element={<Users />} />
            <Route path="/admin/dashboard" element={<DashBoard />} />
            <Route path="/admin/orders" element={<Orders />} />
          </Routes>
          <Footer />
          <Toaster position="top-center" reverseOrder={false} />
          <Loading />
        </BrowserRouter>
      </ChakraProvider>
    </ContextProvider>
  );
}

export default App;
