"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const NAV_ITEMS = [
  { label: "Chi siamo", href: "#about" },
  { label: "Servizi", href: "#services" },
  { label: "Progetti", href: "#projects" },
  { label: "Persone", href: "#clients" },
  { label: "Contattaci", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled ? "backdrop-blur-md" : ""
        }`}
      >
        <div className="container-content flex items-center justify-between py-3">
          {/* Left: Logo pill + Nav pills */}
          <div className="flex items-center gap-1.5">
            {/* Logo pill - filled */}
            <Link
              href="/"
              className="relative z-50 flex items-center"
              style={{ padding: "5px 10px" }}
            >
              <Image
                src="/Seedera-Logo.svg"
                alt="Seedera"
                width={130}
                height={22}
                priority
                style={{ height: "22px", width: "auto" }}
              />
            </Link>

            {/* Nav pills - hidden on mobile */}
            <nav
              className="hidden md:flex items-center gap-1.5"
              aria-label="Navigazione principale"
            >
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-black font-light rounded-[5px] border border-black hover:bg-black hover:text-white transition-all duration-300"
                  style={{ padding: "5px 10px", fontSize: "15px" }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right: Hamburger - always visible */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`relative z-50 flex flex-col justify-center items-center ${
              isOpen ? "hamburger-open" : ""
            }`}
            style={{ gap: "7px" }}
            aria-label={isOpen ? "Chiudi menu" : "Apri menu"}
            aria-expanded={isOpen}
          >
            <span
              className="hamburger-line block bg-black"
              style={{ width: "33px", height: "1px" }}
            />
            <span
              className="hamburger-line block bg-black"
              style={{ width: "33px", height: "1px" }}
            />
            <span
              className="hamburger-line block bg-black"
              style={{ width: "33px", height: "1px" }}
            />
          </button>
        </div>
      </header>

      {/* Fullscreen menu overlay */}
      <div
        className={`fixed inset-0 z-40 bg-primary transition-all duration-500 flex flex-col items-center justify-center gap-8 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {NAV_ITEMS.map((item, i) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setIsOpen(false)}
            className="text-black text-3xl md:text-5xl font-bold tracking-tight hover:opacity-60 transition-opacity duration-300"
            style={{ transitionDelay: isOpen ? `${i * 80}ms` : "0ms" }}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </>
  );
}
