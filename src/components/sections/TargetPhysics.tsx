"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import Matter from "matter-js";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── Text reveal paragraph ── */
const INTRO_TEXT =
  "Lorem ipsum dolor sit consectetuer adipiscing elit. Aenean um sociis natoque penatibus et magnis dis parturient montes, nascetur";

/* ── Brick data ── */
const BRICKS = [
  { label: "START UP", color: "#DB3A30", textColor: "#fff" },
  { label: "TARGET", color: "#E8E8E8", textColor: "#000" },
  { label: "ARTISTI", color: "#6396FF", textColor: "#fff" },
  { label: "PMI", color: "#62CB95", textColor: "#000" },
  { label: "P.A.", color: "#DB3A30", textColor: "#fff" },
  { label: "TARGET", color: "#F3ADC5", textColor: "#000" },
  { label: "GRANDI IMPRESE", color: "#CDFD51", textColor: "#000" },
  { label: "ASSOCIAZIONI", color: "#62CB95", textColor: "#000" },
  { label: "TARGET", color: "#E8E8E8", textColor: "#000" },
  { label: "TARGET", color: "#CDFD51", textColor: "#000" },
  { label: "TARGET", color: "#DB3A30", textColor: "#fff" },
];

export default function TargetPhysics() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const bricksRef = useRef<Matter.Body[]>([]);
  const domRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef<number>(0);
  const hasDropped = useRef(false);
  const [ready, setReady] = useState(false);

  /* ── Text reveal animation ── */
  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const chars = section.querySelectorAll<HTMLElement>(".target-intro-char");
      if (chars.length === 0) return;

      const textContainer = section.querySelector(".target-intro-text");
      ScrollTrigger.create({
        trigger: textContainer,
        start: "top 80%",
        end: "top 20%",
        scrub: 0.5,
        onUpdate: (self) => {
          const progress = self.progress;
          const totalChars = chars.length;
          chars.forEach((char, ci) => {
            const charProgress = ci / totalChars;
            char.style.color =
              progress > charProgress ? "var(--color-black)" : "var(--color-grey)";
          });
        },
      });
    },
    { scope: sectionRef },
  );

  /* ── Physics setup ── */
  const initPhysics = useCallback(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const w = scene.clientWidth;
    const h = scene.clientHeight;

    // Engine with gravity OFF initially
    const engine = Matter.Engine.create({
      gravity: { x: 0, y: 0, scale: 0.001 },
    });
    engineRef.current = engine;

    // Walls
    const wallT = 60;
    const floorY = h * 0.85; // floor higher up so bricks stack closer to text
    const walls = [
      // Floor
      Matter.Bodies.rectangle(w / 2, floorY + wallT / 2, w * 2, wallT, {
        isStatic: true,
        render: { visible: false },
      }),
      // Left
      Matter.Bodies.rectangle(-wallT / 2, h / 2, wallT, h * 2, {
        isStatic: true,
        render: { visible: false },
      }),
      // Right
      Matter.Bodies.rectangle(w + wallT / 2, h / 2, wallT, h * 2, {
        isStatic: true,
        render: { visible: false },
      }),
    ];

    // Create brick bodies from actual DOM element sizes + margin
    const bricks = BRICKS.map((brick, i) => {
      const el = domRefs.current[i];
      // Use real DOM size + 4px margin on each side to prevent overlap
      const bW = (el ? el.offsetWidth : 200) + 8;
      const bH = (el ? el.offsetHeight : 80) + 8;
      // Position far above the section so they're never visible before drop
      const x = w * 0.15 + Math.random() * w * 0.7;
      const y = -800 - i * 100 - Math.random() * 200;
      const angle = (Math.random() - 0.5) * 0.6;

      return Matter.Bodies.rectangle(x, y, bW, bH, {
        restitution: 0.2,
        friction: 0.5,
        density: 0.003,
        angle,
        label: `brick-${i}`,
      });
    });

    bricksRef.current = bricks;
    Matter.Composite.add(engine.world, [...walls, ...bricks]);

    // Mouse constraint (uses scene div)
    const mouse = Matter.Mouse.create(scene);
    const mc = Matter.MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: 0.2, render: { visible: false } },
    });
    Matter.Composite.add(engine.world, mc);

    // Runner
    const runner = Matter.Runner.create();
    runnerRef.current = runner;
    Matter.Runner.run(runner, engine);

    // Sync DOM
    const syncDOM = () => {
      bricks.forEach((body, i) => {
        const el = domRefs.current[i];
        if (!el) return;
        el.style.transform = `translate(${body.position.x}px, ${body.position.y}px) rotate(${body.angle}rad) translate(-50%, -50%)`;
      });
      rafRef.current = requestAnimationFrame(syncDOM);
    };
    rafRef.current = requestAnimationFrame(syncDOM);

    setReady(true);
  }, []);

  /* ── Drop bricks via ScrollTrigger ── */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Use the intro text as trigger – when it's centered in viewport
    const textEl = section.querySelector(".target-intro-text");
    if (!textEl) return;

    const trigger = ScrollTrigger.create({
      trigger: textEl,
      start: "top 40%",
      once: true,
      onEnter: () => {
        if (hasDropped.current || !engineRef.current) return;
        hasDropped.current = true;
        engineRef.current.gravity.y = 1.5;
      },
    });

    return () => trigger.kill();
  }, [ready]);

  /* ── Lifecycle ── */
  useEffect(() => {
    initPhysics();

    return () => {
      cancelAnimationFrame(rafRef.current);
      if (runnerRef.current) Matter.Runner.stop(runnerRef.current);
      if (engineRef.current) {
        Matter.Composite.clear(engineRef.current.world, false);
        Matter.Engine.clear(engineRef.current);
      }
    };
  }, [initPhysics]);

  return (
    <section
      ref={sectionRef}
      id="target"
      className="relative bg-white z-10 overflow-hidden"
      aria-label="Target"
    >
      {/* Header – pill + text reveal */}
      <div className="container-content pt-24 md:pt-40 pb-16 md:pb-24">
        <div className="flex flex-col items-center text-center">
          {/* Label pill */}
          <div className="mb-8">
            <span
              className="inline-flex items-center border border-black text-black font-medium tracking-wide uppercase"
              style={{
                borderRadius: "7px",
                padding: "5px 14px",
                fontSize: "15px",
              }}
            >
              Target
            </span>
          </div>

          {/* Text reveal */}
          <div className="target-intro-text max-w-3xl">
            <h2 className="text-h2 font-medium leading-[1.2]">
              {INTRO_TEXT.split(" ").map((word, wi) => (
                <span key={wi} className="inline-block mr-[0.3em]">
                  {word.split("").map((char, ci) => (
                    <span
                      key={ci}
                      className="target-intro-char inline-block transition-colors duration-300 ease-out"
                      style={{ color: "var(--color-grey)" }}
                    >
                      {char}
                    </span>
                  ))}
                </span>
              ))}
            </h2>
          </div>
        </div>
      </div>

      {/* Physics scene */}
      <div
        ref={sceneRef}
        className="relative w-full"
        style={{ height: "clamp(350px, 45vh, 550px)", touchAction: "none" }}
      >
        {/* DOM-rendered bricks */}
        {BRICKS.map((brick, i) => (
          <div
            key={i}
            ref={(el) => { domRefs.current[i] = el; }}
            className="absolute top-0 left-0 font-bold uppercase whitespace-nowrap select-none pointer-events-none"
            style={{
              fontSize: "48px",
              padding: "20px 40px",
              borderRadius: "12px",
              backgroundColor: brick.color,
              color: brick.textColor,
              willChange: "transform",
              opacity: ready ? 1 : 0,
            }}
          >
            {brick.label}
          </div>
        ))}
      </div>
    </section>
  );
}
