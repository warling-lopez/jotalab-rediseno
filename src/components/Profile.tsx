"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { certifications, education, experience, values } from "@/lib/data";
import { EASE, FadeUp, RevealText, SectionHead } from "./ui";

function Portrait() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const clip = useTransform(scrollYProgress, [0, 0.35], ["inset(18% 18% 18% 18% round 4px)", "inset(0% 0% 0% 0% round 4px)"]);
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-6, 6]);

  return (
    <div ref={ref} className="relative">
      <motion.div style={{ clipPath: clip }} className="relative aspect-[4/5] overflow-hidden bg-[#e3dfe3]">
        {/* La foto original trae esquinas blancas: se escala un poco para ocultarlas */}
        <motion.img
          src="/img/julianne.webp"
          alt="Julianne Torres"
          style={{ y, scale: 1.18 }}
          className="absolute inset-0 h-full w-full object-cover object-top grayscale-[0.15]"
          loading="lazy"
        />
      </motion.div>
      <motion.div
        style={{ rotate }}
        className="absolute -bottom-8 -right-3 flex h-28 w-28 items-center justify-center rounded-full bg-red text-center md:-right-10 md:h-36 md:w-36"
      >
        <span className="font-serif text-lg italic leading-tight text-cream md:text-2xl">
          CEO &<br />
          Fundador
        </span>
      </motion.div>
    </div>
  );
}

function ExperienceList() {
  const [open, setOpen] = useState(0);
  return (
    <ul className="border-b border-line">
      {experience.map((e, i) => {
        const isOpen = open === i;
        return (
          <li key={e.company} className="border-t border-line">
            <button
              onClick={() => setOpen(isOpen ? -1 : i)}
              className="group grid w-full grid-cols-[56px_1fr_auto] items-center gap-4 py-6 text-left md:grid-cols-[110px_1fr_1fr_auto] md:py-8"
              aria-expanded={isOpen}
            >
              <span className="font-mono text-xs text-red">{e.date}</span>
              <span className="text-xl font-semibold tracking-[-0.03em] transition-transform duration-500 group-hover:translate-x-2 md:text-3xl">
                {e.role}
              </span>
              <span className="hidden text-sm text-cream/60 md:block">{e.company}</span>
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-full border border-line text-lg transition-transform duration-500 ${isOpen ? "rotate-45 bg-cream text-ink" : ""}`}
              >
                +
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-1 gap-4 pb-8 md:grid-cols-[110px_1fr_1fr_auto]">
                    <span />
                    <p className="label">
                      {e.company}
                      <br />
                      {e.area}
                    </p>
                    <ul className="space-y-2 text-[15px] text-cream/75">
                      {e.points.map((p) => (
                        <li key={p} className="flex gap-3">
                          <span className="text-red">—</span>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}

export default function Profile() {
  return (
    <section id="perfil" className="px-4 py-24 md:px-8 md:py-36">
      <SectionHead index="04" title="Perfil & Experiencia" />

      <div className="mt-12 grid grid-cols-1 gap-14 md:mt-20 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-4">
          <Portrait />
        </div>

        <div className="flex flex-col justify-between gap-12 md:col-span-7 md:col-start-6">
          <div>
            <p className="label mb-6">Julianne Torres — Desarrollador & Diseñador 3D</p>
            <h2 className="text-[10vw] font-semibold leading-[0.95] tracking-[-0.05em] md:text-[4.4vw]">
              <RevealText text="Ayudo a personas y organizaciones a alcanzar" />{" "}
              <RevealText
                text="objetivos reales"
                delay={0.2}
                className="font-serif font-normal italic tracking-[-0.01em] text-red"
              />
            </h2>
            <FadeUp delay={0.2}>
              <p className="mt-8 max-w-xl text-[15px] leading-relaxed text-cream/70">
                Con soluciones digitales de alto impacto, claridad técnica y enfoque en el usuario final. Construyo
                plataformas, contenidos y experiencias interactivas fáciles de usar, sólidas técnicamente y optimizadas
                para rendimiento — y acompaño experiencias educativas que aprovechan la tecnología inmersiva.
              </p>
            </FadeUp>
          </div>

          <div className="flex flex-wrap gap-2">
            {values.map((v, i) => (
              <motion.span
                key={v}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.5, ease: EASE }}
                className="rounded-full border border-line px-4 py-2 text-sm transition-colors hover:border-red hover:bg-red"
              >
                {v}
              </motion.span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-24 md:mt-36">
        <div className="mb-8 flex items-end justify-between">
          <h3 className="text-[9vw] font-semibold leading-none tracking-[-0.05em] md:text-[4vw]">
            Experiencia
          </h3>
          <span className="label">2022 → hoy</span>
        </div>
        <ExperienceList />
      </div>

      <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-8">
        {[
          { title: "Educación", items: education },
          { title: "Certificaciones", items: certifications },
        ].map((b) => (
          <FadeUp key={b.title} className="rounded-sm bg-ink-2 p-6 md:p-8">
            <p className="label mb-6 !text-cream">{b.title}</p>
            <ul className="space-y-4">
              {b.items.map((it) => {
                const [name, rest] = it.split(" — ");
                return (
                  <li key={it} className="flex flex-col gap-1 border-t border-line pt-4 md:flex-row md:justify-between md:gap-6">
                    <span className="text-[15px]">{name}</span>
                    <span className="font-mono text-xs text-muted md:text-right">{rest ?? ""}</span>
                  </li>
                );
              })}
            </ul>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
