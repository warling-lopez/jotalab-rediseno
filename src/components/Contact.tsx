"use client";

import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { useLenis } from "lenis/react";
import { EMAIL, INSTAGRAM, SITE, nav, tools } from "@/lib/data";
import Logo from "./Logo";
import { EASE, Magnetic, RevealText } from "./ui";

const options = [
  "Asesoría STEAM y Robótica",
  "Desarrollo Web y Plataformas",
  "Realidad Aumentada y Virtual",
  "Diseño y Optimización 3D",
];

function Field({ label, name, type = "text", textarea = false }: { label: string; name: string; type?: string; textarea?: boolean }) {
  const cls =
    "peer w-full border-b border-line bg-transparent pb-3 pt-6 text-lg text-cream outline-none transition-colors placeholder-transparent focus:border-red";
  return (
    <label className="relative block">
      {textarea ? (
        <textarea name={name} rows={3} placeholder={label} required className={`${cls} resize-none`} />
      ) : (
        <input name={name} type={type} placeholder={label} required className={cls} />
      )}
      <span className="label pointer-events-none absolute left-0 top-0 transition-colors peer-focus:!text-red">{label}</span>
    </label>
  );
}

export function Contact() {
  const [service, setService] = useState(options[1]);

  // Sin backend: abre el correo del visitante con todo prellenado.
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const subject = `Proyecto: ${service} — ${f.get("name")}`;
    const body = `${f.get("message")}\n\n— ${f.get("name")} (${f.get("email")})`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="contacto" className="px-4 py-24 md:px-8 md:py-36">
      <div className="flex items-center gap-4 border-t border-line pt-4">
        <span className="label text-cream">[ 06 ]</span>
        <span className="label">Contacto</span>
        <span className="h-px flex-1 bg-line" />
        <span className="label flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-red" />
          </span>
          Disponible para proyectos
        </span>
      </div>

      <h2 className="mt-10 text-[17vw] font-semibold uppercase leading-[0.82] tracking-[-0.07em] md:mt-14 md:text-[13vw]">
        <RevealText text="Hablemos" by="char" />
        <motion.span
          className="ml-[2vw] inline-block font-serif text-[12vw] font-normal normal-case italic tracking-[-0.02em] text-red md:text-[9vw]"
          initial={{ opacity: 0, rotate: -20 }}
          whileInView={{ opacity: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: EASE, delay: 0.4 }}
        >
          ↘
        </motion.span>
      </h2>

      <div className="mt-14 grid grid-cols-1 gap-14 md:mt-20 md:grid-cols-12 md:gap-8">
        <div className="space-y-8 md:col-span-4">
          <p className="max-w-sm text-[15px] leading-relaxed text-cream/70">
            Si necesitas una plataforma web, una experiencia AR o producción 3D optimizada, puedo ayudarte a planificar y
            ejecutar una solución clara y funcional.
          </p>
          <div>
            <p className="label mb-2">Correo</p>
            <a href={`mailto:${EMAIL}`} className="break-all text-lg underline decoration-line underline-offset-4 hover:text-red">
              {EMAIL}
            </a>
          </div>
          <div>
            <p className="label mb-2">Social</p>
            <a href={INSTAGRAM} target="_blank" rel="noreferrer" className="text-lg hover:text-red">
              Instagram ↗
            </a>
          </div>
        </div>

        <form onSubmit={submit} className="space-y-8 md:col-span-7 md:col-start-6">
          <fieldset>
            <legend className="label mb-4">Servicio requerido</legend>
            <div className="flex flex-wrap gap-2">
              {options.map((o) => (
                <button
                  type="button"
                  key={o}
                  onClick={() => setService(o)}
                  className={`rounded-full border px-4 py-2 text-sm transition-colors duration-300 ${
                    service === o ? "border-red bg-red text-cream" : "border-line hover:border-cream"
                  }`}
                  aria-pressed={service === o}
                >
                  {o}
                </button>
              ))}
            </div>
          </fieldset>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <Field label="Tu nombre" name="name" />
            <Field label="Tu correo" name="email" type="email" />
          </div>
          <Field label="Cuéntame tu proyecto" name="message" textarea />
          <Magnetic strength={0.25}>
            <button
              type="submit"
              className="group relative flex h-32 w-32 items-center justify-center overflow-hidden rounded-full bg-cream text-sm font-medium text-ink md:h-40 md:w-40"
            >
              <span className="absolute inset-0 scale-0 rounded-full bg-red transition-transform duration-500 ease-[var(--ease-out)] group-hover:scale-100" />
              <span className="relative transition-colors duration-500 group-hover:text-cream">Enviar mensaje ↗</span>
            </button>
          </Magnetic>
        </form>
      </div>
    </section>
  );
}

export function Footer() {
  const lenis = useLenis();
  return (
    <footer className="overflow-hidden bg-cream px-4 pb-6 pt-16 text-ink md:px-8 md:pt-24">
      <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
        <div>
          <p className="label mb-4 !text-ink/50">Mapa</p>
          <ul className="space-y-1.5">
            {nav.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  onClick={(e) => (e.preventDefault(), lenis?.scrollTo(n.href, { duration: 1.6 }))}
                  className="hover:text-red"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="label mb-4 !text-ink/50">Herramientas</p>
          <ul className="space-y-1.5">
            {tools.map((t) => (
              <li key={t.href}>
                <a href={t.href} className="hover:text-red">
                  {t.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="label mb-4 !text-ink/50">Más</p>
          <ul className="space-y-1.5">
            <li><a href={`${SITE}/servicios`} className="hover:text-red">Servicios</a></li>
            <li><a href={`${SITE}/blog`} className="hover:text-red">Blog</a></li>
            <li><a href={`${SITE}/mapa-del-sitio`} className="hover:text-red">Mapa del sitio</a></li>
          </ul>
        </div>
        <div className="flex flex-col items-start justify-between gap-6 md:items-end">
          <button
            onClick={() => lenis?.scrollTo(0, { duration: 2 })}
            className="group flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest"
          >
            Volver arriba
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/20 transition-all duration-500 group-hover:-translate-y-1 group-hover:bg-ink group-hover:text-cream">
              ↑
            </span>
          </button>
          <p className="label !text-ink/50 md:text-right">© Jota Lab — Julianne Torres<br />Hecho en RD</p>
        </div>
      </div>

      <motion.div
        className="mt-16 md:mt-24"
        initial={{ y: "40%", opacity: 0 }}
        whileInView={{ y: "0%", opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: EASE }}
      >
        <Logo className="w-full text-ink" />
      </motion.div>
    </footer>
  );
}
