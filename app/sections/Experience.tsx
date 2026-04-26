"use client";

import Link from "next/link";
import ScrollReveal from "../components/ScrollReveal";

const experiences = [
  {
    company: "MantaRay",
    role: "Development Lead",
    period: "2024-Now",
    description:
      "A robotics-driven team focused on marine life solutions. Worked on multiple projects including autonomous surface drones and underwater ROV systems.",
    link: { label: "Contribute", href: "#" },
  },
  {
    company: "Vetra Robotics",
    role: "Autonomous Engineer",
    period: "2025-Now",
    description:
      "Autonomous delivery systems startup using drones and mobile robots.",
    link: { label: "View more (vtrx.dev)", href: "#" },
  },
];

export default function Experience() {
  return (
    <section className="px-4 sm:px-8 md:px-16 lg:px-24 py-12 sm:py-16">
      <ScrollReveal direction="up">
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-normal text-white tracking-tight mb-6 sm:mb-10"
          style={{ fontFamily: "var(--font-domaine-condensed)" }}
        >
          Experience
        </h2>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {experiences.map((exp, index) => (
          <ScrollReveal key={exp.company} direction="up" delay={0.1 * (index + 1)} className="h-full">
            <div
              className="border border-neutral-800 bg-neutral-900/30 backdrop-blur-sm p-6 hover:border-neutral-700 transition-colors flex flex-col h-full"
              style={{ borderRadius: "15px" }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-white text-lg font-semibold">
                    {exp.company}
                  </h3>
                  <p className="text-neutral-400 text-sm mt-1">{exp.role}</p>
                </div>
                <span className="text-neutral-500 text-sm">{exp.period}</span>
              </div>

              <p className="text-neutral-400 text-sm leading-relaxed mb-6 flex-1">
                {exp.description}
              </p>

              <Link
                href={exp.link.href}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 border border-neutral-700 text-neutral-400 text-sm hover:text-white hover:border-neutral-600 transition-colors self-start"
                style={{ borderRadius: "15px" }}
              >
                {exp.link.label}
              </Link>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
