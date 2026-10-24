"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView } from "motion/react";
import { principles, stats } from "@/lib/data";
import { EASE, RevealText } from "./ui";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, value, { duration: 2, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, value]);
  return (
    <span ref={ref} className="tabular-nums">
      {n}
      <span className="text-red">{suffix}</span>
    </span>
  );
}

export default function Stats() {
  return (
    <section className="bg-cream px-4 py-24 text-ink md:px-8 md:py-36">
      <div className="flex items-center gap-4 border-t border-ink/15 pt-4">
        <span className="label !text-ink">[ 02 ]</span>
        <span className="label !text-ink/60">Sobre mí</span>
        <span className="h-px flex-1 bg-ink/15" />
        <span className="label !text-ink/60">(En números)</span>
      </div>

      <h2 className="mt-10 max-w-[18ch] text-[11vw] font-semibold leading-[0.92] tracking-[-0.055em] md:mt-14 md:text-[6.2vw]">
        <RevealText text="Lleva tu proyecto al" />{" "}
        <RevealText text="siguiente nivel" delay={0.15} className="font-serif font-normal italic tracking-[-0.02em] text-red" />
      </h2>

      <div className="mt-16 grid grid-cols-2 border-t border-ink/15 md:mt-24 md:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            className="border-b border-ink/15 py-6 pr-4 md:border-b-0 md:border-r md:py-8 md:pl-6 md:first:pl-0 md:last:border-r-0"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE, delay: i * 0.1 }}
          >
            <p className="text-[18vw] font-semibold leading-none tracking-[-0.07em] md:text-[8vw]">
              <Counter value={s.value} suffix={s.suffix} />
            </p>
            <p className="label mt-3 !text-ink/60">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-10 md:mt-24 md:grid-cols-4">
        {principles.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE, delay: i * 0.1 }}
            className="border-t border-ink pt-4"
          >
            <span className="font-serif text-3xl italic text-red">0{i + 1}</span>
            <p className="mt-3 text-[15px] leading-relaxed text-ink/80">{p}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
