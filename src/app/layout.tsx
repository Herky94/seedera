import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { LenisProvider } from "@/components/LenisProvider";

const bdoGrotesk = localFont({
  src: "../fonts/BDOGrotesk-VF-BF648a657078401.ttf",
  variable: "--font-bdo-grotesk",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  title: "Seedera | Creative Digital Agency",
  description:
    "Seedera è un'agenzia creativa digitale specializzata in branding, web design, sviluppo e strategia digitale. Coltiviamo idee, facciamo crescere brand.",
  keywords: [
    "agenzia creativa",
    "digital agency",
    "branding",
    "web design",
    "sviluppo web",
    "strategia digitale",
    "Seedera",
  ],
  openGraph: {
    title: "Seedera | Creative Digital Agency",
    description:
      "Coltiviamo idee, facciamo crescere brand. Agenzia creativa digitale.",
    type: "website",
    locale: "it_IT",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body className={`${bdoGrotesk.variable} antialiased`}>
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
