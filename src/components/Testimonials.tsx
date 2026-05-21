const testimonials = [
  {
    quote:
      "Solis didn't just ship a website — they translated our entire brand into software. The kind of partner you keep on speed dial.",
    name: "Elena Marchetti",
    role: "Co-founder, Aperture Labs",
  },
  {
    quote:
      "Calm, disciplined, and genuinely thoughtful. Every meeting moved the work forward. Every release felt inevitable.",
    name: "Daniel Okafor",
    role: "Head of Product, Northwind",
  },
  {
    quote:
      "We've worked with three agencies before Solis. None of them came close to this level of craft and ownership.",
    name: "Yuki Tanaka",
    role: "Director of Brand, Helios",
  },
];

const Testimonials = () => {
  return (
    <section className="py-32 bg-background paper-texture">
      <div className="container mx-auto px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 text-foreground/70 mb-16">
            <span className="rule-gold" />
            <span className="text-minimal">In their words</span>
          </div>

          <div className="grid md:grid-cols-3 gap-12 md:gap-16">
            {testimonials.map((t) => (
              <figure key={t.name} className="flex flex-col">
                <span
                  aria-hidden
                  className="font-display-italic text-6xl leading-none text-foreground/30 mb-6"
                >
                  &ldquo;
                </span>
                <blockquote className="text-xl md:text-2xl font-light leading-snug text-foreground text-architectural">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-8 pt-6 border-t border-border">
                  <div className="text-architectural text-foreground">{t.name}</div>
                  <div className="text-minimal text-muted-foreground mt-1">{t.role}</div>
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
