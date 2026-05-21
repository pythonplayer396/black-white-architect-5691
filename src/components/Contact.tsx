const Contact = () => {
  return (
    <section id="contact" className="py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-20">
            <div>
              <h2 className="text-minimal text-muted-foreground mb-4">START A PROJECT</h2>
              <h3 className="text-4xl md:text-6xl font-light text-architectural mb-12">
                Got an idea?
                <br />
                Let's build it.
              </h3>

              <div className="space-y-8">
                <div>
                  <h4 className="text-minimal text-muted-foreground mb-2">EMAIL</h4>
                  <a href="mailto:roshw0023@gmail.com" className="text-xl hover:text-muted-foreground transition-colors duration-300">
                    roshw0023@gmail.com
                  </a>
                </div>

                <div>
                  <h4 className="text-minimal text-muted-foreground mb-2">RESPONSE TIME</h4>
                  <p className="text-xl">Within 24 hours</p>
                </div>

                <div>
                  <h4 className="text-minimal text-muted-foreground mb-2">BASED IN</h4>
                  <p className="text-xl not-italic">
                    Remote-first
                    <br />
                    Working from Bangladesh
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h4 className="text-minimal text-muted-foreground mb-6">ELSEWHERE</h4>
                <div className="space-y-4">
                  <a href="https://github.com/pythonplayer396" target="_blank" rel="noreferrer" className="block text-xl hover:text-muted-foreground transition-colors duration-300">
                    GitHub
                  </a>
                </div>
              </div>

              <div className="pt-12 border-t border-border">
                <p className="text-muted-foreground">
                  Whether you have a fully scoped brief or just a rough idea on
                  a napkin, send it over. We'll come back with thoughts, a
                  realistic timeline, and an honest opinion on whether we're
                  the right team for it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
