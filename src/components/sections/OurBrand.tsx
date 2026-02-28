"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";

/* ── Data ── */
interface OwnProject {
  category: string;
  name: string;
  image: string;
}

const OWN_PROJECTS: OwnProject[] = [
  {
    category: "CRM",
    name: "ZENTRO",
    image: "/images/our-brand/zentro.png",
  },
  {
    category: "TIPOLOGIA LAVORO",
    name: "NOME DEL CLIENTE",
    image: "/images/projects/Rectangle 24.png",
  },
  {
    category: "TIPOLOGIA LAVORO",
    name: "NOME DEL CLIENTE",
    image: "/images/projects/Rectangle 27.png",
  },
  {
    category: "CRM",
    name: "ZENTRO",
    image: "/images/projects/Rectangle 24.png",
  },
  {
    category: "TIPOLOGIA LAVORO",
    name: "NOME DEL CLIENTE",
    image: "/images/projects/Rectangle 27.png",
  },
];

/* ── Custom drag cursor ── */
function DragCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const isVisible = useRef(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    gsap.set(cursor, { opacity: 0, scale: 0.5, xPercent: -50, yPercent: -50 });

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (isVisible.current) {
        gsap.to(cursor, {
          left: e.clientX,
          top: e.clientY,
          duration: 0.15,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    };

    const onShow = () => {
      isVisible.current = true;
      gsap.set(cursor, {
        left: mousePos.current.x,
        top: mousePos.current.y,
        scale: 0,
        opacity: 0,
      });
      gsap.to(cursor, {
        opacity: 1,
        scale: 1,
        duration: 0.35,
        ease: "back.out(1.4)",
        overwrite: true,
      });
    };

    const onHide = () => {
      isVisible.current = false;
      gsap.to(cursor, {
        opacity: 0,
        scale: 0,
        duration: 0.25,
        ease: "power2.in",
        overwrite: true,
      });
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("own-project-cursor-show", onShow);
    window.addEventListener("own-project-cursor-hide", onHide);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("own-project-cursor-show", onShow);
      window.removeEventListener("own-project-cursor-hide", onHide);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed pointer-events-none z-50"
      style={{ top: 0, left: 0 }}
    >
      <div
        className="flex items-center justify-center rounded-full text-black font-bold text-center leading-tight uppercase"
        style={{
          width: "120px",
          height: "120px",
          fontSize: "13px",
          backgroundColor: "#CDFD51",
        }}
      >
        &lt; DRAG &gt;
      </div>
    </div>
  );
}

/* ── Main component ── */
export default function OurBrand() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragState = useRef({ startX: 0, scrollLeft: 0 });

  /* Drag handlers */
  const handlePointerDown = (e: React.PointerEvent) => {
    const track = trackRef.current;
    if (!track) return;
    setIsDragging(true);
    dragState.current.startX = e.clientX;
    dragState.current.scrollLeft = track.scrollLeft;
    track.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !trackRef.current) return;
    const dx = e.clientX - dragState.current.startX;
    trackRef.current.scrollLeft = dragState.current.scrollLeft - dx;
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const handleCursorShow = () => {
    window.dispatchEvent(new CustomEvent("own-project-cursor-show"));
  };

  const handleCursorHide = () => {
    window.dispatchEvent(new CustomEvent("own-project-cursor-hide"));
  };

  return (
    <section className="relative bg-white z-10 pb-24 md:pb-40" aria-label="Progetti proprietari">
      <DragCursor />

      {/* Carousel wrapper inside container */}
      <div className="container-content overflow-visible">
        <div
          ref={trackRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide cursor-none select-none -mr-5 md:-mr-12"
          style={{
            scrollSnapType: "x mandatory",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            paddingRight: "20px",
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onMouseEnter={handleCursorShow}
          onMouseLeave={handleCursorHide}
        >
          {OWN_PROJECTS.map((project, i) => (
            <article
              key={i}
              className="shrink-0"
              style={{
                width: "calc((100% - 48px) / 2.3)",
                minWidth: "260px",
                scrollSnapAlign: "start",
              }}
            >
              {/* Image with hover zoom */}
              <div
                className="relative overflow-hidden rounded-[10px] group"
                style={{ aspectRatio: "3 / 4" }}
              >
                <img
                  src={project.image}
                  alt={project.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out scale-[1.15] group-hover:scale-100 will-change-transform"
                  draggable={false}
                />
              </div>

              {/* Category */}
              <p
                className="mt-4 uppercase tracking-wide"
                style={{
                  fontSize: "var(--font-p)",
                  color: "var(--color-middle-grey)",
                }}
              >
                {project.category}
              </p>

              {/* Project name */}
              <h3
                className="uppercase tracking-wide font-medium"
                style={{
                  fontSize: "var(--font-h4)",
                  color: "var(--color-black)",
                }}
              >
                {project.name}
              </h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
