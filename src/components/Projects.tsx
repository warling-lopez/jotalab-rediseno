"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { projects, EMAIL } from "@/lib/data";
import { EASE, RevealText, SectionHead, useMedia } from "./ui";

const intro =
  "Hay muchas maneras de llegar al cliente: páginas web, social media, video, promociones online. Cada situación es única, por eso desarrollo estrategias adaptadas a cada cliente, sacando el mejor provecho a los recursos que aplicamos.";


function Card({ p, i }: { p: (typeof projects)[number]; i: number }) {
  return (
    <a href={p.href} data-cursor="Abrir" className="group block">
      <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-ink-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={p.img}
          alt={p.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1.2s] ease-[var(--ease-out)] group-hover:scale-[1.06]"
        />
        <span className="absolute left-3 top-3 rounded-full bg-ink/70 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-cream backdrop-blur">
          {p.tag}
        </span>
      </div>
      <div className="mt-4 flex items-start justify-between gap-6">
        <div>
          <h3 className="text-2xl font-semibold tracking-[-0.03em] md:text-3xl">
            <span className="bg-[linear-gradient(var(--red),var(--red))] bg-[length:0%_2px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-500 group-hover:bg-[length:100%_2px]">
              {p.title}
            </span>
          </h3>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-cream/60">{p.text}</p>
        </div>
        <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
      </div>
    </a>
  );
}

function Horizontal() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useLayoutEffect(() => {
    const measure = () => {
      if (track.current) setDistance(track.current.scrollWidth - window.innerWidth);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (track.current) ro.observe(track.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const x = useTransform(smooth, (v) => -v * distance);
  const bar = useTransform(smooth, [0, 1], ["0%", "100%"]);

  return (
    <section id="proyectos" ref={section} style={{ height: `calc(100vh + ${distance}px)` }} className="relative">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <motion.div ref={track} style={{ x }} className="flex w-max items-center gap-[4vw] px-8">
          {/* Panel de intro */}
          <div className="flex w-[38vw] shrink-0 flex-col justify-between self-stretch py-24">
            <SectionHead index="03" title="Proyectos" count={String(projects.length).padStart(2, "0")} />
            <div>
              <h2 className="text-[7vw] font-semibold leading-[0.88] tracking-[-0.06em]">
                <RevealText text="Siempre" />
                <br />
                <RevealText text="destacamos" delay={0.1} className="font-serif font-normal italic tracking-[-0.02em] text-red" />
              </h2>
              <p className="mt-8 max-w-md text-[15px] leading-relaxed text-cream/65">{intro}</p>
            </div>
            <p className="label">Desliza → para explorar</p>
          </div>

          {projects.map((p, i) => (
            <div key={p.title} className={`w-[40vw] shrink-0 ${i % 2 ? "translate-y-[6vh]" : "-translate-y-[4vh]"}`}>
              <Card p={p} i={i} />
            </div>
          ))}

          {/* Panel final */}
          <a
            href={`mailto:${EMAIL}`}
            data-cursor="Escribir"
            className="group flex h-[60vh] w-[34vw] shrink-0 flex-col justify-between rounded-sm border border-line p-8 transition-colors duration-500 hover:bg-red"
          >
            <span className="label group-hover:!text-cream">¿El siguiente?</span>
            <span className="text-[5vw] font-semibold leading-[0.9] tracking-[-0.05em]">
              Tu proyecto
              <br />
              <span className="font-serif font-normal italic">aquí</span> ↗
            </span>
          </a>
        </motion.div>

        <div className="absolute inset-x-8 bottom-8 h-px bg-line">
          <motion.div className="h-full bg-red" style={{ width: bar }} />
        </div>
      </div>
    </section>
  );
}

function Stacked() {
  return (
    <section id="proyectos" className="px-4 py-24 md:px-8 md:py-32">
      <SectionHead index="03" title="Proyectos" count={String(projects.length).padStart(2, "0")} />
      <h2 className="mt-10 text-[14vw] sm:text-[10vw] font-semibold leading-[0.88] tracking-[-0.06em]">
        Siempre <br />
        <span className="font-serif font-normal italic tracking-[-0.02em] text-red">destacamos</span>
      </h2>
      <p className="mt-6 text-[15px] leading-relaxed text-cream/65">{intro}</p>
      <div className="mt-12 grid grid-cols-1 gap-14 sm:grid-cols-2 sm:gap-x-6">
        {projects.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <Card p={p} i={i} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default function Projects() {
  // Scroll horizontal solo en pantallas grandes; móvil y tablet usan lista vertical
  const desktop = useMedia("(min-width: 1024px)");
  return desktop ? <Horizontal /> : <Stacked />;
}
