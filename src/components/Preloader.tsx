"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLenis } from "lenis/react";
import Logo from "./Logo";

const words = ["Crear", "Optimizar", "Escalar"];

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(true);
  const lenis = useLenis();

  // Bloquea el scroll mientras carga
  useEffect(() => {
    if (visible) lenis?.stop();
    else lenis?.start();
  }, [visible, lenis]);

  useEffect(() => {
    const start = performance.now();
    const duration = 1900;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - start) / duration, 1);
      // ease-out cúbico: arranca rápido y frena al final
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else
        setTimeout(() => {
          setVisible(false);
          onDone();
        }, 250);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const wordIndex = Math.min(Math.floor(count / 34), 2);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-ink p-5 md:p-8"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex items-start justify-between">
            <Logo className="h-7 w-auto text-cream md:h-9" />
            <span className="label">Laboratorio digital — RD</span>
          </div>

          <div className="flex items-end justify-between gap-6">
            <div className="h-[1.1em] overflow-hidden font-serif text-4xl italic text-cream md:text-6xl">
              <AnimatePresence mode="wait">
                <motion.span
                  key={wordIndex}
                  className="block"
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  exit={{ y: "-100%" }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  {words[wordIndex]}.
                </motion.span>
              </AnimatePresence>
            </div>
            <span className="font-sans text-[22vw] font-semibold leading-[0.8] tracking-[-0.06em] text-cream tabular-nums md:text-[14vw]">
              {String(count).padStart(3, "0")}
            </span>
          </div>

          <div className="absolute inset-x-0 bottom-0 h-[3px] bg-line">
            <div className="h-full bg-red" style={{ width: `${count}%` }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
