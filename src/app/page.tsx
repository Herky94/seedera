import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import AboutUs from "@/components/sections/AboutUs";
import Services from "@/components/sections/Services";
import Clients from "@/components/sections/Clients";
import Marquee from "@/components/sections/Marquee";
import Projects from "@/components/sections/Projects";
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
        <Clients />
        <Marquee />
        <Projects />
        <TargetPhysics />
      </main>
      <Footer />
    </>
  );
}
