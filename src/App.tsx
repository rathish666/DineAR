import { Route, Routes } from "react-router-dom";
import MenuPage from "./pages/MenuPage";
import DishPage from "./pages/DishPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MenuPage />} />
      <Route path="/dish/:id" element={<DishPage />} />
    </Routes>
  );
}
