import heroImage from "@/assets/hero-studio.jpg";

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 hero-overlay" />

      {/* Top eyebrow rail */}
      <div className="absolute top-28 left-0 right-0 z-10">
        <div className="container mx-auto px-8">
          <div className="flex items-center gap-4 text-[hsl(120_11%_97%)]/70 reveal">
            <span className="rule-gold" />
            <span className="text-minimal">Solis Institute · Est. 2022</span>
          </div>
        </div>
      </div>

      {/* Headline block, left-aligned editorial */}
      <div className="relative z-10 container mx-auto px-8">
        <div className="max-w-5xl">
          <h1 className="text-architectural text-[hsl(120_11%_97%)] text-[3.5rem] md:text-[6rem] lg:text-[7.5rem] reveal">
            Considered software,
            <br />
            <span className="font-display-italic">crafted</span> for ambitious teams.
          </h1>

          <div className="mt-12 grid md:grid-cols-12 gap-8 reveal-delayed">
            <div className="md:col-span-1 hidden md:block">
              <span className="rule-gold mt-3" />
            </div>
            <p className="md:col-span-7 text-lg md:text-xl text-[hsl(120_11%_97%)]/80 font-light leading-relaxed max-w-2xl">
              Solis Institute of Technology &amp; Software is a disciplined practice
              of designers and engineers partnering with founders, institutions
              and established brands to build websites, web platforms and mobile
              apps with the rigour they deserve.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom rail */}
      <div className="absolute bottom-10 left-0 right-0 z-10">
        <div className="container mx-auto px-8 flex items-end justify-between text-[hsl(120_11%_97%)]/60 reveal-delayed">
          <div className="text-minimal">Scroll to explore</div>
          <div className="text-minimal hidden md:block">Selected Work · 2022 — 2025</div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
