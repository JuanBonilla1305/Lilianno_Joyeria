import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const addItem = (item, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i._id === item._id);
      if (existing) {
        return prev.map((i) =>
          i._id === item._id ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [...prev, { ...item, qty }];
    });
  };

  const updateQty = (id, qty) => {
    setItems((prev) =>
      prev.map((i) => (i._id === id ? { ...i, qty } : i))
    );
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((i) => i._id !== id));
  };

  const clearCart = () => setItems([]);

  const subtotal = items.reduce((acc, i) => acc + i.precio * i.qty, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, updateQty, removeItem, clearCart, subtotal }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
