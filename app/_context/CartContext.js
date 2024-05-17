'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(
    localStorage.getItem('savedCart')
      ? JSON.parse(localStorage.getItem('savedCart'))
      : []
  );

  useEffect(() => {
    localStorage.setItem('savedCart', JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};
