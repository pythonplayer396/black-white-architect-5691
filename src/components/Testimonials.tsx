const testimonials = [
  {
    quote:
      "Solis didn't just ship a website — they translated our entire brand into software. The kind of partner you keep on speed dial.",
    name: "Elena Marchetti",
    role: "Co-founder",
    company: "Aperture Labs",
  },
  {
    quote:
      "Calm, disciplined, and genuinely thoughtful. Every meeting moved the work forward. Every release felt inevitable.",
    name: "Daniel Okafor",
    role: "Head of Product",
    company: "Northwind",
  },
  {
    quote:
      "We've worked with three agencies before Solis. None of them came close to this level of craft and ownership.",
    name: "Yuki Tanaka",
    role: "Director of Brand",
    company: "Helios",
  },
];

const Testimonials = () => {
  return (
    <section className="py-32 md:py-40 bg-background paper-texture">
      <div className="container mx-auto px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 text-foreground/70 mb-20">
            <span className="rule-gold" />
            <span className="text-minimal">In their words</span>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-border">
            {testimonials.map((t) => (
              <figure
                key={t.name}
                className="relative flex flex-col bg-background p-10 md:p-12 lg:p-14"
              >
                <span
                  aria-hidden
                  className="font-display-italic absolute top-6 left-8 md:top-8 md:left-10 text-[7rem] md:text-[8rem] leading-none text-foreground/10 select-none pointer-events-none"
                >
                  &ldquo;
                </span>

                <blockquote className="relative text-xl md:text-[1.375rem] font-light leading-[1.5] text-foreground tracking-[-0.005em] mt-8 md:mt-10">
                  {t.quote}
                </blockquote>

                <figcaption className="mt-10 pt-6 flex items-center gap-4">
                  <span className="rule-gold shrink-0" />
                  <div className="min-w-0">
                    <div className="text-architectural text-foreground text-sm tracking-wide">
                      {t.name}
                    </div>
                    <div className="text-minimal text-muted-foreground mt-1">
                      {t.role} &middot; {t.company}
                    </div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
