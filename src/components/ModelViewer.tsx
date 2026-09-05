import { useEffect, useRef, useState } from "react";
import { ImageOff, RotateCw } from "lucide-react";

// Minimal typing so TSX accepts the <model-viewer> custom element.
type ModelViewerElementProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement> & {
    src?: string;
    alt?: string;
    ar?: boolean;
    "ar-modes"?: string;
    "camera-controls"?: boolean;
    "auto-rotate"?: boolean;
    "shadow-intensity"?: string;
    "shadow-softness"?: string;
    exposure?: string;
    "environment-image"?: string;
    poster?: string;
    "camera-orbit"?: string;
    reveal?: string;
  },
  HTMLElement
>;

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": ModelViewerElementProps;
    }
  }
}

interface ModelViewerProps {
  src: string;
  alt: string;
  poster?: string;
  arMode?: boolean;
  className?: string;
}

export default function ModelViewer({ src, alt, poster, arMode = false, className = "" }: ModelViewerProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [modelError, setModelError] = useState(false);
<<<<<<< HEAD
  const [libraryReady, setLibraryReady] = useState(
    () => typeof window !== "undefined" && customElements.get("model-viewer") !== undefined
  );
  const modelSrc = `${import.meta.env.BASE_URL}${src.replace(/^\/+/, "")}`;

  useEffect(() => {
    if (libraryReady) return;
    let cancelled = false;
    import("@google/model-viewer").then(() => {
      if (!cancelled) setLibraryReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, [libraryReady]);

  useEffect(() => {
=======
  const modelSrc = `${import.meta.env.BASE_URL}${src.replace(/^\/+/, "")}`;

  useEffect(() => {
>>>>>>> 652464cca6395523f91b2d3f72b14a54d9516123
    setModelError(false);
    const node = ref.current;
    if (!node) return;

    const handleError = () => setModelError(true);
    node.addEventListener("error", handleError);
    return () => node.removeEventListener("error", handleError);
<<<<<<< HEAD
  }, [src, libraryReady]);

  if (!libraryReady) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <RotateCw className="animate-spin text-clay" size={22} />
      </div>
    );
  }
=======
  }, [src]);
>>>>>>> 652464cca6395523f91b2d3f72b14a54d9516123

  if (modelError) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-2 rounded-3xl bg-linen text-espresso/60 ${className}`}
      >
        <ImageOff size={32} strokeWidth={1.5} />
        <p className="max-w-[220px] text-center text-[13px] leading-snug">
          3D model coming soon for this dish.
        </p>
      </div>
    );
  }

  return (
    <model-viewer
      ref={ref as unknown as React.RefObject<HTMLElement>}
      src={modelSrc}
      alt={alt}
      poster={poster}
      camera-controls
      auto-rotate
      reveal="auto"
      shadow-intensity="1"
      shadow-softness="0.8"
      exposure="1.05"
      environment-image="neutral"
      ar={arMode}
      ar-modes={arMode ? "webxr scene-viewer quick-look" : undefined}
      className={className}
      style={{ backgroundColor: "transparent" }}
    >
      <div slot="progress-bar" />
      <button slot="ar-button" style={{ display: "none" }} aria-hidden="true" />
      <div slot="poster" className="flex h-full w-full items-center justify-center">
        <RotateCw className="animate-spin text-clay" size={22} />
      </div>
    </model-viewer>
  );
}
