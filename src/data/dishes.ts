export type DishCategory =
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
  {
    id: 1,
    name: "Chicken Biryani",
    price: 249,
    image:
      "https://images.unsplash.com/photo-1642821373181-696a54913e93?q=80&w=1200&auto=format&fit=crop",
    description:
      "Aromatic basmati rice layered with tender, spiced chicken, slow-cooked with saffron and fresh herbs in the traditional dum style.",
    ingredients: ["Chicken", "Basmati Rice", "Saffron", "Fried Onions", "Whole Spices", "Mint & Coriander"],
    category: "Biryani",
    isVeg: false,
    model: "/models/biryani.glb",
  },
  {
    id: 2,
    name: "Paneer Biryani",
    price: 199,
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop",
    description:
      "Soft paneer cubes layered with fragrant basmati rice, caramelized onions and a gentle blend of warming spices.",
    ingredients: ["Paneer", "Basmati Rice", "Saffron", "Fried Onions", "Whole Spices", "Mint & Coriander"],
    category: "Biryani",
    isVeg: true,
    model: "/models/paneer-biryani.glb",
  },
  {
    id: 3,
    name: "Margherita Pizza",
    price: 229,
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1200&auto=format&fit=crop",
    description:
      "A classic hand-stretched pizza with San Marzano tomato sauce, fresh mozzarella and torn basil leaves.",
    ingredients: ["Mozzarella", "Tomato Sauce", "Fresh Basil", "Olive Oil", "Pizza Dough"],
    category: "Pizza",
    isVeg: true,
    model: "/models/pizza.glb",
  },
  {
    id: 4,
    name: "Chicken Pizza",
    price: 299,
    image:
      "https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=1200&auto=format&fit=crop",
    description:
      "Wood-fired crust topped with grilled chicken, bell peppers, onions and a smoky barbecue drizzle.",
    ingredients: ["Grilled Chicken", "Mozzarella", "Bell Peppers", "Onions", "BBQ Sauce"],
    category: "Pizza",
    isVeg: false,
    model: "/models/chicken-pizza.glb",
  },
  {
    id: 5,
    name: "Chicken 65",
    price: 189,
    image:
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=1200&auto=format&fit=crop",
    description:
      "Crispy fried chicken bites tossed in a fiery South Indian marinade of curry leaves, chilli and garlic.",
    ingredients: ["Chicken", "Curry Leaves", "Red Chilli", "Garlic", "Yogurt Marinade"],
    category: "Starters",
    isVeg: false,
    model: "/models/chicken-65.glb",
  },
  {
    id: 6,
    name: "Paneer Tikka",
    price: 179,
    image:
      "https://images.unsplash.com/photo-1600335895229-6e75511892c8?q=80&w=1200&auto=format&fit=crop",
    description:
      "Smoky char-grilled paneer cubes marinated in yogurt and tandoori spices, served sizzling hot.",
    ingredients: ["Paneer", "Yogurt", "Bell Peppers", "Tandoori Masala", "Onions"],
    category: "Starters",
    isVeg: true,
    model: "/models/paneer-tikka.glb",
  },
  {
    id: 7,
    name: "Chocolate Brownie",
    price: 149,
    image:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=1200&auto=format&fit=crop",
    description:
      "A dense, fudgy dark chocolate brownie served warm with a scoop of vanilla ice cream.",
    ingredients: ["Dark Chocolate", "Butter", "Eggs", "Flour", "Vanilla Ice Cream"],
    category: "Desserts",
    isVeg: true,
    model: "/models/brownie.glb",
  },
  {
    id: 8,
    name: "Mojito",
    price: 99,
    image:
      "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?q=80&w=1200&auto=format&fit=crop",
    description:
      "A refreshing mix of fresh mint, lime and soda over crushed ice — the perfect cooler for spicy food.",
    ingredients: ["Fresh Mint", "Lime", "Soda", "Sugar Syrup", "Crushed Ice"],
    category: "Drinks",
    isVeg: true,
    model: "/models/mojito.glb",
  },
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
