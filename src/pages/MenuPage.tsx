import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import Header from "../components/Header";
import CategoryFilter from "../components/CategoryFilter";
import FoodCard from "../components/FoodCard";
<<<<<<< HEAD
import { categories } from "../data/dishes";
import { useDishes } from "../lib/dishStore";

export default function MenuPage() {
  const dishes = useDishes();
=======
import { dishes, categories } from "../data/dishes";

export default function MenuPage() {
>>>>>>> 652464cca6395523f91b2d3f72b14a54d9516123
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>("All");

  const filteredDishes = useMemo(() => {
    return dishes.filter((dish) => {
      const matchesCategory = activeCategory === "All" || dish.category === activeCategory;
      const matchesQuery = dish.name.toLowerCase().includes(query.trim().toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [query, activeCategory]);

  return (
    <div className="min-h-screen bg-cream pb-10">
      <Header />

      <div className="sticky top-0 z-10 space-y-3 bg-cream/95 px-5 pb-3 pt-2 backdrop-blur-sm">
        <div className="flex items-center gap-2.5 rounded-full bg-white px-4 py-3 shadow-[0_4px_16px_-8px_rgba(43,36,32,0.25)]">
          <Search size={18} className="shrink-0 text-espresso/45" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            type="text"
            placeholder="Search dishes..."
            className="w-full bg-transparent text-[15px] text-charcoal placeholder:text-espresso/40 focus:outline-none"
          />
        </div>

        <CategoryFilter active={activeCategory} onChange={setActiveCategory} />
      </div>

      <main className="grid grid-cols-1 gap-4 px-5 pt-2 sm:grid-cols-2">
        {filteredDishes.map((dish) => (
          <FoodCard key={dish.id} dish={dish} />
        ))}

        {filteredDishes.length === 0 && (
          <p className="col-span-full py-16 text-center text-[14px] text-espresso/50">
            No dishes match "{query}".
          </p>
        )}
      </main>
    </div>
  );
}
