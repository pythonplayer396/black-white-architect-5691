const About = () => {
  return (
    <section id="about" className="py-32 bg-muted/20">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-minimal text-muted-foreground mb-4">ABOUT</h2>
              <h3 className="text-4xl md:text-6xl font-light text-architectural mb-12">
                A studio, not an agency
              </h3>

              <div className="space-y-8">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We're a tight-knit team of designers and engineers who care
                  about craft. No account managers, no endless decks — just the
                  people building your product, talking to you directly.
                </p>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  From early-stage startups to established brands, we partner
                  with teams that want their software to feel as good as it
                  works.
                </p>
              </div>
            </div>

            <div className="space-y-12">
              <div>
                <h4 className="text-minimal text-muted-foreground mb-6">HOW WE WORK</h4>
                <div className="space-y-6">
                  <div className="border-l-2 border-architectural pl-6">
                    <h5 className="text-lg font-medium mb-2">Discover</h5>
                    <p className="text-muted-foreground">Understand the problem, the users, and the business behind it</p>
                  </div>
                  <div className="border-l-2 border-architectural pl-6">
                    <h5 className="text-lg font-medium mb-2">Design</h5>
                    <p className="text-muted-foreground">Prototype fast, iterate with you, validate before we build</p>
                  </div>
                  <div className="border-l-2 border-architectural pl-6">
                    <h5 className="text-lg font-medium mb-2">Ship</h5>
                    <p className="text-muted-foreground">Production-ready code, deployed, monitored, and handed off cleanly</p>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-border">
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-minimal text-muted-foreground mb-2">FOUNDED</h4>
                    <p className="text-xl">2025</p>
                  </div>
                  <div>
                    <h4 className="text-minimal text-muted-foreground mb-2">PROJECTS SHIPPED</h4>
                    <p className="text-xl">..</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
