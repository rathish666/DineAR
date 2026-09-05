import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Download, Lock, LogOut, Pencil, Plus, RotateCcw, Trash2 } from "lucide-react";
import type { Dish } from "../data/dishes";
import { deleteDish, exportDishesAsTsFile, getNextDishId, resetDishes, saveDish, useDishes } from "../lib/dishStore";
import { adminLogout, isAdminAuthed, tryAdminLogin } from "../lib/adminAuth";
import DishForm from "../components/DishForm";

const BLANK_DISH: Dish = {
  id: 0,
  name: "",
  price: 0,
  image: "",
  description: "",
  ingredients: [],
  category: "Starters",
  isVeg: true,
  model: "",
};

export default function AdminPage() {
  const [authed, setAuthed] = useState(isAdminAuthed());

  if (!authed) {
    return <AdminLogin onSuccess={() => setAuthed(true)} />;
  }

  return <AdminDashboard onLogout={() => setAuthed(false)} />;
}

function AdminLogin({ onSuccess }: { onSuccess: () => void }) {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (tryAdminLogin(password)) {
      onSuccess();
    } else {
      setError(true);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-cream px-6">
      <button
        onClick={() => navigate("/")}
        className="absolute left-5 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-[0_4px_14px_-6px_rgba(43,36,32,0.3)]"
        aria-label="Back to menu"
      >
        <ArrowLeft size={19} className="text-charcoal" />
      </button>

      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-clay text-cream">
        <Lock size={20} />
      </div>
      <h1 className="mt-4 font-display text-xl font-semibold text-charcoal">Admin Login</h1>
      <p className="mt-1 text-[14px] text-espresso/60">Manage your restaurant's menu</p>

      <form onSubmit={handleSubmit} className="mt-6 w-full max-w-xs">
        <input
          type="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
            setError(false);
          }}
          placeholder="Admin password"
          className="input"
          autoFocus
        />
        {error && (
          <p className="mt-2 text-[13px] text-tomato">Incorrect password. Try again.</p>
        )}
        <button
          type="submit"
          className="mt-4 w-full rounded-full bg-clay py-3 text-[14.5px] font-medium text-cream active:bg-clay-dark"
        >
          Log In
        </button>
      </form>
    </div>
  );
}

function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const navigate = useNavigate();
  const dishes = useDishes();
  const [editingDish, setEditingDish] = useState<Dish | null>(null);

  const handleLogout = () => {
    adminLogout();
    onLogout();
  };

  const handleExport = () => {
    const fileContent = exportDishesAsTsFile(dishes);
    const blob = new Blob([fileContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "dishes.ts";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-cream pb-16">
      <div className="sticky top-0 z-10 flex items-center justify-between bg-cream/95 px-5 py-4 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-[0_4px_14px_-6px_rgba(43,36,32,0.3)]"
            aria-label="Back to menu"
          >
            <ArrowLeft size={19} className="text-charcoal" />
          </button>
          <h1 className="font-display text-lg font-semibold text-charcoal">Admin</h1>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 rounded-full bg-linen px-3.5 py-2 text-[13px] font-medium text-espresso/70"
        >
          <LogOut size={14} /> Log out
        </button>
      </div>

      <div className="mx-5 rounded-2xl bg-saffron/15 px-4 py-3 text-[13px] leading-relaxed text-espresso/75">
        Changes here only preview on <b>this device</b> — this is a static site with no
        database. Click <b>Export dishes.ts</b> and replace{" "}
        <code className="rounded bg-white/70 px-1 py-0.5 text-[12px]">src/data/dishes.ts</code>{" "}
        in your repo, then redeploy to publish changes for every customer.
      </div>

      <div className="mt-4 flex gap-2 px-5">
        <button
          onClick={() => setEditingDish(BLANK_DISH)}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-clay py-3 text-[14px] font-medium text-cream active:bg-clay-dark"
        >
          <Plus size={16} /> Add Dish
        </button>
        <button
          onClick={handleExport}
          className="flex items-center justify-center gap-1.5 rounded-full bg-charcoal px-4 py-3 text-[14px] font-medium text-cream active:bg-charcoal/85"
        >
          <Download size={16} /> Export
        </button>
        <button
          onClick={() => {
            if (confirm("Reset all dishes to the original 8 sample dishes on this device?")) {
              resetDishes();
            }
          }}
          className="flex items-center justify-center gap-1.5 rounded-full bg-linen px-3.5 py-3 text-[13px] font-medium text-espresso/70"
          aria-label="Reset to defaults"
        >
          <RotateCcw size={15} />
        </button>
      </div>

      <div className="mt-5 space-y-3 px-5">
        {dishes.map((dish) => (
          <div
            key={dish.id}
            className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-[0_6px_20px_-12px_rgba(43,36,32,0.3)]"
          >
            <img
              src={dish.image}
              alt={dish.name}
              className="h-14 w-14 shrink-0 rounded-xl object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[14.5px] font-semibold text-charcoal">{dish.name}</p>
              <p className="text-[13px] text-espresso/55">
                ₹{dish.price} · {dish.category}
              </p>
            </div>
            <button
              onClick={() => setEditingDish(dish)}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-linen text-espresso/70"
              aria-label={`Edit ${dish.name}`}
            >
              <Pencil size={15} />
            </button>
            <button
              onClick={() => {
                if (confirm(`Delete "${dish.name}"? This only affects this device.`)) {
                  deleteDish(dish.id);
                }
              }}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-tomato/10 text-tomato"
              aria-label={`Delete ${dish.name}`}
            >
              <Trash2 size={15} />
            </button>
          </div>
        ))}

        {dishes.length === 0 && (
          <p className="py-16 text-center text-[14px] text-espresso/50">
            No dishes yet. Add your first one above.
          </p>
        )}
      </div>

      {editingDish && (
        <DishForm
          initialDish={editingDish.id === 0 ? { ...editingDish, id: getNextDishId() } : editingDish}
          onSave={(dish) => {
            saveDish(dish);
            setEditingDish(null);
          }}
          onClose={() => setEditingDish(null)}
        />
      )}
    </div>
  );
}
