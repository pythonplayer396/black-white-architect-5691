import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";

const Portfolio = () => {
  const projects = [
    {
      image: project1,
      title: "NORTHWIND SAAS",
      meta: "WEB APP · 2024",
      description: "Analytics dashboard for a B2B logistics startup — Next.js, custom design system, real-time data",
    },
    {
      image: project2,
      title: "AURORA COMMERCE",
      meta: "WEBSITE · 2024",
      description: "Headless e-commerce site for a fashion brand — sub-second loads, custom CMS, +38% conversion",
    },
    {
      image: project3,
      title: "FIELDKIT MOBILE",
      meta: "iOS & ANDROID · 2023",
      description: "\u200BOffline-first field service app \u2014 React Native, sync engine, used by 2,000+ technicians daily",
    },
  ];

  return (
    <section id="work" className="py-32 bg-muted">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 className="text-minimal text-muted-foreground mb-4">SELECTED WORK</h2>
            <h3 className="text-4xl md:text-6xl font-light text-architectural">
              Recent projects
            </h3>
          </div>

          <div className="space-y-32">
            {projects.map((project, index) => (
              <div key={index} className="group">
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-[70vh] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                <div className="mt-8 grid md:grid-cols-3 gap-8">
                  <div>
                    <h4 className="text-2xl font-light text-architectural mb-2">
                      {project.title}
                    </h4>
                    <p className="text-minimal text-muted-foreground">
                      {project.meta}
                    </p>
                  </div>

                  <div className="md:col-span-2">
                    <p className="text-muted-foreground leading-relaxed">
                      {project.description}
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

export default Portfolio;
