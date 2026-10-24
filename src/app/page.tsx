import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Manifesto, { Marquee } from "@/components/Manifesto";
import Services from "@/components/Services";
import Stats from "@/components/Stats";
import Projects from "@/components/Projects";
import Profile from "@/components/Profile";
import Blog from "@/components/Blog";
import { Contact, Footer } from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Manifesto />
        <Services />
        <Stats />
        <Projects />
        <Profile />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
