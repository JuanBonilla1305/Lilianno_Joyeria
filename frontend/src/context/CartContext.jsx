import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem("cart_items");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Persistencia
  useEffect(() => {
    localStorage.setItem("cart_items", JSON.stringify(items));
  }, [items]);

  const addItem = (product, qty = 1) => {
    setItems(prev => {
      const ix = prev.findIndex(p => p._id === product._id);
      if (ix >= 0) {
        const copy = [...prev];
        copy[ix] = { ...copy[ix], qty: copy[ix].qty + qty };
        return copy;
      }
      return [...prev, { ...product, qty }];
    });
  };

  const removeItem = (id) => setItems(prev => prev.filter(p => p._id !== id));
  const clear = () => setItems([]);
  const updateQty = (id, qty) =>
    setItems(prev => prev.map(p => (p._id === id ? { ...p, qty: Math.max(1, qty) } : p)));

  const total = useMemo(
    () => items.reduce((acc, p) => acc + p.precio * p.qty, 0),
    [items]
  );

  const value = { items, addItem, removeItem, updateQty, clear, total };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
