import React, { useMemo, useState } from "react";
import ReactDOM from "react-dom/client";
import Body from "./components/Body";
import Header from "./components/Header";

const App = () => {
  const [query, setQuery] = useState("chicken");
  const [cartItems, setCartItems] = useState({});

  const cartCount = useMemo(() => {
    return Object.values(cartItems).reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  const addToCart = (meal) => {
    setCartItems((prev) => {
      const existing = prev[meal.id];
      const nextQuantity = existing ? existing.quantity + 1 : 1;
      return {
        ...prev,
        [meal.id]: {
          ...meal,
          quantity: nextQuantity,
        },
      };
    });
  };

  const updateQuantity = (mealId, nextQuantity) => {
    setCartItems((prev) => {
      if (nextQuantity <= 0) {
        const { [mealId]: _, ...rest } = prev;
        return rest;
      }
      return {
        ...prev,
        [mealId]: {
          ...prev[mealId],
          quantity: nextQuantity,
        },
      };
    });
  };

  const clearCart = () => setCartItems({});

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Header query={query} onQueryChange={setQuery} cartCount={cartCount} />
      <Body
        query={query}
        cartItems={cartItems}
        onAddToCart={addToCart}
        onUpdateQuantity={updateQuantity}
        onClearCart={clearCart}
      />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
