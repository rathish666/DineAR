import { categories } from "../data/dishes";

interface CategoryFilterProps {
  active: (typeof categories)[number];
  onChange: (category: (typeof categories)[number]) => void;
}

export default function CategoryFilter({ active, onChange }: CategoryFilterProps) {
  return (
    <div className="scrollbar-none -mx-5 flex gap-2 overflow-x-auto px-5 pb-1">
      {categories.map((category) => {
        const isActive = category === active;
        return (
          <button
            key={category}
            onClick={() => onChange(category)}
            className={`shrink-0 rounded-full px-4 py-2 text-[14px] font-medium transition-colors duration-200 ${
              isActive
                ? "bg-charcoal text-cream"
                : "bg-linen text-espresso/80 active:bg-linen/70"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
