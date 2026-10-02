import { useState } from "react";
import { Box, ImagePlus, X } from "lucide-react";
import type { Dish, DishCategory } from "../data/dishes";

const CATEGORY_OPTIONS: DishCategory[] = [
  "Starters",
  "Main Course",
  "Biryani",
  "Pizza",
  "Desserts",
  "Drinks",
];

interface DishFormProps {
  initialDish: Dish;
  onSave: (dish: Dish) => void;
  onClose: () => void;
}

export default function DishForm({ initialDish, onSave, onClose }: DishFormProps) {
  const [imageError, setImageError] = useState("");
  const [modelError, setModelError] = useState("");
  const [form, setForm] = useState({
    ...initialDish,
    ingredientsText: initialDish.ingredients.join(", "),
  });

  const update = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleImageUpload = async (file: File | undefined) => {
    if (!file) return;
    setImageError("");

    if (!file.type.startsWith("image/")) {
      setImageError("Please choose an image file.");
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      setImageError("Please choose an image smaller than 8 MB.");
      return;
    }

    try {
      update("image", await compressImage(file));
    } catch {
      setImageError("This image could not be processed. Please try another file.");
    }
  };

  const handleModelUpload = async (file: File | undefined) => {
    if (!file) return;
    setModelError("");

    const extension = file.name.toLowerCase().split(".").pop();
    if (extension !== "glb" && extension !== "gltf") {
      setModelError("Unsupported format. Upload a .glb or .gltf file. OBJ is not supported.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setModelError("Please choose a 3D model smaller than 10 MB.");
      return;
    }

    try {
      update("model", await readFileAsDataUrl(file));
    } catch {
      setModelError("This 3D model could not be read. Please try another file.");
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSave({
      id: form.id,
      name: form.name.trim(),
      price: Number(form.price) || 0,
      image: form.image.trim(),
      description: form.description.trim(),
      ingredients: form.ingredientsText
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      category: form.category,
      isVeg: form.isVeg,
      model: form.model.trim(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-charcoal/50 backdrop-blur-sm sm:items-center">
      <form
        onSubmit={handleSubmit}
        className="max-h-[90svh] w-full max-w-md overflow-y-auto rounded-t-3xl bg-cream p-5 pb-8 shadow-2xl sm:rounded-3xl"
      >
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-charcoal">
            {initialDish.name ? "Edit Dish" : "Add Dish"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-linen text-espresso/60"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>

        <div className="mt-4 space-y-3.5">
          <Field label="Dish name">
            <input
              required
              value={form.name}
              onChange={(event) => update("name", event.target.value)}
              className="input"
              placeholder="Chicken Biryani"
            />
          </Field>

          <Field label="Price (₹)">
            <input
              required
              type="number"
              min={0}
              value={form.price}
              onChange={(event) => update("price", Number(event.target.value) as unknown as typeof form.price)}
              className="input"
              placeholder="249"
            />
          </Field>

          <Field label="Dish image">
            <label className="flex cursor-pointer items-center justify-center gap-2 rounded-[14px] border border-dashed border-clay/50 bg-white px-4 py-3 text-[14px] font-medium text-clay-dark transition-colors hover:bg-linen">
              <ImagePlus size={18} />
              {form.image ? "Choose a different image" : "Upload an image"}
              <input
                required={!form.image}
                type="file"
                accept="image/png,image/jpeg,image/webp,image/gif"
                onChange={(event) => {
                  void handleImageUpload(event.target.files?.[0]);
                  event.currentTarget.value = "";
                }}
                className="sr-only"
              />
            </label>
            {form.image && (
              <img
                src={form.image}
                alt="Dish preview"
                className="mt-2 h-32 w-full rounded-[14px] object-cover"
              />
            )}
            {imageError && <p className="mt-1.5 text-[12.5px] text-tomato">{imageError}</p>}
          </Field>

          <Field label="Description">
            <textarea
              required
              rows={3}
              value={form.description}
              onChange={(event) => update("description", event.target.value)}
              className="input resize-none"
              placeholder="Aromatic basmati rice..."
            />
          </Field>

          <Field label="Ingredients (comma separated)">
            <input
              value={form.ingredientsText}
              onChange={(event) => update("ingredientsText", event.target.value)}
              className="input"
              placeholder="Chicken, Basmati Rice, Saffron"
            />
          </Field>

          <Field label="Category">
            <select
              value={form.category}
              onChange={(event) => update("category", event.target.value as DishCategory)}
              className="input"
            >
              {CATEGORY_OPTIONS.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </Field>

          <Field label="3D model (.glb or .gltf)">
            <label className="flex cursor-pointer items-center justify-center gap-2 rounded-[14px] border border-dashed border-clay/50 bg-white px-4 py-3 text-[14px] font-medium text-clay-dark transition-colors hover:bg-linen">
              <Box size={18} />
              {form.model ? "Choose a different 3D model" : "Upload a 3D model"}
              <input
                required={!form.model}
                type="file"
                accept=".glb,.gltf,model/gltf-binary,model/gltf+json"
                onChange={(event) => {
                  void handleModelUpload(event.target.files?.[0]);
                  event.currentTarget.value = "";
                }}
                className="sr-only"
              />
            </label>
            {form.model && (
              <p className="mt-2 truncate rounded-[14px] bg-linen px-3 py-2 text-[12px] text-espresso/65">
                {form.model.startsWith("data:") ? "Uploaded 3D model" : form.model}
              </p>
            )}
            {modelError && <p className="mt-1.5 text-[12.5px] text-tomato">{modelError}</p>}
          </Field>

          <label className="flex items-center gap-2.5 pt-1 text-[14px] text-charcoal">
            <input
              type="checkbox"
              checked={form.isVeg}
              onChange={(event) => update("isVeg", event.target.checked)}
              className="h-4 w-4 accent-sage"
            />
            Vegetarian
          </label>
        </div>

        <button
          type="submit"
          className="mt-6 w-full rounded-full bg-clay py-3.5 text-[15px] font-medium text-cream active:bg-clay-dark"
        >
          Save Dish
        </button>
      </form>
    </div>
  );
}

function compressImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const image = new Image();
      image.onload = () => {
        const maxDimension = 1200;
        const scale = Math.min(1, maxDimension / Math.max(image.width, image.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(image.width * scale));
        canvas.height = Math.max(1, Math.round(image.height * scale));
        const context = canvas.getContext("2d");
        if (!context) {
          reject(new Error("Canvas is not supported"));
          return;
        }
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.82));
      };
      image.onerror = () => reject(new Error("Invalid image"));
      image.src = String(reader.result);
    };
    reader.onerror = () => reject(new Error("Could not read image"));
    reader.readAsDataURL(file);
  });
}

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Could not read file"));
    reader.readAsDataURL(file);
  });
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[12.5px] font-medium text-espresso/60">{label}</span>
      {children}
    </label>
  );
}
