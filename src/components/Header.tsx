import { UtensilsCrossed } from "lucide-react";

export default function Header() {
  return (
    <header className="px-5 pt-8 pb-2">
      <div className="flex items-center gap-2.5">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-clay text-cream">
          <UtensilsCrossed size={18} strokeWidth={2.25} />
        </span>
        <h1 className="font-display text-[26px] font-semibold tracking-tight text-charcoal">
          DineAR
        </h1>
      </div>
      <p className="mt-1.5 pl-[2px] text-[15px] text-espresso/70">
        Explore our menu in AR
      </p>
    </header>
  );
}
