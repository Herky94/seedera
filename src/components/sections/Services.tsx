"use client";

import { useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SubService {
  name: string;
  description: string;
}

interface Service {
  title: string;
  color: string;
  textDark: boolean;
  subs: SubService[];
}

const SERVICES: Service[] = [
  {
    title: "BRAND IDENTITY",
    color: "var(--color-yellow)",
    textDark: true,
    subs: [
      {
        name: "Art Direction",
        description:
          "The visual heartbeat of your brand: we shape a distinct visual language that turns heads, stirs hearts, and makes your brand unforgettable.",
      },
      {
        name: "Visual and verbal identity",
        description:
          "The visual heartbeat of your brand: we shape a distinct visual language that turns heads, stirs hearts, and makes your brand unforgettable.",
      },
      {
        name: "Logotype and design system",
        description:
          "The visual heartbeat of your brand: we shape a distinct visual language that turns heads, stirs hearts, and makes your brand unforgettable.",
      },
      {
        name: "Brand book and guidelines",
        description:
          "The visual heartbeat of your brand: we shape a distinct visual language that turns heads, stirs hearts, and makes your brand unforgettable.",
      },
      {
        name: "Illustrations and visuals",
        description:
          "The visual heartbeat of your brand: we shape a distinct visual language that turns heads, stirs hearts, and makes your brand unforgettable.",
      },
      {
        name: "Motion Graphics and storytelling",
        description:
          "The visual heartbeat of your brand: we shape a distinct visual language that turns heads, stirs hearts, and makes your brand unforgettable.",
      },
      {
        name: "Packaging Design",
        description:
          "The visual heartbeat of your brand: we shape a distinct visual language that turns heads, stirs hearts, and makes your brand unforgettable.",
      },
    ],
  },
  {
    title: "COMUNICAZIONE INTEGRATA",
    color: "var(--color-red)",
    textDark: true,
    subs: [
      {
        name: "Sotto servizio 1",
        description:
          "The visual heartbeat of your brand: we shape a distinct visual language that turns heads, stirs hearts, and makes your brand unforgettable.",
      },
      {
        name: "Sotto servizio 2",
        description:
          "The visual heartbeat of your brand: we shape a distinct visual language that turns heads, stirs hearts, and makes your brand unforgettable.",
      },
      {
        name: "Sotto servizio 3",
        description:
          "The visual heartbeat of your brand: we shape a distinct visual language that turns heads, stirs hearts, and makes your brand unforgettable.",
      },
      {
        name: "Sotto servizio 4",
        description:
          "The visual heartbeat of your brand: we shape a distinct visual language that turns heads, stirs hearts, and makes your brand unforgettable.",
      },
      {
        name: "Sotto servizio 5",
        description:
          "The visual heartbeat of your brand: we shape a distinct visual language that turns heads, stirs hearts, and makes your brand unforgettable.",
      },
      {
        name: "Sotto servizio 6",
        description:
          "The visual heartbeat of your brand: we shape a distinct visual language that turns heads, stirs hearts, and makes your brand unforgettable.",
      },
      {
        name: "Sotto servizio 7",
        description:
          "The visual heartbeat of your brand: we shape a distinct visual language that turns heads, stirs hearts, and makes your brand unforgettable.",
      },
    ],
  },
  {
    title: "BRAND STRATEGY",
    color: "var(--color-cyan)",
    textDark: true,
    subs: [
      {
        name: "Sotto servizio 1",
        description:
          "The visual heartbeat of your brand: we shape a distinct visual language that turns heads, stirs hearts, and makes your brand unforgettable.",
      },
      {
        name: "Sotto servizio 2",
        description:
          "The visual heartbeat of your brand: we shape a distinct visual language that turns heads, stirs hearts, and makes your brand unforgettable.",
      },
      {
        name: "Sotto servizio 3",
        description:
          "The visual heartbeat of your brand: we shape a distinct visual language that turns heads, stirs hearts, and makes your brand unforgettable.",
      },
      {
        name: "Sotto servizio 4",
        description:
          "The visual heartbeat of your brand: we shape a distinct visual language that turns heads, stirs hearts, and makes your brand unforgettable.",
      },
      {
        name: "Sotto servizio 5",
        description:
          "The visual heartbeat of your brand: we shape a distinct visual language that turns heads, stirs hearts, and makes your brand unforgettable.",
      },
      {
        name: "Sotto servizio 6",
        description:
          "The visual heartbeat of your brand: we shape a distinct visual language that turns heads, stirs hearts, and makes your brand unforgettable.",
      },
      {
        name: "Sotto servizio 7",
        description:
          "The visual heartbeat of your brand: we shape a distinct visual language that turns heads, stirs hearts, and makes your brand unforgettable.",
      },
    ],
  },
  {
    title: "WEB E PRODUCT DESIGN",
    color: "var(--color-green)",
    textDark: true,
    subs: [
      {
        name: "Sotto servizio 1",
        description:
          "The visual heartbeat of your brand: we shape a distinct visual language that turns heads, stirs hearts, and makes your brand unforgettable.",
      },
      {
        name: "Sotto servizio 2",
        description:
          "The visual heartbeat of your brand: we shape a distinct visual language that turns heads, stirs hearts, and makes your brand unforgettable.",
      },
      {
        name: "Sotto servizio 3",
        description:
          "The visual heartbeat of your brand: we shape a distinct visual language that turns heads, stirs hearts, and makes your brand unforgettable.",
      },
      {
        name: "Sotto servizio 4",
        description:
          "The visual heartbeat of your brand: we shape a distinct visual language that turns heads, stirs hearts, and makes your brand unforgettable.",
      },
      {
        name: "Sotto servizio 5",
        description:
          "The visual heartbeat of your brand: we shape a distinct visual language that turns heads, stirs hearts, and makes your brand unforgettable.",
      },
      {
        name: "Sotto servizio 6",
        description:
          "The visual heartbeat of your brand: we shape a distinct visual language that turns heads, stirs hearts, and makes your brand unforgettable.",
      },
      {
        name: "Sotto servizio 7",
        description:
          "The visual heartbeat of your brand: we shape a distinct visual language that turns heads, stirs hearts, and makes your brand unforgettable.",
      },
    ],
  },
];

/* ── Scramble text: matrix-style reveal on hover ── */
function ScrambleText({ text, active }: { text: string; active: boolean }) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const handleEnter = useCallback(() => {
    if (tweenRef.current) tweenRef.current.kill();
    const obj = { progress: 0 };
    tweenRef.current = gsap.to(obj, {
      progress: 1,
      duration: 0.35,
      ease: "none",
      onUpdate: () => {
        if (!spanRef.current) return;
        const p = obj.progress;
        const resolved = Math.floor(p * text.length);
        spanRef.current.textContent = text
          .split("")
          .map((ch, i) => {
            if (ch === " ") return " ";
            return i < resolved
              ? ch
              : chars[Math.floor(Math.random() * chars.length)];
          })
          .join("");
      },
      onComplete: () => {
        if (spanRef.current) spanRef.current.textContent = text;
      },
    });
  }, [text]);

  return (
    <span
      ref={spanRef}
      onMouseEnter={handleEnter}
      className="inline-block"
      style={{
        fontWeight: active ? 700 : 400,
        opacity: active ? 1 : 0.3,
        transform: active ? "translateX(8px)" : "translateX(0)",
        transition:
          "font-weight 0.4s ease, opacity 0.4s ease, transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {text}
    </span>
  );
}

/* ── Sub-service list with animated hover reveal ── */
function SubServiceList({ subs }: { subs: SubService[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const listRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  // Animate the active indicator line to the active item
  useGSAP(
    () => {
      if (activeIndex === null || !listRef.current || !lineRef.current) return;
      const buttons = listRef.current.querySelectorAll<HTMLElement>(".sub-btn");
      const target = buttons[activeIndex];
      if (!target) return;

      const parentRect = listRef.current.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();

      gsap.to(lineRef.current, {
        y: targetRect.top - parentRect.top + targetRect.height * 0.2,
        height: targetRect.height * 0.6,
        duration: 0.4,
        ease: "power3.out",
      });
    },
    { scope: listRef, dependencies: [activeIndex] },
  );

  // Animate description change
  useGSAP(
    () => {
      if (!descRef.current) return;
      const paragraphs =
        descRef.current.querySelectorAll<HTMLElement>(".desc-item");

      paragraphs.forEach((p, i) => {
        if (i === activeIndex) {
          gsap.killTweensOf(p);
          gsap.to(p, {
            opacity: 1,
            y: 0,
            duration: 0.45,
            delay: 0.2,
            ease: "power3.out",
          });
        } else {
          gsap.killTweensOf(p);
          gsap.to(p, {
            opacity: 0,
            y: -8,
            duration: 0.2,
            ease: "power2.in",
          });
        }
      });
    },
    { scope: descRef, dependencies: [activeIndex] },
  );

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col lg:flex-row lg:justify-between">
        {/* Sub-service names with animated line indicator */}
        <div ref={listRef} className="relative shrink-0">
          {/* Animated vertical indicator */}
          <div
            ref={lineRef}
            className="absolute left-0 top-0 w-[2px] bg-black rounded-full"
            style={{ height: 0 }}
          />

          <ul className="flex flex-col">
            {subs.map((sub, i) => (
              <li key={i}>
                <button
                  className="sub-btn text-left text-black cursor-pointer leading-none block w-full"
                  style={{
                    fontSize: "var(--font-h5)",
                    padding: "8px 0 8px 16px",
                  }}
                  onMouseEnter={() => setActiveIndex(i)}
                  onClick={() => setActiveIndex(i)}
                >
                  <ScrambleText text={sub.name} active={activeIndex === i} />
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Description area with GSAP crossfade */}
        <div
          ref={descRef}
          className="relative mt-6 lg:mt-0 lg:w-[280px] xl:w-[350px] 2xl:w-[420px] lg:shrink-0 lg:ml-auto min-h-[80px]"
        >
          {subs.map((sub, i) => (
            <p
              key={i}
              className="desc-item text-black/80 absolute top-0 left-0 right-0"
              style={{
                fontSize: "clamp(0.875rem, 1.111vw, 1.125rem)",
                lineHeight: 1.5,
                opacity: i === 0 ? 1 : 0,
                transform: i === 0 ? "translateY(0)" : "translateY(12px)",
                pointerEvents: activeIndex === i ? "auto" : "none",
              }}
            >
              {sub.description}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Mobile / Tablet
      mm.add("(max-width: 767px)", () => {
        const cards = gsap.utils.toArray<HTMLElement>(".service-card");
        const PIN_TOP = 60;
        const STACK_OFFSET = 30;

        cards.forEach((card, i) => {
          ScrollTrigger.create({
            trigger: card,
            start: () => `top-=${i * STACK_OFFSET} top+=${PIN_TOP}`,
            endTrigger: sectionRef.current,
            end: "bottom bottom",
            pin: true,
            pinSpacing: false,
            invalidateOnRefresh: true,
            id: `service-pin-${i}`,
          });
        });
      });

      // Desktop
      mm.add("(min-width: 768px)", () => {
        const cards = gsap.utils.toArray<HTMLElement>(".service-card");
        const PIN_TOP = 80;
        const STACK_OFFSET = 80;

        cards.forEach((card, i) => {
          ScrollTrigger.create({
            trigger: card,
            start: () => `top-=${i * STACK_OFFSET} top+=${PIN_TOP}`,
            endTrigger: sectionRef.current,
            end: "bottom bottom",
            pin: true,
            pinSpacing: false,
            invalidateOnRefresh: true,
            id: `service-pin-${i}`,
          });
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative z-0 bg-white"
      aria-label="Servizi"
    >
      {/* Section intro */}
      <div className="pt-24 md:pt-32 pb-12 md:pb-20">
        <div className="container-content">
          <span
            className="inline-flex items-center border border-black text-black font-medium tracking-wide uppercase mb-4"
            style={{
              borderRadius: "7px",
              padding: "5px 14px",
              fontSize: "15px",
            }}
          >
            Servizi
          </span>
          <h2 className="text-h2 font-medium text-black">Cosa facciamo</h2>
        </div>
      </div>

      {/* Service cards */}
      {SERVICES.map((service, i) => (
        <div
          key={i}
          className={`service-card w-full container-content ${i > 0 ? "mt-4 md:mt-[150px]" : ""}`}
        >
          <div
            className="rounded-[10px] flex flex-col"
            style={{ backgroundColor: service.color }}
          >
            <div className="px-5 md:px-12 lg:px-16 pt-8 md:pt-12 pb-8 md:pb-14">
              {/* ── Row 1: Number + Title ── */}
              <div className="flex items-baseline gap-4">
                <span
                  className="text-black font-medium leading-none shrink-0 md:w-[clamp(150px,15.625vw,225px)]"
                  style={{
                    fontSize: "clamp(2rem, 5.417vw, 4.875rem)",
                  }}
                >
                  0{i + 1}
                </span>
                {/* Desktop spacer to match image+gap below */}
                <div
                  className="hidden md:block shrink-0"
                  style={{ width: "clamp(2rem, 5.556vw, 5rem)" }}
                />
                <h3
                  className="text-black font-normal uppercase leading-none"
                  style={{
                    fontSize: "var(--font-h2)",
                  }}
                >
                  {service.title}
                </h3>
              </div>

              {/* ── Separator ── */}
              <div className="w-full h-[1px] bg-black/20 mt-5 mb-6 md:mb-[35px]" />

              {/* ── Content: Image + Subs + Description ── */}
              <div
                className="flex flex-col md:flex-row"
                style={{ gap: "clamp(1.25rem, 5.556vw, 5rem)" }}
              >
                <div className="shrink-0 bg-black rounded-[5px] w-[120px] h-[120px] md:w-[clamp(150px,15.625vw,225px)] md:h-[clamp(150px,15.625vw,225px)]" />

                {/* Sub-services with hover/click description */}
                <SubServiceList subs={service.subs} />
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
