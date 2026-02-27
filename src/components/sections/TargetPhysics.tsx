"use client";

import { useRef, useEffect, useCallback } from "react";
import Matter from "matter-js";

const BRICKS = [
  { label: "Startup", color: "#CDFD51", textDark: true },
  { label: "PMI", color: "#DB3A30", textDark: false },
  { label: "Enterprise", color: "#6396FF", textDark: false },
  { label: "E-commerce", color: "#62CB95", textDark: true },
  { label: "B2B", color: "#CDFD51", textDark: true },
  { label: "B2C", color: "#DB3A30", textDark: false },
  { label: "SaaS", color: "#6396FF", textDark: false },
  { label: "Tech", color: "#62CB95", textDark: true },
  { label: "Fashion", color: "#CDFD51", textDark: true },
  { label: "Food", color: "#DB3A30", textDark: false },
  { label: "Finance", color: "#6396FF", textDark: false },
  { label: "Health", color: "#62CB95", textDark: true },
];

export default function TargetPhysics() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const bricksRef = useRef<Matter.Body[]>([]);
  const mouseConstraintRef = useRef<Matter.MouseConstraint | null>(null);

  const initPhysics = useCallback(() => {
    if (!sceneRef.current || !canvasRef.current) return;

    const w = sceneRef.current.clientWidth;
    const h = sceneRef.current.clientHeight;

    // Engine
    const engine = Matter.Engine.create({
      gravity: { x: 0, y: 1, scale: 0.001 },
    });
    engineRef.current = engine;

    // Renderer
    const render = Matter.Render.create({
      element: sceneRef.current,
      canvas: canvasRef.current,
      engine,
      options: {
        width: w,
        height: h,
        wireframes: false,
        background: "transparent",
        pixelRatio: typeof window !== "undefined" ? window.devicePixelRatio : 1,
      },
    });
    renderRef.current = render;

    // Walls (floor doubles as footer boundary)
    const wallThickness = 60;
    const walls = [
      // Floor
      Matter.Bodies.rectangle(w / 2, h + wallThickness / 2, w, wallThickness, {
        isStatic: true,
        render: { visible: false },
      }),
      // Left
      Matter.Bodies.rectangle(-wallThickness / 2, h / 2, wallThickness, h, {
        isStatic: true,
        render: { visible: false },
      }),
      // Right
      Matter.Bodies.rectangle(w + wallThickness / 2, h / 2, wallThickness, h, {
        isStatic: true,
        render: { visible: false },
      }),
    ];

    // Bricks
    const brickW = Math.min(140, w * 0.15);
    const brickH = Math.min(60, w * 0.065);

    const bricks = BRICKS.map((brick, i) => {
      const col = i % 4;
      const row = Math.floor(i / 4);
      const x = w * 0.2 + col * (brickW + 20) + (Math.random() - 0.5) * 30;
      const y = h * 0.15 + row * (brickH + 20) + (Math.random() - 0.5) * 20;

      return Matter.Bodies.rectangle(x, y, brickW, brickH, {
        chamfer: { radius: 10 },
        restitution: 0.4,
        friction: 0.3,
        density: 0.002,
        render: {
          fillStyle: brick.color,
        },
        label: brick.label,
      });
    });
    bricksRef.current = bricks;

    Matter.Composite.add(engine.world, [...walls, ...bricks]);

    // Mouse interaction
    const mouse = Matter.Mouse.create(render.canvas);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
    });
    mouseConstraintRef.current = mouseConstraint;
    Matter.Composite.add(engine.world, mouseConstraint);
    render.mouse = mouse;

    // Run
    const runner = Matter.Runner.create();
    runnerRef.current = runner;
    Matter.Runner.run(runner, engine);
    Matter.Render.run(render);

    // Custom render: draw labels on bricks
    Matter.Events.on(render, "afterRender", () => {
      const ctx = render.context;
      bricks.forEach((body, i) => {
        const brickData = BRICKS[i];
        const { x, y } = body.position;
        const angle = body.angle;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);
        ctx.fillStyle = brickData.textDark ? "#000" : "#fff";
        ctx.font = `bold ${Math.max(12, brickW * 0.1)}px system-ui, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(brickData.label, 0, 0);
        ctx.restore();
      });
    });
  }, []);

  useEffect(() => {
    initPhysics();

    const handleResize = () => {
      // Cleanup and re-init on resize
      if (renderRef.current) Matter.Render.stop(renderRef.current);
      if (runnerRef.current) Matter.Runner.stop(runnerRef.current);
      if (engineRef.current) Matter.Engine.clear(engineRef.current);
      initPhysics();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (renderRef.current) Matter.Render.stop(renderRef.current);
      if (runnerRef.current) Matter.Runner.stop(runnerRef.current);
      if (engineRef.current) {
        Matter.Composite.clear(engineRef.current.world, false);
        Matter.Engine.clear(engineRef.current);
      }
    };
  }, [initPhysics]);

  // "Explode" effect: throw bricks up when user clicks the CTA
  const handleExplode = () => {
    bricksRef.current.forEach((brick) => {
      Matter.Body.applyForce(brick, brick.position, {
        x: (Math.random() - 0.5) * 0.08,
        y: -0.06 - Math.random() * 0.04,
      });
    });
  };

  return (
    <section
      id="target"
      className="relative min-h-screen bg-background overflow-hidden"
      aria-label="Target"
    >
      {/* Header */}
      <div className="relative z-10 pt-20 md:pt-32 pb-8">
        <div className="container-content">
          <span className="text-foreground/30 text-btn uppercase tracking-[0.3em] block mb-4">
            Il nostro target
          </span>
          <h2 className="text-h2 font-bold text-foreground max-w-3xl">
            Con chi <span className="text-primary">lavoriamo</span>
          </h2>
          <p className="text-p text-foreground/50 mt-4 max-w-xl">
            Trascina i mattoncini, lancialli o falli esplodere. Ogni blocco
            rappresenta un settore in cui operiamo.
          </p>
          <button
            onClick={handleExplode}
            className="mt-6 px-6 py-3 bg-primary text-background font-bold rounded-full hover:scale-105 active:scale-95 transition-transform text-btn uppercase tracking-wider"
          >
            Fai esplodere ✦
          </button>
        </div>
      </div>

      {/* Physics scene */}
      <div ref={sceneRef} className="relative w-full h-[60vh] md:h-[70vh]">
        <canvas ref={canvasRef} className="physics-canvas" />
      </div>
    </section>
  );
}
