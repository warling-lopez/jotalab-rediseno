"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { useLenis } from "lenis/react";
import { useReady } from "./Providers";
import { Magnetic } from "./ui";

const ease = [0.22, 1, 0.36, 1] as const;

function BigWord({ word, delay, className = "" }: { word: string; delay: number; className?: string }) {
  const ready = useReady();
  return (
    <span className={`flex overflow-hidden ${className}`} aria-hidden>
      {Array.from(word).map((c, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: "105%", rotate: 8 }}
          animate={ready ? { y: "0%", rotate: 0 } : undefined}
          transition={{ duration: 1.1, ease, delay: delay + i * 0.045 }}
        >
          {c === " " ? " " : c}
        </motion.span>
      ))}
    </span>
  );
}

export default function Hero() {
  const ready = useReady();
  const lenis = useLenis();
  const ref = useRef<HTMLElement>(null);

  // Rotación 3D del puzzle siguiendo el mouse
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-1, 1], [14, -14]), { stiffness: 80, damping: 18 });
  const ry = useSpring(useTransform(mx, [-1, 1], [-18, 18]), { stiffness: 80, damping: 18 });

  useEffect(() => {
    // Solo con mouse: en táctil no hay puntero que seguir
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my]);

  // Al hacer scroll: el puzzle crece y gira, el texto se separa
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const puzzleScale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);
  const puzzleRotate = useTransform(scrollYProgress, [0, 1], [0, -25]);
  const leftX = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const rightX = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const fade = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      id="inicio"
      ref={ref}
      className="grid-lines relative flex min-h-[100svh] flex-col justify-end overflow-hidden px-4 pb-6 pt-28 md:px-8 md:pb-8"
    >
      {/* Puzzle 3D original */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-[46%] w-[115vw] -translate-x-1/2 -translate-y-1/2 md:top-1/2 md:w-[62vw]"
        style={{ scale: puzzleScale, rotate: puzzleRotate, perspective: 1000, willChange: "transform" }}
      >
        <motion.img
          src="/img/puzzle-hero.webp"
          alt="Puzzle: Application Developer, Social Media, VR and AR, Web Developer"
          width={1600}
          height={899}
          className="h-auto w-full"
          style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={ready ? { opacity: 1, scale: 1 } : undefined}
          transition={{ duration: 1.6, ease, delay: 0.15 }}
          fetchPriority="high"
        />
      </motion.div>

      {/* Etiquetas flotantes tipo ficha */}
      <motion.div className="pointer-events-none absolute inset-0 hidden md:block" style={{ opacity: fade }}>
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : undefined}
          transition={{ delay: 1.2, duration: 1 }}
        >
          <span className="label absolute left-[24%] top-[22%]">+ Fig. 01 — App</span>
          <span className="label absolute right-[22%] top-[22%]">+ Fig. 02 — Social</span>
          <span className="label absolute left-[22%] top-[52%]">+ Fig. 03 — AR / VR</span>
          <span className="label absolute right-[20%] top-[50%]">+ Fig. 04 — Web</span>
        </motion.div>
      </motion.div>

      <h1 className="sr-only">We get results — Jota Lab, desarrollo web, AR/VR y 3D en República Dominicana</h1>

      <div className="relative z-10 font-sans font-semibold uppercase leading-[0.8] tracking-[-0.065em] text-cream md:mix-blend-difference">
        <motion.div style={{ x: leftX }}>
          <BigWord word="We get" delay={0.1} className="text-[19vw] md:text-[17vw]" />
        </motion.div>
        <motion.div style={{ x: rightX }} className="flex items-end justify-end gap-4">
          <motion.span
            className="mb-[2vw] hidden max-w-[16ch] text-right font-serif text-2xl normal-case italic leading-tight tracking-normal text-cream/80 lg:block"
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : undefined}
            transition={{ delay: 1.1, duration: 1 }}
          >
            (growing with you)
          </motion.span>
          <BigWord word="results" delay={0.3} className="text-[19vw] md:text-[17vw]" />
          <motion.span
            className="mb-[3vw] block h-[3vw] w-[3vw] rounded-full bg-red"
            initial={{ scale: 0 }}
            animate={ready ? { scale: 1 } : undefined}
            transition={{ delay: 1, type: "spring", stiffness: 260, damping: 14 }}
          />
        </motion.div>
      </div>

      <motion.div
        className="relative z-10 mt-6 grid grid-cols-1 items-end gap-6 border-t border-line pt-5 md:mt-8 md:grid-cols-2 lg:grid-cols-4"
        initial={{ opacity: 0, y: 30 }}
        animate={ready ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 1, ease, delay: 0.9 }}
      >
        <p className="max-w-sm text-[15px] leading-relaxed text-cream/75 lg:col-span-2">
          Desarrollo plataformas, recursos interactivos y contenido inmersivo para proyectos educativos y marcas.
          Enfoque en rendimiento, claridad y soluciones mantenibles.
        </p>
        <p className="label hidden lg:block">
          18.4861° N, 69.9312° W
          <br />
          Web · AR/VR · 3D · STEAM
        </p>
        <div className="flex items-center justify-between gap-4 md:justify-end">
          <span className="label md:hidden">Scroll ↓</span>
          <Magnetic>
            <a
              href="#servicios"
              onClick={(e) => (e.preventDefault(), lenis?.scrollTo("#servicios", { duration: 1.6 }))}
              className="group relative flex items-center gap-3 overflow-hidden rounded-full bg-cream px-6 py-3.5 text-sm font-medium whitespace-nowrap text-ink"
            >
              <span className="absolute inset-0 translate-y-full rounded-full bg-red transition-transform duration-500 ease-[var(--ease-out)] group-hover:translate-y-0" />
              <span className="relative transition-colors duration-500 group-hover:text-cream">
                Crear. Optimizar. Escalar.
              </span>
              <span className="relative transition-[transform,color] duration-500 group-hover:rotate-45 group-hover:text-cream">
                ↗
              </span>
            </a>
          </Magnetic>
        </div>
      </motion.div>
    </section>
  );
}
