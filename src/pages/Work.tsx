import { useState } from "react";
import Navigation from "@/components/Navigation";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";

const Work = () => {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const projects = [
    {
      image: project1,
      title: "NORTHWIND SAAS",
      client: "NORTHWIND, 2024",
      category: "WEB APP",
      description: "Analytics dashboard for a B2B logistics startup. Real-time data, custom design system, role-based access.",
      stack: "Next.js · Postgres",
      year: "2024",
    },
    {
      image: project2,
      title: "AURORA COMMERCE",
      client: "AURORA, 2024",
      category: "WEBSITE",
      description: "Headless e-commerce site for a fashion brand. Sub-second loads, custom CMS, +38% conversion vs the old store.",
      stack: "Next.js · Shopify",
      year: "2024",
    },
    {
      image: project3,
      title: "FIELDKIT MOBILE",
      client: "FIELDKIT, 2023",
      category: "MOBILE APP",
      description: "\u200BOffline-first field service app used by 2,000+ technicians daily. Sync engine, photo uploads, push notifications.",
      stack: "React Native",
      year: "2023",
    },
    {
      image: project1,
      title: "LEDGER DASHBOARD",
      client: "LEDGER, 2024",
      category: "WEB APP",
      description: "Finance dashboard with multi-account aggregation, charting and CSV exports for a fintech client.",
      stack: "React · Supabase",
      year: "2024",
    },
    {
      image: project2,
      title: "STUDIO MOSS",
      client: "MOSS, 2023",
      category: "WEBSITE",
      description: "Portfolio site for an interior design studio. Editorial layout, custom CMS, image-first storytelling.",
      stack: "Astro · Sanity",
      year: "2023",
    },
    {
      image: project3,
      title: "PULSE FITNESS",
      client: "PULSE, 2023",
      category: "MOBILE APP",
      description: "Workout tracking app with social feeds and live class streaming. Launched on iOS and Android.",
      stack: "React Native",
      year: "2023",
    },
  ];

  const categories = ["ALL", "WEBSITE", "WEB APP", "MOBILE APP"];

  const filteredProjects = activeCategory === "ALL"
    ? projects
    : projects.filter((project) => project.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <h1 className="text-6xl md:text-8xl font-light text-architectural mb-8">
                OUR WORK
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl">
                A selection of websites, web apps and mobile apps we've shipped
                with teams we care about.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap gap-8 justify-center md:justify-start">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`text-minimal transition-colors duration-300 relative group ${
                    activeCategory === category
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {category}
                  <span
                    className={`absolute bottom-0 left-0 w-full h-px bg-foreground transition-transform duration-300 origin-left ${
                      activeCategory === category
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  ></span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-32">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 lg:gap-20">
              {filteredProjects.map((project, index) => (
                <div key={index} className="group cursor-pointer">
                  <div className="relative overflow-hidden mb-8">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-[60vh] object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="absolute top-6 left-6 bg-background/90 backdrop-blur-sm px-4 py-2">
                      <span className="text-minimal text-foreground">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl lg:text-3xl font-light text-architectural mb-2 group-hover:text-muted-foreground transition-colors duration-500">
                        {project.title}
                      </h3>
                      <p className="text-minimal text-muted-foreground">
                        {project.client}
                      </p>
                    </div>

                    <p className="text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex gap-8 pt-4 border-t border-border">
                      <div>
                        <p className="text-minimal text-muted-foreground mb-1">STACK</p>
                        <p className="text-foreground">{project.stack}</p>
                      </div>
                      <div>
                        <p className="text-minimal text-muted-foreground mb-1">YEAR</p>
                        <p className="text-foreground">{project.year}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-muted">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-light text-architectural mb-8">
              Got something
              <br />
              you want built?
            </h2>
            <p className="text-xl text-muted-foreground mb-12">
              Tell us about your project — we'll come back within 24 hours.
            </p>
            <a
              href="/contact"
              className="inline-block text-minimal text-foreground hover:text-muted-foreground transition-colors duration-300 relative group"
            >
              START A PROJECT
              <span className="absolute bottom-0 left-0 w-full h-px bg-foreground group-hover:bg-muted-foreground transition-colors duration-300"></span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Work;
