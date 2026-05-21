import Navigation from "@/components/Navigation";

const Services = () => {
  const services = [
    {
      number: "01",
      title: "WEBSITES",
      description: "Marketing sites, landing pages and portfolios — fast, responsive and built to convert. From a one-page launch site to a full multi-page brand presence.",
    },
    {
      number: "02",
      title: "WEB APPS",
      description: "Custom dashboards, SaaS platforms and internal tools. Real backends, authentication, payments, and the infrastructure to scale them.",
    },
    {
      number: "03",
      title: "MOBILE APPS",
      description: "iOS and Android apps built with React Native or native — from first sketch through App Store and Play Store release, plus updates.",
    },
    {
      number: "04",
      title: "DESIGN & BRANDING",
      description: "UI/UX design, design systems, brand identity and visual direction that make your product feel unmistakably yours.",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      <section className="pt-32 pb-32 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-20">
              <h1 className="text-minimal text-muted-foreground mb-4">SERVICES</h1>
              <h2 className="text-4xl md:text-6xl font-light text-architectural">
                What we do
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-x-20 gap-y-16">
              {services.map((service, index) => (
                <div key={index} className="group">
                  <div className="flex items-start space-x-6">
                    <span className="text-minimal text-muted-foreground font-medium">
                      {service.number}
                    </span>
                    <div>
                      <h3 className="text-2xl font-light mb-4 text-architectural group-hover:text-muted-foreground transition-colors duration-500">
                        {service.title}
                      </h3>
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
    </div>
  );
};

export default Services;
