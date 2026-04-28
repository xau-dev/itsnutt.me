import Navbar from "./components/Navbar";
import ScrollProgress from "./components/ScrollProgress";
import AnnouncementBar from "./components/AnnouncementBar";
import Hero from "./sections/Hero";
import TechStack from "./sections/TechStack";
import Projects from "./sections/Projects";
import Experience from "./sections/Experience";
import Awards from "./sections/Awards";
import Contact from "./sections/Contact";
import Footer from "./components/Footer";
import { getAllPosts } from "@/lib/blogs";

export default async function Home() {
  const posts = await getAllPosts();
  const latestPost = posts[0];

  return (
    <div className="min-h-full bg-grid-lines relative">
      <ScrollProgress />
      <div className="max-w-[1400px] mx-auto relative z-10">
        <Navbar />
        {latestPost && (
          <AnnouncementBar
            title={latestPost.title}
            href={`/blogs/${latestPost.slug}`}
          />
        )}
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
