# Jota Lab — rediseño

Rediseño creativo de https://www.jotalab.app en Next.js 16 + Tailwind 4 + Motion + Lenis.
Mismo contenido y fotos, diseño nuevo.

```bash
npm install
npm run dev   # http://localhost:3000
```

- Textos y enlaces: `src/lib/data.ts`
- Secciones: `src/components/`
- Imágenes optimizadas (WebP): `public/img/` — originales en `originales/` (no se publica)
- Los enlaces a subpáginas (servicios, proyectos, blog, herramientas) apuntan al sitio actual.
- El formulario de contacto abre el correo del visitante con el mensaje prellenado.
