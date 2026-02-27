"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();
      tl.from(headlineRef.current, {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      }).from(
        subRef.current,
        {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.6",
      );
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative w-full h-screen flex flex-col justify-end overflow-hidden bg-primary"
      aria-label="Hero"
    >
      {/* Bottom-anchored content */}
      <div className="container-content relative z-10 pb-16 md:pb-20">
        <h1
          ref={headlineRef}
          className="text-h1 text-black font-normal uppercase"
        >
          SIAMO UNA DIGITAL COMPANY
          <br />
          CI RIVOLGIAMO A START UP
          <br />E PICCOLE E MEDIE IMPRESE
        </h1>
      </div>

      {/* Scroll indicator */}
      <div
        ref={subRef}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-10 h-10 rounded-full border-2 border-black/30 flex items-center justify-center animate-bounce">
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 1v10M7 11l4-4M7 11L3 7"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
