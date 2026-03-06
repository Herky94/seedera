"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── Magnetic scatter: letters react to mouse proximity ── */
function useHeroMagnetic(containerRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const chars = container.querySelectorAll<HTMLElement>(".hero-char");
    if (chars.length === 0) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      chars.forEach((char) => {
        const rect = char.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = clientX - cx;
        const dy = clientY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 150;

        if (dist < maxDist) {
          const force = (1 - dist / maxDist) * 8;
          gsap.to(char, {
            x: (-dx / dist) * force,
            y: (-dy / dist) * force,
            duration: 0.3,
            ease: "power2.out",
            overwrite: "auto",
          });
        } else {
          gsap.to(char, {
            x: 0,
            y: 0,
            duration: 0.6,
            ease: "elastic.out(1, 0.5)",
            overwrite: "auto",
          });
        }
      });
    };

    const handleMouseLeave = () => {
      chars.forEach((char) => {
        gsap.to(char, {
          x: 0,
          y: 0,
          duration: 0.8,
          ease: "elastic.out(1, 0.4)",
          overwrite: "auto",
        });
      });
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [containerRef]);
}

function HeroLine({ text }: { text: string }) {
  return (
    <span className="hero-line block">
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="hero-char inline-block"
          style={{ willChange: "transform" }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);

  useHeroMagnetic(headlineRef);

  useGSAP(
    () => {
      const lines = headlineRef.current?.querySelectorAll(".hero-line");
      if (!lines) return;

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.from(lines, {
        y: 100,
        opacity: 0,
        duration: 1.3,
        stagger: 0.12,
      }).from(
        subRef.current,
        {
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.5",
      );
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative w-full flex flex-col justify-end overflow-hidden bg-primary"
      style={{ height: "100svh", minHeight: "100dvh" }}
      aria-label="Hero"
    >
      {/* Bottom-anchored content */}
      <div className="container-content relative z-10 pb-16 md:pb-20">
        <h1
          ref={headlineRef}
          className="text-h1 text-black font-normal uppercase overflow-hidden"
        >
          <HeroLine text="SIAMO UNA DIGITAL COMPANY" />
          <HeroLine text="CI RIVOLGIAMO A START UP" />
          <HeroLine text="E PICCOLE E MEDIE IMPRESE" />
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
