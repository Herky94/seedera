"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    title: "Branding & Identity",
    description:
      "Costruiamo identità di marca memorabili. Dal naming al logo, dalla brand strategy al sistema visivo completo.",
    color: "var(--service-1)",
    textDark: true,
    tags: ["Brand Strategy", "Visual Identity", "Naming", "Guidelines"],
  },
  {
    title: "Web Design & UX",
    description:
      "Progettiamo esperienze digitali intuitive e coinvolgenti. Interfacce che raccontano storie e convertono.",
    color: "var(--service-2)",
    textDark: false,
    tags: ["UI/UX Design", "Wireframing", "Prototyping", "Design System"],
  },
  {
    title: "Sviluppo Web",
    description:
      "Sviluppiamo soluzioni web performanti e scalabili. Dalla landing page alla piattaforma enterprise.",
    color: "var(--service-3)",
    textDark: false,
    tags: ["Frontend", "Backend", "CMS", "E-commerce"],
  },
  {
    title: "Digital Strategy",
    description:
      "Definiamo strategie digitali data-driven per far crescere il tuo business online e raggiungere i tuoi obiettivi.",
    color: "var(--service-4)",
    textDark: true,
    tags: ["SEO", "Content Strategy", "Analytics", "Growth"],
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".service-card");

      cards.forEach((card, i) => {
        // Pin each card
        ScrollTrigger.create({
          trigger: card,
          start: () => `top-=${i * 60} top`,
          end: "max",
          pin: true,
          pinSpacing: false,
          id: `service-pin-${i}`,
        });

        // Slide effect - cards after the first one slide up over the previous
        if (i > 0) {
          gsap.from(card, {
            y: "100vh",
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: () => `top-=${i * 60} top`,
              scrub: 0.5,
            },
          });
        }
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative"
      aria-label="Servizi"
    >
      {/* Section intro */}
      <div className="h-[50vh] flex items-end pb-20 px-6 md:px-12">
        <div className="max-w-3xl">
          <span className="text-foreground/30 text-sm uppercase tracking-[0.3em] block mb-4">
            Servizi
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-foreground leading-tight">
            Cosa facciamo
          </h2>
        </div>
      </div>

      {/* Service cards */}
      {SERVICES.map((service, i) => (
        <div
          key={i}
          className="service-card min-h-screen w-full flex items-center rounded-t-3xl"
          style={{
            backgroundColor: service.color,
            marginTop: i === 0 ? 0 : "-1px",
          }}
        >
          <div className="w-full px-6 md:px-12 lg:px-20 py-16 md:py-24">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <span
                  className={`text-6xl md:text-8xl font-bold block mb-6 ${
                    service.textDark ? "text-black/20" : "text-white/20"
                  }`}
                >
                  0{i + 1}
                </span>
                <h3
                  className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 ${
                    service.textDark ? "text-black" : "text-white"
                  }`}
                >
                  {service.title}
                </h3>
                <p
                  className={`text-base md:text-lg leading-relaxed max-w-lg ${
                    service.textDark ? "text-black/70" : "text-white/70"
                  }`}
                >
                  {service.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`px-5 py-2.5 rounded-full text-sm font-medium border ${
                      service.textDark
                        ? "border-black/20 text-black"
                        : "border-white/30 text-white"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Spacer for scroll after last pinned card */}
      <div className="h-[50vh]" />
    </section>
  );
}
