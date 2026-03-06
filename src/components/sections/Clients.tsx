"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CLIENTS = [
  { name: "Acme Corp", sector: "Tech" },
  { name: "Bloom Studio", sector: "Fashion" },
  { name: "Catalyst Ventures", sector: "Finance" },
  { name: "Drift Media", sector: "Media" },
  { name: "Echo Systems", sector: "SaaS" },
  { name: "Forge Industries", sector: "Manufacturing" },
  { name: "Glow Health", sector: "Healthcare" },
  { name: "Hive Collective", sector: "Creative" },
];

const QUOTE =
  "Collaboriamo con brand ambiziosi che vogliono distinguersi nel panorama digitale e costruire connessioni autentiche con il proprio pubblico.";

export default function Clients() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Text reveal
      const words = gsap.utils.toArray<HTMLElement>(".client-text-word");
      const trigger = sectionRef.current?.querySelector(
        ".client-text-container",
      );

      if (trigger) {
        ScrollTrigger.create({
          trigger,
          start: "top top",
          end: `+=${window.innerHeight * 2}`,
          pin: true,
          pinSpacing: true,
        });

        words.forEach((word, i) => {
          ScrollTrigger.create({
            trigger,
            start: () =>
              `top+=${(i / words.length) * window.innerHeight * 1.8} top`,
            end: () =>
              `top+=${((i + 1) / words.length) * window.innerHeight * 1.8} top`,
            onEnter: () => word.classList.add("active"),
            onLeaveBack: () => word.classList.remove("active"),
          });
        });
      }

      // Client cards stagger animation
      const cards = gsap.utils.toArray<HTMLElement>(".client-card");
      cards.forEach((card, i) => {
        gsap.from(card, {
          y: 60,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          delay: (i % 2) * 0.15,
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="clients"
      className="relative bg-background"
      aria-label="Clienti"
    >
      {/* Text reveal */}
      <div className="client-text-container h-screen flex items-center justify-center">
        <div className="container-content">
          <p className="text-h2 font-bold text-center">
            {QUOTE.split(" ").map((word, i) => (
              <span
                key={i}
                className="client-text-word text-reveal-word inline-block mr-[0.3em]"
              >
                {word}
              </span>
            ))}
          </p>
        </div>
      </div>

      {/* Client grid - staggered layout */}
      <div className="container-content py-20 md:py-32">
        <span
          className="inline-flex items-center border border-black text-black font-medium tracking-wide uppercase mb-12"
          style={{
            borderRadius: "7px",
            padding: "5px 14px",
            fontSize: "15px",
          }}
        >
          I nostri clienti
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {CLIENTS.map((client, i) => (
            <div
              key={client.name}
              className={`client-card group relative p-6 md:p-8 rounded-2xl border border-foreground/10 hover:border-primary/50 transition-all duration-300 ${
                i % 2 === 1 ? "sm:mt-12" : ""
              }`}
            >
              {/* Placeholder logo area */}
              <div className="w-16 h-16 rounded-xl bg-foreground/5 group-hover:bg-primary/10 transition-colors duration-300 flex items-center justify-center mb-6">
                <span className="text-foreground/30 text-xl font-bold">
                  {client.name.charAt(0)}
                </span>
              </div>
              <h3 className="text-foreground text-h6 font-bold mb-1">
                {client.name}
              </h3>
              <span className="text-foreground/40 text-btn">
                {client.sector}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
