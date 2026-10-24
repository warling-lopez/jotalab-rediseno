"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLenis } from "lenis/react";
import Logo from "./Logo";
import { EMAIL, INSTAGRAM, nav, tools } from "@/lib/data";
import { useReady } from "./Providers";

function LocalTime() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("es-DO", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "America/Santo_Domingo",
    });
    const update = () => setTime(fmt.format(new Date()));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums">{time ?? "--:--:--"}</span>;
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const ready = useReady();
  const lenis = useLenis();

  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
  }, [open, lenis]);

  const go = (href: string) => {
    setOpen(false);
    setTimeout(() => lenis?.scrollTo(href, { duration: 1.6 }), 350);
  };

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 mix-blend-difference"
        initial={{ y: -40, opacity: 0 }}
        animate={ready ? { y: 0, opacity: 1 } : undefined}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
      >
        <div className="grid grid-cols-2 items-start gap-4 px-4 py-4 text-cream md:grid-cols-4 md:px-8 md:py-6">
          <a href="#inicio" onClick={(e) => (e.preventDefault(), go("#inicio"))} aria-label="Inicio">
            <Logo className="h-6 w-auto md:h-7" />
          </a>
          <p className="label hidden !text-cream md:block">
            Julianne Torres©
            <br />
            <span className="opacity-60">growing with you</span>
          </p>
          <p className="label hidden !text-cream md:block">
            Santo Domingo, RD
            <br />
            <span className="opacity-60">
              <LocalTime /> GMT-4
            </span>
          </p>
          <div className="flex justify-end">
            <button
              onClick={() => setOpen((v) => !v)}
              className="group flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.08em]"
              aria-expanded={open}
              aria-label="Abrir menú"
            >
              <span className="relative block h-[1.2em] overflow-hidden">
                <span className="block transition-transform duration-500 group-hover:-translate-y-full">
                  {open ? "Cerrar" : "Menú"}
                </span>
                <span className="absolute left-0 top-full block transition-transform duration-500 group-hover:-translate-y-full">
                  {open ? "Cerrar" : "Menú"}
                </span>
              </span>
              <span className="relative flex h-8 w-8 items-center justify-center rounded-full border border-cream/40">
                <span
                  className={`absolute h-px w-3.5 bg-cream transition-transform duration-500 ${open ? "rotate-45" : "-translate-y-[3px]"}`}
                />
                <span
                  className={`absolute h-px w-3.5 bg-cream transition-transform duration-500 ${open ? "-rotate-45" : "translate-y-[3px]"}`}
                />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col bg-cream text-ink"
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            data-lenis-prevent
          >
            <div className="grid flex-1 grid-cols-1 gap-10 overflow-y-auto px-4 pb-8 pt-28 md:grid-cols-4 md:px-8 md:pt-36">
              <nav className="md:col-span-3">
                <ul>
                  {nav.map((item, i) => (
                    <li key={item.href} className="overflow-hidden border-b border-ink/15">
                      <motion.a
                        href={item.href}
                        onClick={(e) => (e.preventDefault(), go(item.href))}
                        className="group flex items-baseline gap-4 py-2 md:py-3"
                        initial={{ y: "100%" }}
                        animate={{ y: "0%" }}
                        exit={{ y: "100%" }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.25 + i * 0.05 }}
                      >
                        <span className="font-mono text-xs text-ink/50">0{i + 1}</span>
                        <span className="text-[12vw] font-semibold leading-[0.95] tracking-[-0.05em] transition-[transform,color] duration-500 group-hover:translate-x-4 group-hover:text-red md:text-[6.5vw]">
                          {item.label}
                        </span>
                        <span className="ml-auto hidden font-serif text-4xl italic opacity-0 transition-opacity duration-500 group-hover:opacity-100 md:block">
                          →
                        </span>
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </nav>
              <motion.aside
                className="flex flex-col justify-end gap-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <div>
                  <p className="label mb-3 !text-ink/50">Herramientas gratis</p>
                  <ul className="space-y-1.5">
                    {tools.map((t) => (
                      <li key={t.href}>
                        <a href={t.href} className="underline-offset-4 hover:text-red hover:underline">
                          {t.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="label mb-3 !text-ink/50">Contacto</p>
                  <a href={`mailto:${EMAIL}`} className="block break-all hover:text-red">
                    {EMAIL}
                  </a>
                  <a href={INSTAGRAM} target="_blank" rel="noreferrer" className="block hover:text-red">
                    Instagram — @_jota.t
                  </a>
                </div>
              </motion.aside>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
