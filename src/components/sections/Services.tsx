"use client";

import { useRef, useState } from "react";
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

/* ── Sub-service list with hover-to-reveal description ── */
function SubServiceList({ subs }: { subs: SubService[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <div className="flex flex-col flex-1">
      {/* Desktop: row layout | Mobile: column */}
      <div className="flex flex-col lg:flex-row lg:justify-between">
        {/* Sub-service names */}
        <ul className="flex flex-col gap-1 shrink-0">
          {subs.map((sub, i) => (
            <li key={i}>
              <button
                className="text-left text-black cursor-pointer leading-none"
                style={{
                  fontSize: "var(--font-h5)",
                  fontWeight: activeIndex === i ? 700 : 400,
                  opacity: activeIndex === i ? 1 : 0.3,
                  transition:
                    "font-weight 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                  padding: "6px 0",
                }}
                onMouseEnter={() => setActiveIndex(i)}
                onClick={() => setActiveIndex(i)}
              >
                {sub.name}
              </button>
            </li>
          ))}
        </ul>

        {/* Description – smooth crossfade */}
        <div className="relative mt-6 lg:mt-0 lg:w-[280px] xl:w-[350px] 2xl:w-[420px] lg:shrink-0 lg:ml-auto min-h-[80px]">
          {subs.map((sub, i) => (
            <p
              key={i}
              className="text-black/80 absolute top-0 left-0 right-0"
              style={{
                fontSize: "clamp(0.875rem, 1.111vw, 1.125rem)",
                lineHeight: 1.5,
                opacity: activeIndex === i ? 1 : 0,
                transform:
                  activeIndex === i ? "translateY(0)" : "translateY(6px)",
                transition:
                  "opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1), transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
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
          <span className="text-black/30 text-btn uppercase tracking-[0.3em] block mb-4">
            Servizi
          </span>
          <h2 className="text-h2 font-bold text-black">Cosa facciamo</h2>
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
