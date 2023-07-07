// MyContext.js
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { createContext, useContext, useEffect, useState } from 'react';

// Create a new context
const CartContext = createContext();

// Create a provider component
const ContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [cartItem, setCartItem] = useState([children]);
  const [user, setUser] = useState({});

  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(config => {
      const token = Cookies.get('token'); // Retrieve the authentication token from storage
      if (token) {
        setToken(token);
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
    const user = Cookies.get('user');
    if (user) {
      const user = JSON.parse(Cookies.get('user'));
      setUser(user);
      setIsAuthenticated(true);
      if (user.role === 'admin') {
        setIsAdmin(true);
      }
    }

    // Clean up the interceptor on component unmount
    return () => {
      axios.interceptors.request.eject(requestInterceptor);
    };
  }, []);

  const addToCart = item => {
    setCartItem([...cartItem, item]);
  };

  const removeFromCart = item => {
    const updatedCart = cartItem.filter(cartItem => cartItem !== item);
    setCartItem(updatedCart);
  };

  const storeUser = data => {
    setIsAuthenticated(true);
    setUser(data.user);
    setToken(data.token);
    if (data.user.role === 'admin') {
      setIsAdmin(true);
    }
  };

  const loggedout = () => {
    setIsAdmin(false);
    setIsAuthenticated(false);
    setToken('');
    setUser({});
  };

  // Value object contains the data and functions to be shared
  const value = {
    cartItem,
    addToCart,
    removeFromCart,
    loggedout,
    isAuthenticated,
    user,
    isAdmin,
    token,
    storeUser,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export { CartContext, ContextProvider };
export const UseUserContext = () => useContext(CartContext);
