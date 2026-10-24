"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { posts, SITE } from "@/lib/data";
import HoverPreview from "./HoverPreview";
import { EASE, Magnetic, RevealText, SectionHead } from "./ui";

export default function Blog() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="blog" className="px-4 py-24 md:px-8 md:py-36">
      <SectionHead index="05" title="Blog" count="Últimas novedades" />

      <div className="mt-10 flex flex-col justify-between gap-8 md:mt-14 md:flex-row md:items-end">
        <h2 className="text-[13vw] font-semibold leading-[0.88] tracking-[-0.06em] md:text-[7.5vw]">
          <RevealText text="Notas del" />
          <br />
          <RevealText text="laboratorio" delay={0.1} className="font-serif font-normal italic tracking-[-0.02em] text-red" />
        </h2>
        <Magnetic>
          <a
            href={`${SITE}/blog`}
            className="flex h-28 w-28 items-center justify-center rounded-full border border-line text-sm transition-colors duration-500 hover:border-red hover:bg-red md:h-36 md:w-36"
          >
            Ver todos ↗
          </a>
        </Magnetic>
      </div>

      <ul className="mt-14 border-b border-line md:mt-20" onPointerLeave={() => setActive(null)}>
        {posts.map((p, i) => (
          <motion.li
            key={p.href}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -8% 0px" }}
            transition={{ duration: 0.8, ease: EASE, delay: i * 0.05 }}
          >
            <a
              href={p.href}
              data-cursor="Leer"
              onPointerEnter={() => setActive(i)}
              className={`group grid grid-cols-[1fr_auto] items-center gap-4 border-t border-line py-6 transition-opacity duration-500 md:grid-cols-[80px_140px_1fr_auto] md:gap-8 md:py-8 ${
                active !== null && active !== i ? "md:opacity-30" : ""
              }`}
            >
              <span className="hidden font-mono text-xs text-muted md:block">{String(i + 1).padStart(2, "0")}</span>
              <span className="label hidden md:block">{p.tag}</span>
              <span className="text-lg font-medium leading-snug tracking-[-0.02em] transition-transform duration-500 group-hover:translate-x-2 md:text-2xl">
                {p.title}
              </span>
              <span className="text-xl transition-transform duration-500 group-hover:rotate-45 group-hover:text-red">↗</span>
            </a>
          </motion.li>
        ))}
      </ul>

      <HoverPreview images={posts.map((p) => p.img)} active={active} width={320} height={220} />
    </section>
  );
}
