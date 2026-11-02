import { createContext, useContext, useEffect, useState } from "react";

const Store = createContext(null);

const load = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
};

export function StoreProvider({ children }) {
  const [cart, setCart] = useState(() => load("cart", []));
  const [favorites, setFavorites] = useState(() => load("favorites", []));

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

 const addToCart = (id) =>
  setCart((c) => (c.some((i) => i.id === id) ? c : [...c, { id, qty: 1 }]));
  const setQty = (id, qty) =>
    setCart((c) => (qty < 1 ? c.filter((i) => i.id !== id) : c.map((i) => (i.id === id ? { ...i, qty } : i))));
  const removeFromCart = (id) => setCart((c) => c.filter((i) => i.id !== id));
  const toggleFavorite = (id) =>
    setFavorites((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));

  const cartCount = cart.reduce((n, i) => n + i.qty, 0);

  return (
    <Store.Provider value={{ cart, favorites, addToCart, setQty, removeFromCart, toggleFavorite, cartCount }}>
      {children}
    </Store.Provider>
  );
}

export const useStore = () => useContext(Store);
