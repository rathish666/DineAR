<<<<<<< HEAD
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import MenuPage from "./pages/MenuPage";

const DishPage = lazy(() => import("./pages/DishPage"));
const AdminPage = lazy(() => import("./pages/AdminPage"));

function PageFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-cream">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-clay border-t-transparent" />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route path="/" element={<MenuPage />} />
          <Route path="/dish/:id" element={<DishPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
=======
import { Route, Routes } from "react-router-dom";
import MenuPage from "./pages/MenuPage";
import DishPage from "./pages/DishPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MenuPage />} />
      <Route path="/dish/:id" element={<DishPage />} />
    </Routes>
>>>>>>> 652464cca6395523f91b2d3f72b14a54d9516123
  );
}
