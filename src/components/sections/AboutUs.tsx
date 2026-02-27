"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SLIDES = [
  "Siamo Seedera. Un team di strateghi, designer e sviluppatori che trasformano idee in esperienze digitali memorabili.",
  "Crediamo che ogni brand abbia una storia unica da raccontare. Il nostro compito è darle voce attraverso design, tecnologia e strategia.",
  "Dal concept alla delivery, lavoriamo fianco a fianco con i nostri clienti per costruire prodotti digitali che fanno la differenza.",
];

export default function AboutUs() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const slides = gsap.utils.toArray<HTMLElement>(".about-slide");

      slides.forEach((slide, i) => {
        const words = slide.querySelectorAll(".text-reveal-word");

        // Pin this slide while the text reveals
        ScrollTrigger.create({
          trigger: slide,
          start: "top top",
          end: `+=${window.innerHeight * 1.5}`,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
        });

        // Reveal words one by one
        words.forEach((word, wi) => {
          ScrollTrigger.create({
            trigger: slide,
            start: () =>
              `top+=${(wi / words.length) * window.innerHeight * 1.2} top`,
            end: () =>
              `top+=${((wi + 1) / words.length) * window.innerHeight * 1.2} top`,
            onEnter: () => word.classList.add("active"),
            onLeaveBack: () => word.classList.remove("active"),
          });
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative bg-background"
      aria-label="Chi siamo"
    >
      {/* Section header */}
      <div className="h-screen flex items-center justify-center">
        <h2 className="text-foreground/30 text-sm uppercase tracking-[0.3em]">
          Chi siamo
        </h2>
      </div>

      {SLIDES.map((text, i) => (
        <div
          key={i}
          className="about-slide h-screen flex items-center justify-center px-6 md:px-12"
        >
          <p className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-5xl text-center">
            {text.split(" ").map((word, wi) => (
              <span key={wi} className="text-reveal-word inline-block mr-[0.3em]">
                {word}
              </span>
            ))}
          </p>
        </div>
      ))}
    </section>
  );
}
