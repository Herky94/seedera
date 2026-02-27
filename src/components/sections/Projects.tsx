"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    title: "Re-Brand Bloom Studio",
    category: "Branding",
    year: "2025",
    color: "#CDFD51",
  },
  {
    title: "E-commerce Platform Forge",
    category: "Sviluppo",
    year: "2025",
    color: "#DB3A30",
  },
  {
    title: "App UX Catalyst",
    category: "UX Design",
    year: "2024",
    color: "#6396FF",
  },
  {
    title: "Digital Strategy Echo",
    category: "Strategy",
    year: "2024",
    color: "#62CB95",
  },
];

const INTRO_TEXT =
  "Ogni progetto è un seme che coltiviamo con cura. Ecco alcune delle nostre storie di successo.";

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Text reveal for intro
      const words = gsap.utils.toArray<HTMLElement>(".project-text-word");
      const textContainer = sectionRef.current?.querySelector(
        ".project-text-container",
      );

      if (textContainer) {
        ScrollTrigger.create({
          trigger: textContainer,
          start: "top top",
          end: `+=${window.innerHeight * 1.5}`,
          pin: true,
          pinSpacing: true,
        });

        words.forEach((word, i) => {
          ScrollTrigger.create({
            trigger: textContainer,
            start: () =>
              `top+=${(i / words.length) * window.innerHeight * 1.2} top`,
            end: () =>
              `top+=${((i + 1) / words.length) * window.innerHeight * 1.2} top`,
            onEnter: () => word.classList.add("active"),
            onLeaveBack: () => word.classList.remove("active"),
          });
        });
      }

      // Project cards reveal
      const cards = gsap.utils.toArray<HTMLElement>(".project-card");
      cards.forEach((card) => {
        gsap.from(card, {
          y: 80,
          opacity: 0,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative bg-background"
      aria-label="Progetti"
    >
      {/* Text reveal */}
      <div className="project-text-container h-screen flex items-center justify-center">
        <div className="container-content">
          <p className="text-h2 font-bold text-center">
            {INTRO_TEXT.split(" ").map((word, i) => (
              <span
                key={i}
                className="project-text-word text-reveal-word inline-block mr-[0.3em]"
              >
                {word}
              </span>
            ))}
          </p>
        </div>
      </div>

      {/* Projects grid */}
      <div className="container-content pb-20 md:pb-32">
        <span className="text-foreground/30 text-btn uppercase tracking-[0.3em] block mb-12">
          Progetti selezionati
        </span>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {PROJECTS.map((project) => (
            <article
              key={project.title}
              className="project-card group relative overflow-hidden rounded-2xl cursor-pointer"
            >
              {/* Color background */}
              <div
                className="aspect-[4/3] w-full transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundColor: project.color }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className="text-6xl md:text-8xl font-bold opacity-10"
                    style={{
                      color:
                        project.color === "#CDFD51" ||
                        project.color === "#62CB95"
                          ? "#000"
                          : "#fff",
                    }}
                  >
                    {project.category.charAt(0)}
                  </span>
                </div>
              </div>

              {/* Info overlay */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-foreground/40 text-sm">
                    {project.category}
                  </span>
                  <span className="text-foreground/30 text-sm">
                    {project.year}
                  </span>
                </div>
                <h3 className="text-foreground text-h5 font-bold">
                  {project.title}
                </h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
