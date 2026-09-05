import { useEffect, useState } from "react";
import { dishes as seedDishes, type Dish } from "../data/dishes";

const STORAGE_KEY = "dinear:dishes:v1";

// Custom event so multiple components (menu + admin) stay in sync
// within the same tab without needing a global state library.
const DISHES_CHANGED_EVENT = "dinear:dishes-changed";

function readStoredDishes(): Dish[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return seedDishes;
    const parsed = JSON.parse(raw) as Dish[];
    if (!Array.isArray(parsed) || parsed.length === 0) return seedDishes;
    return parsed;
  } catch {
    return seedDishes;
  }
}

function writeStoredDishes(dishes: Dish[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dishes));
  window.dispatchEvent(new Event(DISHES_CHANGED_EVENT));
}

export function useDishes() {
  const [dishes, setDishes] = useState<Dish[]>(readStoredDishes);

  useEffect(() => {
    const handleChange = () => setDishes(readStoredDishes());
    window.addEventListener(DISHES_CHANGED_EVENT, handleChange);
    window.addEventListener("storage", handleChange);
    return () => {
      window.removeEventListener(DISHES_CHANGED_EVENT, handleChange);
      window.removeEventListener("storage", handleChange);
    };
  }, []);

  return dishes;
}

export function saveDish(dish: Dish) {
  const current = readStoredDishes();
  const exists = current.some((item) => item.id === dish.id);
  const next = exists
    ? current.map((item) => (item.id === dish.id ? dish : item))
    : [...current, dish];
  writeStoredDishes(next);
}

export function deleteDish(id: number) {
  const current = readStoredDishes();
  writeStoredDishes(current.filter((item) => item.id !== id));
}

export function resetDishes() {
  writeStoredDishes(seedDishes);
}

export function getNextDishId(): number {
  const current = readStoredDishes();
  return current.reduce((max, dish) => Math.max(max, dish.id), 0) + 1;
}

export function exportDishesAsTsFile(dishes: Dish[]): string {
  const body = dishes
    .map((dish) => {
      const ingredients = JSON.stringify(dish.ingredients);
      return `  {
    id: ${dish.id},
    name: ${JSON.stringify(dish.name)},
    price: ${dish.price},
    image: ${JSON.stringify(dish.image)},
    description: ${JSON.stringify(dish.description)},
    ingredients: ${ingredients},
    category: ${JSON.stringify(dish.category)},
    isVeg: ${dish.isVeg},
    model: ${JSON.stringify(dish.model)},
  }`;
    })
    .join(",\n");

  return `export type DishCategory =
  | "Starters"
  | "Main Course"
  | "Biryani"
  | "Pizza"
  | "Desserts"
  | "Drinks";

export interface Dish {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  ingredients: string[];
  category: DishCategory;
  isVeg: boolean;
  model: string;
}

export const dishes: Dish[] = [
${body}
];

export const categories: Array<"All" | DishCategory> = [
  "All",
  "Starters",
  "Main Course",
  "Biryani",
  "Pizza",
  "Desserts",
  "Drinks",
];
`;
}
