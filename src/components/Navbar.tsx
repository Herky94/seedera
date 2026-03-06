"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLenis } from "lenis/react";
import gsap from "gsap";

const NAV_ITEMS = [
  { label: "Chi siamo", href: "#about" },
  { label: "Servizi", href: "#services" },
  { label: "Persone", href: "#clients" },
  { label: "Progetti", href: "#projects" },
  { label: "Target", href: "#target" },
  { label: "Contattaci", href: "#contact" },
];

/* ── Magnetic pill: subtly follows cursor on hover ── */
function MagneticPill({
  children,
  href,
  onClick,
  className,
  style,
}: {
  children: React.ReactNode;
  href: string;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  className: string;
  style: React.CSSProperties;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    gsap.to(el, { x: x * 0.3, y: y * 0.4, duration: 0.3, ease: "power2.out" });
  }, []);

  const handleLeave = useCallback(() => {
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.4)",
    });
  }, []);

  return (
    <Link
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={className}
      style={{ ...style, willChange: "transform" }}
    >
      {children}
    </Link>
  );
}

/* ── Logo spin: spins 360° on click ── */
function SpinLogo() {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    gsap.to(ref.current, {
      rotation: "+=360",
      duration: 0.8,
      ease: "power3.inOut",
    });
  }, []);

  return (
    <Link
      ref={ref}
      href="/"
      onClick={handleClick}
      className="relative z-50 flex items-center justify-center bg-black rounded-[5px]"
      style={{ padding: "12px 18px", willChange: "transform" }}
    >
      <Image
        src="/Seedera-Logo.svg"
        alt="Seedera"
        width={130}
        height={22}
        priority
        style={{
          height: "18px",
          width: "auto",
          filter: "invert(1) brightness(2)",
        }}
      />
    </Link>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showX, setShowX] = useState(false);
  const [linesWhite, setLinesWhite] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [clipOrigin, setClipOrigin] = useState("calc(100% - 40px) 28px");
  const lenis = useLenis();
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  // Sync clip origin to actual hamburger position on mount + resize
  useEffect(() => {
    const sync = () => {
      if (hamburgerRef.current) {
        const rect = hamburgerRef.current.getBoundingClientRect();
        setClipOrigin(
          `${rect.left + rect.width / 2}px ${rect.top + rect.height / 2}px`,
        );
      }
    };
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  const handleNavClick = useCallback(
    (
      e: React.MouseEvent<HTMLAnchorElement>,
      href: string,
      closeMenu = false,
    ) => {
      e.preventDefault();
      if (closeMenu) setIsOpen(false);
      const target = document.querySelector(href);
      if (target && lenis) {
        lenis.scrollTo(target as HTMLElement, {
          duration: 1.4,
          easing: (t: number) => 1 - Math.pow(1 - t, 4),
        });
      }
    },
    [lenis],
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      lenis?.stop();
      document.documentElement.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.documentElement.style.overflow = "";
    }
    return () => {
      lenis?.start();
      document.documentElement.style.overflow = "";
    };
  }, [isOpen, lenis]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled ? "backdrop-blur-md" : ""
        }`}
      >
        <div className="container-content flex items-center justify-between py-3">
          {/* Left: Logo pill + Nav pills */}
          <div className="flex items-center gap-[10px]">
            {/* Logo pill - spins on click */}
            <SpinLogo />

            {/* Nav pills - hidden on mobile */}
            <nav
              className="hidden md:flex items-center gap-[10px]"
              aria-label="Navigazione principale"
            >
              {NAV_ITEMS.map((item) => (
                <MagneticPill
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-black rounded-[5px] border border-black hover:bg-black hover:text-white transition-all duration-300"
                  style={{
                    padding: "5px 10px",
                    fontSize: "20px",
                    fontWeight: 400,
                  }}
                >
                  {item.label}
                </MagneticPill>
              ))}
            </nav>
          </div>

          {/* Right: Hamburger - always visible */}
          <button
            ref={hamburgerRef}
            onClick={() => {
              if (hamburgerRef.current) {
                const rect = hamburgerRef.current.getBoundingClientRect();
                const cx = rect.left + rect.width / 2;
                const cy = rect.top + rect.height / 2;
                setClipOrigin(`${cx}px ${cy}px`);
              }
              if (isOpen) {
                // Closing: animate X → lines while still white, then close menu, then turn black
                setShowX(false);
                setTimeout(() => setIsOpen(false), 100);
                setTimeout(() => setLinesWhite(false), 800);
              } else {
                // Opening: open menu, show X and turn white immediately
                setIsOpen(true);
                setShowX(true);
                setLinesWhite(true);
              }
            }}
            className={`relative z-50 flex flex-col justify-center items-center ${
              showX ? "hamburger-open" : ""
            }`}
            style={{ gap: "7px" }}
            aria-label={isOpen ? "Chiudi menu" : "Apri menu"}
            aria-expanded={isOpen}
          >
            <span
              className={`hamburger-line block transition-colors duration-300 ${linesWhite ? "bg-white" : "bg-black"}`}
              style={{ width: "33px", height: "1px" }}
            />
            <span
              className={`hamburger-line block transition-colors duration-300 ${linesWhite ? "bg-white" : "bg-black"}`}
              style={{ width: "33px", height: "1px" }}
            />
            <span
              className={`hamburger-line block transition-colors duration-300 ${linesWhite ? "bg-white" : "bg-black"}`}
              style={{ width: "33px", height: "1px" }}
            />
          </button>
        </div>
      </header>

      {/* Fullscreen menu overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black flex flex-col justify-between ${
          isOpen ? "menu-open pointer-events-auto" : "pointer-events-none"
        }`}
        style={{
          clipPath: isOpen
            ? `circle(150% at ${clipOrigin})`
            : `circle(0% at ${clipOrigin})`,
          transition: "clip-path 0.7s cubic-bezier(0.77, 0, 0.18, 1)",
        }}
      >
        {/* Top spacer to push nav below header */}
        <div className="h-24" />

        {/* Nav links */}
        <nav className="flex-1 flex flex-col justify-center container-content">
          {NAV_ITEMS.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href, true)}
              className="mobile-menu-link text-white font-bold tracking-tight hover:text-primary transition-colors duration-300 border-b border-white/10 py-4"
              style={{
                transitionDelay: isOpen ? `${0.3 + i * 0.06}s` : "0s",
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
              }}
            >
              <span className="flex items-center justify-between">
                <span>{item.label}</span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="opacity-40"
                >
                  <path
                    d="M5 15L15 5M15 5H6M15 5v9"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Link>
          ))}
        </nav>

        {/* Bottom info */}
        <div
          className="container-content pb-8 mobile-menu-link"
          style={{
            transitionDelay: isOpen
              ? `${0.3 + NAV_ITEMS.length * 0.06}s`
              : "0s",
          }}
        >
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} Seedera. Tutti i diritti riservati.
          </p>
        </div>
      </div>
    </>
  );
}
