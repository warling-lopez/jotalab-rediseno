"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";

export const EASE = [0.22, 1, 0.36, 1] as const;

/** Texto que sube línea por línea (o palabra por palabra) al entrar en pantalla. */
export function RevealText({
  text,
  className = "",
  delay = 0,
  by = "word",
}: {
  text: string;
  className?: string;
  delay?: number;
  by?: "word" | "char";
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const parts = by === "word" ? text.split(" ") : Array.from(text);
  return (
    <span ref={ref} className={className} aria-label={text}>
      {parts.map((p, i) => (
        // La máscara se agranda con padding y lo compensa con margen negativo:
        // así no recorta descendentes (q, y) ni el vuelo de las cursivas, y el diseño no se mueve.
        <span
          key={i}
          aria-hidden
          className="-mx-[0.1em] -mb-[0.25em] -mt-[0.12em] inline-block overflow-hidden px-[0.1em] pb-[0.25em] pt-[0.12em] align-bottom"
        >
          <motion.span
            className="inline-block"
            initial={{ y: "160%" }}
            animate={inView ? { y: "0%" } : undefined}
            transition={{ duration: 0.9, ease: EASE, delay: delay + i * (by === "word" ? 0.05 : 0.025) }}
          >
            {p === " " ? " " : p}
            {by === "word" && i < parts.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/** Aparece con fade + subida suave. */
export function FadeUp({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Envuelve un elemento para que "persiga" al cursor cuando está cerca. */
export function Magnetic({
  children,
  strength = 0.35,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.3 });
  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className}`}
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/** true en dispositivos con mouse (no táctiles). Evita efectos de cursor en móvil. */
export function useFinePointer() {
  return useMedia("(hover: hover) and (pointer: fine)");
}

export function useMedia(query: string) {
  const [match, setMatch] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatch(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);
  return match;
}

/** Encabezado de sección estilo ficha: [ 02 ] — Servicios ———— (04) */
export function SectionHead({ index, title, count }: { index: string; title: string; count?: string }) {
  return (
    <div className="flex items-center gap-4 border-t border-line pt-4">
      <span className="label text-cream">[ {index} ]</span>
      <span className="label">{title}</span>
      <span className="h-px flex-1 bg-line" />
      {count && <span className="label">({count})</span>}
    </div>
  );
}

/** Palabra que se ilumina según el progreso de scroll. */
export function ScrollWord({
  children,
  progress,
  range,
}: {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  return (
    <motion.span style={{ opacity }} className="inline">
      {children}
    </motion.span>
  );
}
