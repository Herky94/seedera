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
  const [activeIndex, setActiveIndex] = useState<number | null>(1); // default 2nd item bold like Figma

  return (
    <div className="flex flex-col md:flex-row flex-1 justify-between">
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
            >
              {sub.name}
            </button>
          </li>
        ))}
      </ul>

      {/* Description – smooth crossfade on hover */}
      <div className="hidden md:flex items-start pt-1 w-[280px] lg:w-[350px] xl:w-[420px] shrink-0 ml-auto relative">
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
            }}
          >
            {sub.description}
          </p>
        ))}
      </div>
    </div>
  );
}

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".service-card");
      const PIN_TOP = 80; // px from viewport top
      const STACK_OFFSET = 80; // px offset between stacked cards

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
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative bg-white"
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
          className="service-card w-full container-content"
          style={{
            marginTop: i === 0 ? 0 : "150px",
          }}
        >
          <div
            className="rounded-[10px] flex flex-col"
            style={{ backgroundColor: service.color }}
          >
            <div className="px-6 md:px-12 lg:px-16 pt-10 md:pt-12 pb-10 md:pb-14">
              {/* ── Row 1: Number + Title (title aligned with subs below) ── */}
              <div
                className="flex items-baseline"
                style={{ gap: "clamp(2rem, 5.556vw, 5rem)" }}
              >
                <span
                  className="text-black font-medium leading-none shrink-0"
                  style={{
                    fontSize: "clamp(2.5rem, 5.417vw, 4.875rem)",
                    width: "clamp(150px, 15.625vw, 225px)",
                  }}
                >
                  0{i + 1}
                </span>
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
              <div className="w-full h-[1px] bg-black/20 mt-5 mb-[35px]" />

              {/* ── Row 3: Image + Subs + Description ── */}
              <div
                className="flex flex-col md:flex-row"
                style={{ gap: "clamp(2rem, 5.556vw, 5rem)" }}
              >
                <div
                  className="shrink-0 bg-black rounded-[5px]"
                  style={{
                    width: "clamp(150px, 15.625vw, 225px)",
                    height: "clamp(150px, 15.625vw, 225px)",
                  }}
                />

                {/* Sub-services with hover description */}
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
