"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { services } from "@/lib/data";
import HoverPreview from "./HoverPreview";
import { EASE, RevealText, SectionHead } from "./ui";

export default function Services() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="servicios" className="px-4 py-24 md:px-8 md:py-36">
      <SectionHead index="01" title="Servicios" count={String(services.length).padStart(2, "0")} />

      <div className="mt-10 grid grid-cols-1 gap-6 md:mt-14 md:grid-cols-4">
        <h2 className="text-[13vw] font-semibold leading-[0.88] tracking-[-0.06em] md:col-span-3 md:text-[7.5vw]">
          <RevealText text="Lo que" />
          <br />
          <RevealText text="construyo" delay={0.1} className="font-serif font-normal italic tracking-[-0.02em] text-red" />
        </h2>
        <p className="self-end text-[15px] leading-relaxed text-cream/70">
          Cuatro disciplinas que se encajan como piezas: código, inmersión, 3D y educación. Pasa el cursor por cada una.
        </p>
      </div>

      <ul className="mt-14 border-b border-line md:mt-20" onPointerLeave={() => setActive(null)}>
        {services.map((s, i) => (
          <motion.li
            key={s.n}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.9, ease: EASE, delay: i * 0.08 }}
          >
            <a
              href={s.href}
              data-cursor="Ver"
              onPointerEnter={() => setActive(i)}
              className="group relative grid grid-cols-[auto_1fr_auto] items-center gap-4 overflow-hidden border-t border-line py-6 md:grid-cols-[80px_1.4fr_1fr_auto] md:gap-8 md:py-9"
            >
              {/* Barrido rojo al pasar el cursor */}
              <span className="absolute inset-0 origin-bottom scale-y-0 bg-red transition-transform duration-500 ease-[var(--ease-io)] group-hover:scale-y-100" />
              <span className="relative font-mono text-xs text-muted transition-colors group-hover:text-cream">
                {s.n}
              </span>
              <span className="relative text-[8vw] font-semibold leading-none tracking-[-0.05em] transition-transform duration-500 ease-[var(--ease-out)] group-hover:translate-x-3 md:text-[4vw]">
                {s.title}
              </span>
              <span className="relative col-span-3 hidden text-sm leading-relaxed text-cream/60 transition-colors group-hover:text-cream md:col-span-1 md:block">
                {s.text}
              </span>
              <span className="relative flex h-11 w-11 items-center justify-center rounded-full border border-line text-lg transition-all duration-500 group-hover:rotate-45 group-hover:border-cream group-hover:bg-cream group-hover:text-red md:h-14 md:w-14">
                ↗
              </span>
              {/* En móvil se muestra la imagen y el texto dentro de la fila */}
              <span className="relative col-span-3 block md:hidden">
                <span className="mb-4 block text-sm leading-relaxed text-cream/60">{s.text}</span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.img} alt={s.title} className="aspect-[16/10] w-full rounded-sm object-cover" loading="lazy" />
              </span>
            </a>
          </motion.li>
        ))}
      </ul>

      <HoverPreview images={services.map((s) => s.img)} active={active} />
    </section>
  );
}
