"use client";

import Link from "next/link";
import Image from "next/image";

const FOOTER_LINKS = [
  { label: "Chi siamo", href: "#about" },
  { label: "Servizi", href: "#services" },
  { label: "Progetti", href: "#projects" },
  { label: "Persone", href: "#clients" },
  { label: "Contatti", href: "#contact" },
];

const SOCIALS = [
  { label: "Instagram", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Behance", href: "#" },
  { label: "Dribbble", href: "#" },
];

export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative bg-primary text-background"
      aria-label="Footer"
    >
      <div className="container-content py-16 md:py-24">
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-16 md:mb-24">
          {/* CTA */}
          <div className="md:col-span-2">
            <h2 className="text-h2 font-bold">
              Hai un progetto?
              <br />
              Parliamone.
            </h2>
            <a
              href="mailto:hello@seedera.it"
              className="inline-block mt-8 text-lg md:text-xl font-medium border-b-2 border-background hover:opacity-70 transition-opacity"
            >
              hello@seedera.it
            </a>
          </div>

          {/* Links */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-8">
            <div>
              <span className="text-background/50 text-sm uppercase tracking-widest block mb-4">
                Navigazione
              </span>
              <nav className="flex flex-col gap-2">
                {FOOTER_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-background hover:opacity-70 transition-opacity text-sm"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div>
              <span className="text-background/50 text-sm uppercase tracking-widest block mb-4">
                Social
              </span>
              <nav className="flex flex-col gap-2">
                {SOCIALS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-background hover:opacity-70 transition-opacity text-sm"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-8 border-t border-background/20">
          <Image
            src="/Seedera-Logo.svg"
            alt="Seedera"
            width={120}
            height={28}
          />
          <span className="text-background/50 text-btn">
            © {new Date().getFullYear()} Seedera. Tutti i diritti riservati.
          </span>
        </div>
      </div>
    </footer>
  );
}
