"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

// Cursor propio: punto + aro. Cualquier elemento con data-cursor="Texto"
// hace crecer el aro y muestra ese texto.
export default function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 350, damping: 32, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 350, damping: 32, mass: 0.5 });
  const [label, setLabel] = useState<string | null>(null);
  const [hoverLink, setHoverLink] = useState(false);

  useEffect(() => {
    const inspect = (t: Element | null) => {
      const withLabel = t?.closest<HTMLElement>("[data-cursor]");
      setLabel(withLabel?.dataset.cursor ?? null);
      setHoverLink(!!t?.closest("a, button, input, textarea, label"));
    };
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      inspect(e.target as Element | null);
    };
    // Al hacer scroll el contenido cambia bajo el cursor sin moverlo
    const onScroll = () => inspect(document.elementFromPoint(x.get(), y.get()));
    window.addEventListener("pointermove", move);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", onScroll);
    };
  }, [x, y]);

  const size = label ? 96 : hoverLink ? 44 : 12;

  return (
    <div className="cursor-root pointer-events-none fixed inset-0 z-[90]" aria-hidden>
      <motion.div
        className="absolute left-0 top-0 flex items-center justify-center rounded-full"
        style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: size,
          height: size,
          backgroundColor: label ? "var(--red)" : hoverLink ? "rgba(245,243,238,0)" : "var(--cream)",
          borderWidth: hoverLink && !label ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
      >
        {label && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            className="font-mono text-[11px] uppercase tracking-widest text-cream"
          >
            {label}
          </motion.span>
        )}
      </motion.div>
      <style>{`.cursor-root > div { border-color: var(--cream); border-style: solid; }
      @media (hover: hover) { html, a, button { cursor: none; } }`}</style>
    </div>
  );
}
