import { useEffect, useRef, useState } from "react";
import { useCart } from "@/hooks/use-cart";

interface Category {
  id: string;
  label: string;
  emoji: string;
}

const CATEGORIES: Category[] = [
  { id: "pasteis", label: "Pastéis", emoji: "🥟" },
  { id: "acai", label: "Açaí", emoji: "🍧" },
  { id: "sucos", label: "Sucos Naturais", emoji: "🥤" },
  { id: "porcoes", label: "Porções", emoji: "🍟" },
  { id: "salgados", label: "Salgados", emoji: "🥟" },
  { id: "bebidas", label: "Bebidas", emoji: "🍻" },
];

export function CategoryNav() {
  const [active, setActive] = useState<string>(CATEGORIES[0].id);
  const clickLock = useRef<number>(0);

  useEffect(() => {
    const sections = CATEGORIES.map((c) => document.getElementById(c.id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );

    const observer = new IntersectionObserver(
      (entries) => {
        if (Date.now() < clickLock.current) return;
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  function handleClick(e: React.MouseEvent, id: string) {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    setActive(id);
    clickLock.current = Date.now() + 800;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <nav className="sticky top-[88px] z-30 border-b border-border bg-background/90 backdrop-blur sm:top-[104px]">
      <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-1.5 px-3 py-2 sm:gap-2">
        {CATEGORIES.map((c) => {
          const isActive = active === c.id;
          return (
            <a
              key={c.id}
              href={`#${c.id}`}
              onClick={(e) => handleClick(e, c.id)}
              aria-current={isActive ? "true" : undefined}
              className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-center text-xs font-semibold transition-all sm:text-sm ${
                isActive
                  ? "border-primary bg-primary text-primary-foreground shadow-sm"
                  : "border-primary/30 bg-primary/10 text-primary hover:bg-primary/20"
              }`}
            >
              <span className="text-sm" aria-hidden>{c.emoji}</span>
              {c.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}

export function FloatingCartButton({ onClick }: { onClick: () => void }) {
  const { totalItems, subtotal } = useCart();
  if (totalItems === 0) return null;
  return (
    <button
      onClick={onClick}
      aria-label="Ver pedido"
      className="animate-spring-up fixed bottom-5 right-5 z-40 flex items-center gap-3 rounded-full bg-primary px-5 py-3.5 text-primary-foreground shadow-2xl transition-transform hover:scale-105 active:scale-95"
    >
      <span className="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <circle cx="8" cy="21" r="1" />
          <circle cx="19" cy="21" r="1" />
          <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
        </svg>
        <span
          key={totalItems}
          className="animate-spring-up absolute -right-2.5 -top-2.5 grid h-5 w-5 place-items-center rounded-full bg-accent text-[11px] font-bold text-accent-foreground"
        >
          {totalItems}
        </span>
      </span>
      <span className="text-sm font-semibold tabular-nums">
        {totalItems} {totalItems === 1 ? "item" : "itens"} •{" "}
        {subtotal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
      </span>
    </button>
  );
}
