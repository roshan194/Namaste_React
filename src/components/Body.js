import { useEffect, useMemo, useState } from "react";
import Card from "./Card";
import Cart from "./Cart";

const derivePrice = (id) => {
  const seed = Number(String(id).slice(-3));
  const base = 8 + (seed % 11);
  return Number((base + 0.49).toFixed(2));
};

const mapMeal = (meal, fallbackCategory) => {
  return {
    id: meal.idMeal,
    name: meal.strMeal,
    image: meal.strMealThumb,
    category: meal.strCategory || fallbackCategory,
    area: meal.strArea,
    description: meal.strTags
      ? meal.strTags.split(",").slice(0, 2).join(" · ")
      : undefined,
    price: derivePrice(meal.idMeal),
  };
};

const Body = ({ query, cartItems, onAddToCart, onUpdateQuantity, onClearCart }) => {
  const [meals, setMeals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("Chicken");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;
    fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted) return;
        setCategories(data.categories || []);
      })
      .catch(() => {
        if (!isMounted) return;
        setCategories([]);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const trimmedQuery = query.trim();
    const endpoint = trimmedQuery
      ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(
          trimmedQuery
        )}`
      : `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(
          activeCategory
        )}`;

    setLoading(true);
    setError("");

    fetch(endpoint, { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => {
        const list = data.meals || [];
        const mapped = list.map((meal) => mapMeal(meal, activeCategory));
        setMeals(mapped);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setError("We could not load the menu. Please try again.");
        setLoading(false);
      });

    return () => controller.abort();
  }, [query, activeCategory]);

  const cartTotal = useMemo(() => {
    return Object.values(cartItems).reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );
  }, [cartItems]);

  return (
    <main className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 lg:grid-cols-[1.6fr_0.8fr]">
      <section className="space-y-6">
        <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 via-white/5 to-transparent p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold">Today’s menu</h2>
              <p className="text-sm text-slate-300">
                Fresh picks from the live MealDB API. Search for a dish or
                choose a category.
              </p>
            </div>
            <div className="rounded-full border border-amber-300/40 bg-amber-300/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-amber-200">
              ${cartTotal.toFixed(2)} in cart
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.slice(0, 10).map((category) => {
              const isActive = activeCategory === category.strCategory;
              return (
                <button
                  key={category.idCategory}
                  type="button"
                  onClick={() => setActiveCategory(category.strCategory)}
                  className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.2em] transition ${
                    isActive
                      ? "border-amber-300 bg-amber-300 text-slate-950"
                      : "border-white/10 bg-white/5 text-slate-300 hover:border-amber-300/60"
                  }`}
                >
                  {category.strCategory}
                </button>
              );
            })}
          </div>
          <p className="text-xs text-slate-400">
            Tip: category filters apply when the search box is empty.
          </p>
        </div>

        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={`skeleton-${index}`}
                className="h-64 animate-pulse rounded-3xl border border-white/5 bg-white/5"
              />
            ))}
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-sm text-red-200">
            {error}
          </div>
        ) : meals.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-slate-300">
            No meals found. Try a different search keyword.
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {meals.map((meal) => (
              <Card
                key={meal.id}
                image={meal.image}
                name={meal.name}
                description={meal.description}
                price={meal.price}
                area={meal.area}
                category={meal.category}
                onAdd={() => onAddToCart(meal)}
              />
            ))}
          </div>
        )}

        <p className="text-xs text-slate-500">
          Powered by the MealDB public API.
        </p>
      </section>

      <Cart
        items={cartItems}
        onUpdateQuantity={onUpdateQuantity}
        onClearCart={onClearCart}
      />
    </main>
  );
};

export default Body;
