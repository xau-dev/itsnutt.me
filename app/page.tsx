import Navbar from "./components/Navbar";
import ScrollProgress from "./components/ScrollProgress";
import Hero from "./sections/Hero";
import TechStack from "./sections/TechStack";
import Projects from "./sections/Projects";
import Experience from "./sections/Experience";
import Awards from "./sections/Awards";
import Contact from "./sections/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-full bg-grid-lines relative">
      <ScrollProgress />
      <div className="max-w-[1400px] mx-auto relative z-10">
        <Navbar />
        <Hero />
        <TechStack />
        <Projects />
        <Experience />
        <Awards />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}
