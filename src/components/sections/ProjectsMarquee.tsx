"use client";

const PHRASE_1 = "INSIEME • INNOVIAMO, TRASFORMIAMO, CRESCIAMO";

const PHRASE_2 =
  "Siamo una digital factory che usa i dati ma genera idee out of the box. Tu ci indichi un obiettivo, noi troviamo strade alternative per raggiungerlo velocemente e con risultati concreti.";

export default function ProjectsMarquee() {
  // Repeat enough times for a seamless loop
  const repeats = 6;

  return (
    <section
      className="relative overflow-hidden select-none bg-white z-10"
      aria-label="Marquee"
    >
      {/* Row 1 – right to left, white background */}
      <div className="bg-white py-5 md:py-6">
        <div className="marquee-loop marquee-rtl">
          {Array.from({ length: repeats }).map((_, i) => (
            <span
              key={i}
              className="text-black font-normal uppercase whitespace-nowrap mx-4"
              style={{ fontSize: "80px" }}
            >
              {PHRASE_1} •&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* 50px spacer */}
      <div className="bg-white" style={{ height: "50px" }} />

      {/* Row 2 – left to right, primary background */}
      <div className="bg-primary py-5 md:py-6">
        <div className="marquee-loop marquee-ltr">
          {Array.from({ length: repeats }).map((_, i) => (
            <span
              key={i}
              className="text-background whitespace-nowrap mx-4"
              style={{ fontSize: "20px" }}
            >
              {PHRASE_2}&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
