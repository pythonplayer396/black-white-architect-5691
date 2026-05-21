import Navigation from "@/components/Navigation";

const Contact = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <section className="pt-32 pb-32 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-20">
              <div>
                <h1 className="text-minimal text-muted-foreground mb-4">START A PROJECT</h1>
                <h2 className="text-4xl md:text-6xl font-light text-architectural mb-12">
                  Got an idea?
                  <br />
                  Let's build it.
                </h2>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-minimal text-muted-foreground mb-2">EMAIL</h3>
                    <a href="mailto:hello@solis.studio" className="text-xl hover:text-muted-foreground transition-colors duration-300">
                      hello@solis.studio
                    </a>
                  </div>

                  <div>
                    <h3 className="text-minimal text-muted-foreground mb-2">RESPONSE TIME</h3>
                    <p className="text-xl">Within 24 hours</p>
                  </div>

                  <div>
                    <h3 className="text-minimal text-muted-foreground mb-2">BASED IN</h3>
                    <address className="text-xl not-italic">
                      Remote-first
                      <br />
                      Working worldwide
                    </address>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="text-minimal text-muted-foreground mb-6">ELSEWHERE</h3>
                  <div className="space-y-4">
                    <a href="#" className="block text-xl hover:text-muted-foreground transition-colors duration-300">
                      GitHub
                    </a>
                    <a href="#" className="block text-xl hover:text-muted-foreground transition-colors duration-300">
                      LinkedIn
                    </a>
                    <a href="#" className="block text-xl hover:text-muted-foreground transition-colors duration-300">
                      Dribbble
                    </a>
                  </div>
                </div>

                <div className="pt-12 border-t border-border">
                  <p className="text-muted-foreground">
                    Whether you have a fully scoped brief or just a rough idea
                    on a napkin, send it over. We'll come back with thoughts,
                    a realistic timeline, and an honest opinion on whether
                    we're the right team for it.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
