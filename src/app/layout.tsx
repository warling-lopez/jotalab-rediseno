import type { Metadata } from "next";
import { Inter_Tight, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const display = Inter_Tight({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const serif = Instrument_Serif({
  variable: "--font-serif-i",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono-lab",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.jotalab.app"),
  title: "Jota Lab | Desarrollo web, AR/VR y 3D en RD",
  description:
    "Desarrollo plataformas, recursos interactivos y contenido inmersivo para proyectos educativos y marcas. Web, AR/VR, 3D y consultoría STEAM en República Dominicana.",
  openGraph: {
    title: "Jota Lab | Desarrollo web, AR/VR y 3D en RD",
    description:
      "Desarrollo web, experiencias AR/VR, diseño 3D y consultoría STEAM. Julianne Torres — growing with you.",
    images: ["/og.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${display.variable} ${serif.variable} ${mono.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
