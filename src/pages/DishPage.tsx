import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowDown, ArrowLeft, Box, Camera, MoveDiagonal2 } from "lucide-react";
import ModelViewer from "../components/ModelViewer";
import { dishes } from "../data/dishes";

type ViewMode = "3d" | "ar";

export default function DishPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dish = dishes.find((item) => item.id === Number(id));

  const [viewMode, setViewMode] = useState<ViewMode>("3d");
  const [arSupported, setArSupported] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!dish) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-cream px-6 text-center">
        <p className="font-display text-lg text-charcoal">Dish not found</p>
        <button
          onClick={() => navigate("/")}
          className="rounded-full bg-clay px-5 py-2.5 text-[14px] font-medium text-cream"
        >
          Back to menu
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream pb-12">
      <section className="relative flex min-h-[100svh] flex-col bg-gradient-to-b from-linen to-white">
        <div className="absolute left-0 right-0 top-0 z-10 flex items-center gap-3 px-5 py-4">
        <button
          onClick={() => navigate(-1)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-[0_4px_14px_-6px_rgba(43,36,32,0.3)] backdrop-blur-sm active:scale-95"
          aria-label="Back"
        >
          <ArrowLeft size={19} className="text-charcoal" />
        </button>
        </div>

        <div className="flex min-h-[100svh] items-center px-3 pt-4">
          <ModelViewer
            key={viewMode}
            src={dish.model}
            alt={dish.name}
            arMode={viewMode === "ar"}
            className="h-[calc(100svh-2rem)] w-full"
          />
        </div>

        <div className="absolute bottom-5 left-0 right-0 flex flex-col items-center gap-2 text-espresso/55">
          <span className="text-[13px] font-medium">Scroll to see description</span>
          <ArrowDown size={16} className="animate-bounce" />
        </div>
      </section>

      <div className="px-5 pt-10">
        <div className="flex items-start justify-between gap-3">
          <h1 className="font-display text-[26px] font-semibold leading-tight text-charcoal">
            {dish.name}
          </h1>
          <span className="shrink-0 font-display text-[22px] font-semibold text-clay-dark">
            ₹{dish.price}
          </span>
        </div>

        <p className="mt-3 text-[15px] leading-relaxed text-espresso/70">{dish.description}</p>

        <div className="mt-5">
          <h2 className="text-[13px] font-semibold uppercase tracking-wide text-espresso/45">
            Ingredients
          </h2>
          <p className="mt-1.5 text-[14.5px] leading-relaxed text-espresso/75">
            {dish.ingredients.join(" • ")}
          </p>
        </div>

        <div className="mt-8">
          <div className="flex gap-2 rounded-full bg-linen p-1">
            <button
              onClick={() => setViewMode("3d")}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-full py-2.5 text-[14px] font-medium transition-colors ${
                viewMode === "3d" ? "bg-white text-charcoal shadow-sm" : "text-espresso/55"
              }`}
            >
              <Box size={16} /> Explore in 3D
            </button>
            <button
              onClick={() => setViewMode("ar")}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-full py-2.5 text-[14px] font-medium transition-colors ${
                viewMode === "ar" ? "bg-white text-charcoal shadow-sm" : "text-espresso/55"
              }`}
            >
              <Camera size={16} /> View on My Table
            </button>
          </div>

          {viewMode === "3d" ? (
            <p className="mt-3 flex items-center justify-center gap-1.5 text-[13px] text-espresso/50">
              <MoveDiagonal2 size={14} /> Drag to rotate • Pinch to zoom
            </p>
          ) : arSupported ? (
            <div className="mt-3 space-y-3">
              <p className="text-center text-[13px] text-espresso/50">
                Move your phone slowly to find your table, then place the dish.
              </p>
              <button
                onClick={() => launchAr(setArSupported)}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-clay py-3.5 text-[15px] font-medium text-cream active:bg-clay-dark"
              >
                <Camera size={18} /> View on My Table
              </button>
              <p className="text-center text-[12.5px] text-espresso/40">
                See this dish on your table using AR.
              </p>
            </div>
          ) : (
            <p className="mt-3 text-center text-[13px] text-espresso/55">
              AR isn't supported on this device. You can still explore the dish in 3D.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function launchAr(setArSupported: (value: boolean) => void) {
  const viewer = document.querySelector("model-viewer") as (HTMLElement & { activateAR?: () => void; canActivateAR?: boolean }) | null;
  if (!viewer) return;

  if (viewer.canActivateAR === false) {
    setArSupported(false);
    return;
  }

  try {
    viewer.activateAR?.();
  } catch {
    setArSupported(false);
  }
}
