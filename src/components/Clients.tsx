const clients = [
  "Aperture Labs",
  "Northwind",
  "Helios",
  "Meridian",
  "Atlas & Co.",
  "Vantage",
  "Lumen",
  "Kestrel",
];

const Clients = () => {
  return (
    <section className="border-y border-border/60 bg-background py-16 md:py-20">
      <div className="container mx-auto px-8">
        <div className="flex items-center gap-4 text-foreground/70 mb-10">
          <span className="rule-gold" />
          <span className="text-minimal">Trusted by founders, institutions &amp; established brands</span>
        </div>

        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-x-8 gap-y-6 items-center">
          {clients.map((name) => (
            <li
              key={name}
              className="font-display text-xl md:text-2xl tracking-tight text-foreground/50 hover:text-foreground transition-colors duration-300 text-center md:text-left"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Clients;
