"use client";

import { useRef } from "react";
import { useScroll } from "motion/react";
import { ScrollWord } from "./ui";

const text =
  "Herramientas digitales, innovación, estructurar proyectos innovadores y ayudar al público general a adentrarse en este mundo beneficioso y vasto debería ser nuestro principal objetivo.";

// Palabras resaltadas en serif itálica
const accent = new Set(["innovación,", "innovadores", "mundo", "objetivo."]);

export function Marquee() {
  const items = ["Desarrollo Web", "Realidad Aumentada", "Realidad Virtual", "Diseño 3D", "Consultoría STEAM", "Robótica"];
  const row = (
    <div className="flex shrink-0 items-center">
      {items.map((t) => (
        <span key={t} className="flex items-center">
          <span className="px-6 text-[9vw] font-semibold uppercase leading-none tracking-[-0.05em] md:text-[6vw]">{t}</span>
          <span className="font-serif text-[7vw] italic text-red md:text-[4.5vw]">✳</span>
        </span>
      ))}
    </div>
  );
  return (
    <div className="relative overflow-hidden border-y border-line py-6 md:py-8">
      <div className="marquee" style={{ ["--speed" as string]: "40s" }}>
        {row}
        {row}
      </div>
    </div>
  );
}

export default function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");

  return (
    <section className="px-4 py-28 md:px-8 md:py-44">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        <div className="label space-y-1">
          <p className="text-cream">Departamento de: Software »</p>
          <p>Experiencia en AR y VR con C#</p>
        </div>
        <div ref={ref} className="md:col-span-3">
          <p className="text-[8.5vw] font-medium leading-[1.02] tracking-[-0.04em] md:text-[4.6vw]">
            {words.map((w, i) => {
              const start = i / words.length;
              const end = start + 1 / words.length;
              return (
                <ScrollWord key={i} progress={scrollYProgress} range={[start, end]}>
                  <span className={accent.has(w) ? "font-serif font-normal italic tracking-normal text-red" : ""}>{w}</span>{" "}
                </ScrollWord>
              );
            })}
          </p>
        </div>
      </div>
    </section>
  );
}
