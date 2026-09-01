import { useNavigate } from "react-router-dom";
import { Box } from "lucide-react";
import type { Dish } from "../data/dishes";

interface FoodCardProps {
  dish: Dish;
}

export default function FoodCard({ dish }: FoodCardProps) {
  const navigate = useNavigate();

  return (
    <article className="animate-fade-in-up overflow-hidden rounded-[22px] bg-white shadow-[0_10px_30px_-14px_rgba(43,36,32,0.25)]">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-linen">
        <img
          src={dish.image}
          alt={dish.name}
          loading="lazy"
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop";
          }}
          className="h-full w-full object-cover"
        />
        <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-charcoal/90 px-2.5 py-1 text-[11px] font-medium text-cream backdrop-blur-sm">
          <Box size={12} />
          3D &amp; AR Available
        </span>
        <span
          className={`absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-md border-2 bg-white/95 ${
            dish.isVeg ? "border-sage" : "border-tomato"
          }`}
          title={dish.isVeg ? "Vegetarian" : "Non-Vegetarian"}
        >
          <span
            className={`h-2.5 w-2.5 rounded-full ${
              dish.isVeg ? "bg-sage" : "bg-tomato"
            }`}
          />
        </span>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-[19px] font-semibold leading-snug text-charcoal">
            {dish.name}
          </h3>
          <span className="shrink-0 font-display text-[17px] font-semibold text-clay-dark">
            ₹{dish.price}
          </span>
        </div>
        <p className="mt-1 line-clamp-2 text-[13.5px] leading-relaxed text-espresso/65">
          {dish.description}
        </p>

        <button
          onClick={() => navigate(`/dish/${dish.id}`)}
          className="mt-3.5 flex w-full items-center justify-center gap-1.5 rounded-full bg-clay py-3 text-[14.5px] font-medium text-cream transition-colors active:bg-clay-dark"
        >
          View Dish
        </button>
      </div>
    </article>
  );
}
