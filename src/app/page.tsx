import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import AboutUs from "@/components/sections/AboutUs";
import Services from "@/components/sections/Services";
import Projects from "@/components/sections/Projects";
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
      </main>
      <Footer />
    </>
  );
}
