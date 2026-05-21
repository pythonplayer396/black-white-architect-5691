const Services = () => {
  const services = [
    {
      number: "01",
      title: "WEBSITES",
      description: "Marketing sites, landing pages and portfolios — fast, responsive and built to convert",
    },
    {
      number: "02",
      title: "WEB APPS",
      description: "Custom dashboards, SaaS platforms and internal tools with real backends and auth",
    },
    {
      number: "03",
      title: "MOBILE APPS",
      description: "iOS and Android apps crafted with care, from first sketch to App Store release",
    },
    {
      number: "04",
      title: "DESIGN & BRANDING",
      description: "UI/UX, design systems and brand identity that make your product unmistakable",
    },
  ];

  return (
    <section id="services" className="py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 className="text-minimal text-muted-foreground mb-4">SERVICES</h2>
            <h3 className="text-4xl md:text-6xl font-light text-architectural">
              What we do
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-x-20 gap-y-16">
            {services.map((service, index) => (
              <div key={index} className="group">
                <div className="flex items-start space-x-6">
                  <span className="text-minimal text-muted-foreground font-medium">
                    {service.number}
                  </span>
                  <div>
                    <h4 className="text-2xl font-light mb-4 text-architectural group-hover:text-muted-foreground transition-colors duration-500">
                      {service.title}
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
