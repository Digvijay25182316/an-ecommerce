// MyContext.js
import toast from 'react-hot-toast';
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { createContext, useContext, useEffect, useState } from 'react';
import CookieFields from './utils';

// Create a new context
const CartContext = createContext();

// Create a provider component
const ContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [cartItem, setCartItem] = useState([]);
  const [user, setUser] = useState({});
  const [isloading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  console.log(cartItem);

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
      } else {
        setIsAdmin(false);
      }
    }
    setCartItem(CookieFields.getCartItem());
    // Clean up the interceptor on component unmount
    return () => {
      axios.interceptors.request.eject(requestInterceptor);
    };
  }, []);
  const addToCart = item => {
    const products = CookieFields.getProducts();
    if (!products) {
      const newProducts = [];
      newProducts.push({ id: item._id, quantity: 1 });
      const serializedArray = JSON.stringify(newProducts);
      // Set the cookie with the serialized array
      try {
        document.cookie = `CartItems=${encodeURIComponent(
          serializedArray
        )}; SameSite=None; Secure`;
      } catch (error) {
        console.log(error);
      }
    } else {
      const parsedProducts = JSON.parse(products);
      let itemExists = false;
      for (let i = 0; i < parsedProducts.length; i++) {
        if (parsedProducts[i].id === item._id) {
          // Increment the quantity of the existing item
          parsedProducts[i].quantity += 1;
          itemExists = true;
          break;
        }
      }

      if (!itemExists) {
        // Add the item to the cart with quantity 1
        parsedProducts.push({ id: item._id, quantity: 1 });
      }

      const serializedArray = JSON.stringify(parsedProducts);
      // Update the cookie with the updated serialized array
      document.cookie = `CartItems=${encodeURIComponent(
        serializedArray
      )}; SameSite=None; Secure`;
    }
  };

  const removeFromCart = item => {
    const updatedCart = cartItem.filter(cartItem => cartItem !== item);
    setCartItem(updatedCart);
  };

  const storeUser = data => {
    setIsAuthenticated(true);
    setUser(data.user);
    setToken(data.token);
    if (data.role === 'admin') {
      setIsAdmin(true);
    }
  };

  const successHandler = value => {
    if (value.message) {
      toast.success(value.message);
    }
    setIsLoading(false);
    setIsError(false);
    setIsSuccess(true);
  };
  const ErrorHandler = value => {
    if (value.response.data.message) {
      toast.error(value.response.data.message);
    } else if (value.message) {
      toast.error(value.message);
    } else {
      toast.error('Something bad has happend');
    }
    setIsLoading(false);
    setIsSuccess(false);
    setIsError(true);
  };
  const loadingHandler = value => {
    setIsLoading(value);
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
    loadingHandler,
    successHandler,
    ErrorHandler,
    isloading,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export { CartContext, ContextProvider };
