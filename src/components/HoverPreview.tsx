"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useFinePointer } from "./ui";

/**
 * Tarjeta flotante que sigue al cursor y desliza entre imágenes
 * según la fila activa (efecto clásico de portfolios en Awwwards).
 */
export default function HoverPreview({
  images,
  active,
  width = 380,
  height = 260,
}: {
  images: string[];
  active: number | null;
  width?: number;
  height?: number;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 150, damping: 20, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 150, damping: 20, mass: 0.6 });

  useEffect(() => {
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  const fine = useFinePointer();
  const idx = active ?? 0;

  // En táctiles no se monta: no hay hover y así no se descargan imágenes extra
  if (!fine) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-30 hidden overflow-hidden rounded-sm md:block"
      style={{ x: sx, y: sy, width, height, translateX: "-50%", translateY: "-50%" }}
      initial={false}
      animate={{ scale: active === null ? 0 : 1, rotate: active === null ? -8 : 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden
    >
      <motion.div
        className="h-full w-full"
        animate={{ y: `-${idx * 100}%` }}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
      >
        {images.map((src) => (
          <div key={src} className="h-full w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
