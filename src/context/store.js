// MyContext.js
import React, { createContext, useState } from 'react';

// Create a new context
const CartContext = createContext();

// Create a provider component
const ContextProvider = ({ children }) => {
  const [user, setUser] = useState([children]);

  const addToCart = item => {
    setUser([...user, item]);
  };

  const removeFromCart = item => {
    const updatedCart = user.filter(cartItem => cartItem !== item);
    setUser(updatedCart);
  };

  // Value object contains the data and functions to be shared
  const value = {
    user,
    addToCart,
    removeFromCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export { CartContext, ContextProvider };
