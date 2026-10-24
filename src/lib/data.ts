// Contenido tomado de https://www.jotalab.app — solo cambia el diseño.
// Los enlaces internos apuntan al sitio actual hasta que se migren esas páginas.
export const SITE = "https://www.jotalab.app";
export const EMAIL = "Juliannetorres15@gmail.com";
export const INSTAGRAM = "https://www.instagram.com/_jota.t/";

export const nav = [
  { label: "Inicio", href: "#inicio" },
  { label: "Servicios", href: "#servicios" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Perfil", href: "#perfil" },
  { label: "Blog", href: "#blog" },
  { label: "Contacto", href: "#contacto" },
];

export const services = [
  {
    n: "01",
    title: "Consultoría STEAM",
    short: "Ciencia, tecnología, ingeniería, arte y matemáticas",
    text: "Ayudo a escuelas y equipos a integrar programas de ciencia, tecnología, ingeniería, arte y matemáticas de forma práctica y organizada.",
    img: "/img/services/steam.webp",
    href: `${SITE}/servicios/consultoria-steam`,
    tags: ["Robótica", "WRO RD", "Programas"],
  },
  {
    n: "02",
    title: "Desarrollo Web",
    short: "Plataformas, sistemas y módulos internos",
    text: "Desarrollo, mantenimiento y mejora de sistemas web, módulos internos y recursos digitales para proyectos escalables.",
    img: "/img/services/web.webp",
    href: `${SITE}/servicios/desarrollo-web`,
    tags: ["Next / React", "SEO", "Plataformas"],
  },
  {
    n: "03",
    title: "Realidad AR / VR",
    short: "Experiencias inmersivas optimizadas",
    text: "Desarrollo de experiencias AR/VR optimizadas, integrando assets 3D y asegurando rendimiento en entornos interactivos.",
    img: "/img/services/arvr.webp",
    href: `${SITE}/servicios/realidad-aumentada-virtual`,
    tags: ["Unity", "C#", "XR"],
  },
  {
    n: "04",
    title: "Diseño 3D",
    short: "Modelado, materiales y optimización",
    text: "Modelado, materiales, texturas y optimización para renders, producción y visualización con entregables consistentes.",
    img: "/img/services/3d.webp",
    href: `${SITE}/servicios/diseno-3d`,
    tags: ["Blender", "Render", "Texturas"],
  },
];

export const stats = [
  { value: 78, suffix: "+", label: "Proyectos" },
  { value: 4, suffix: "+", label: "Años de experiencia" },
  { value: 98, suffix: "%", label: "Compromiso" },
  { value: 39, suffix: "+", label: "Clientes" },
];

export const projects = [
  {
    title: "Millions Store",
    text: "Diseño web, marketing digital y comunidad para marca de moda.",
    img: "/img/projects/millions-store.webp",
    href: `${SITE}/proyecto/millions-store`,
    tag: "Web · Marketing",
  },
  {
    title: "Take it Easy",
    text: "Desarrollo 3D e investigación náutica para catamarán exclusivo.",
    img: "/img/projects/take-it-easy-vr.webp",
    href: `${SITE}/proyecto/take-it-easy`,
    tag: "3D · Náutica",
  },
  {
    title: "Vías Seguras VR",
    text: "Experiencia inmersiva de educación vial en realidad virtual.",
    img: "/img/projects/vias-seguras-vr.webp",
    href: `${SITE}/proyecto/vias-seguras`,
    tag: "VR · Educación",
  },
  {
    title: "WRO República Dominicana",
    text: "Marketing digital, asesoría web y SEO para promover la robótica a nivel nacional.",
    img: "/img/projects/wro-rd.webp",
    href: `${SITE}/proyecto/wro-rd`,
    tag: "SEO · Robótica",
  },
  {
    title: "Frank Roofing LLC",
    text: "Desarrollo web y estrategia digital con IA para crecimiento de clientes.",
    img: "/img/projects/frank-roofing.webp",
    href: `${SITE}/proyecto/frank-roofing`,
    tag: "Web · IA",
  },
  {
    title: "Trimly",
    text: "Plataforma de gestión para barberías: reservas, pagos e inteligencia de datos.",
    img: "/img/projects/trimly.webp",
    href: `${SITE}/proyecto/trimly`,
    tag: "SaaS · Producto",
  },
  {
    title: "Pivot",
    text: "Plataforma educativa de AR: aprendizaje interactivo con objetos 3D y comunidad.",
    img: "/img/projects/pivot-ar.webp",
    href: `${SITE}/proyecto/pivot`,
    tag: "AR · Educación",
  },
  {
    title: "EconoPay",
    text: "Plataforma fintech para simplificar pagos de préstamos sin fricción.",
    img: "/img/projects/econopay.webp",
    href: `${SITE}/proyecto/econopay`,
    tag: "Fintech",
  },
];

export const principles = [
  "Me especializo en crear soluciones digitales que combinan desarrollo web, 3D y experiencias inmersivas.",
  "Trabajo con enfoque práctico: entregar rápido, optimizar bien y mantener la calidad del producto en el tiempo.",
  "Acompaño la implementación de programas STEAM y robótica, con enfoque técnico y operativo.",
  "Desarrollo experiencias AR/VR optimizadas, integrando assets 3D y asegurando rendimiento.",
];

export const values = [
  "Innovación",
  "Calidad",
  "Claridad",
  "Colaboración",
  "Adaptabilidad",
  "Mejora continua",
  "Enfoque en usuario",
];

export const experience = [
  {
    role: "Asesor y Desarrollador",
    company: "RunTime / Tierra de Genios",
    date: "2025",
    area: "STEAM, robótica y WRO RD",
    points: [
      "Asesoría técnica para programas STEAM y robótica educativa.",
      "Desarrollo y soporte de plataformas y recursos digitales.",
      "Mantenimiento y mejoras a sistemas internos.",
      "Apoyo técnico a procesos vinculados a WRO RD.",
    ],
  },
  {
    role: "Diseñador 3D",
    company: "Central Romana Corporation",
    date: "2024",
    area: "Modelado náutico",
    points: [
      "Modelado y preparación 3D para catamaranes.",
      "Materiales y texturas orientadas a realismo.",
      "Optimización de modelos para renders.",
    ],
  },
  {
    role: "Desarrollador de Realidad Aumentada",
    company: "Museo del Ámbar Dominicano",
    date: "2023",
    area: "Mar – Sep 2023",
    points: [
      "Modelado, texturizado y animación 3D (Blender).",
      "Desarrollo de experiencia AR.",
      "Optimización de assets interactivos.",
    ],
  },
  {
    role: "Desarrollador de Sistemas y Web",
    company: "Independent Advancement",
    date: "2022",
    area: "Mar – Ago 2022",
    points: [
      "Desarrollo y mantenimiento de sitios web.",
      "Soporte funcional y material visual para campañas.",
    ],
  },
];

export const education = [
  "Tecnólogo en Simulaciones Interactivas y Videojuegos — ITLA (2023)",
  "Bachillerato — Instituto Politécnico La Esperanza (2021)",
  "Técnico: Turismo y Administración — IPE (2021)",
];

export const certifications = [
  "Desarrollo de Realidad Virtual y Aumentada — T-eco Group (2023)",
  "Unity Certified Professional Programmer (2024)",
  "Desarrollo de Realidad Aumentada — Coursera (2024)",
];

export const posts = [
  {
    title: "24 horas para montar una empresa con IA",
    img: "/img/blog/b1.webp",
    href: `${SITE}/blog/24-horas-para-montar-una-empresa`,
    tag: "Reto",
  },
  {
    title: "Supuesta filtración masiva de datos en República Dominicana: lo que se sabe del caso Claro y la Policía Nacional",
    img: "/img/blog/b2.webp",
    href: `${SITE}/blog/supuesta-filtracion-masiva-de-datos-en-republica-dominicana-lo-que-se-sabe-del-caso-claro-y-la-policia-nacional`,
    tag: "Seguridad",
  },
  {
    title: "La inteligencia artificial ya no pide permiso: GPT-6 Astra y el apagón de Claude",
    img: "/img/blog/b3.webp",
    href: `${SITE}/blog/la-inteligencia-artificial-ya-no-pide-permiso-gpt-6-astra-y-el-apagon-de-claude`,
    tag: "IA",
  },
  {
    title: "De la universidad al mercado: lo que aprendí desarrollando software en República Dominicana",
    img: "/img/blog/b4.webp",
    href: `${SITE}/blog/de-la-universidad-al-mercado-lo-que-aprendi-desarrollando-software-en-republica-dominicana`,
    tag: "Carrera",
  },
  {
    title: "Desigualdad laboral en República Dominicana: una nueva generación frente a un mercado que está cambiando",
    img: "/img/blog/b5.webp",
    href: `${SITE}/blog/desigualdad-laboral-en-republica-dominicana-una-nueva-generacion-frente-a-un-mercado-que-esta-cambiando`,
    tag: "Trabajo",
  },
  {
    title: "Apple cumple 50 años: el impacto de Apple en el diseño, la tecnología y la cultura digital",
    img: "/img/blog/b6.webp",
    href: `${SITE}/blog/apple-cumple-50-anos-el-impacto-de-apple-en-la-evolucion-del-diseno-la-tecnologia-y-la-cultura-digital`,
    tag: "Diseño",
  },
];

export const tools = [
  { label: "Generador de QR", href: `${SITE}/herramientas/qr` },
  { label: "Remover fondo con IA", href: `${SITE}/herramientas/remover-fondo` },
  { label: "Generador de contraseñas", href: `${SITE}/herramientas/generador-contrasena` },
  { label: "Transferencia P2P", href: `${SITE}/herramientas/transferencia` },
];
