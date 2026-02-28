import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import AboutUs from "@/components/sections/AboutUs";
import Services from "@/components/sections/Services";
import Projects from "@/components/sections/Projects";
import ProjectsMarquee from "@/components/sections/ProjectsMarquee";
import ProjectsOutro from "@/components/sections/ProjectsOutro";
import OurBrand from "@/components/sections/OurBrand";
import TargetPhysics from "@/components/sections/TargetPhysics";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <AboutUs />
        <Services />
        <Projects />
        <ProjectsMarquee />
        <ProjectsOutro />
        <OurBrand />
        <TargetPhysics />
      </main>
      <Footer />
    </>
  );
}
