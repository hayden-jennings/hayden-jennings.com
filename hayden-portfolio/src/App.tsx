import React, { useState } from "react";

import { Mail, ArrowUpRight, House, Menu, X } from "lucide-react";

import { FaGithub, FaLinkedin } from "react-icons/fa";

const experiences = [
  {
    company: "AAA / ClubLabs",
    dates: "2024 — Present",
    role: "Software Engineer",
    summary:
      "Building high-availability AI and chatbot systems that support roadside assistance workflows, distributed cloud infrastructure, LLM-powered agents, and member-facing service experiences.",
  },
  {
    company: "The Pump App",
    dates: "2023 — Present",
    role: "Founder / Mobile Engineer",
    summary:
      "Designed, built, and launched a React Native fitness app focused on workout logging, progress tracking, analytics, and helping gym-goers stay consistent.",
  },
  {
    company: "Boston University",
    dates: "2019 — 2023",
    role: "Student-Athlete / Computer Science",
    summary:
      "Balanced software engineering coursework with Division 1 track and field, developing strong habits around discipline, performance, and technical problem solving.",
  },
];

const projects = [
  {
    name: "The Pump App",
    description:
      "A mobile fitness app for logging workouts, tracking progress, and visualizing training analytics.",
    stack: "React Native, TypeScript, Firebase, Expo",
  },
  {
    name: "AI Financial Assistant",
    description:
      "A personalized chatbot that answers questions about balances, spending, transactions, and abnormal purchases.",
    stack: "Python, FastAPI, LangGraph, PostgreSQL, Plaid, Telegram",
  },
  {
    name: "Truck Tracker",
    description:
      "A near real-time geospatial tracking experience for roadside service members waiting for assistance.",
    stack: "TypeScript, Google Maps APIs, AWS Lambda, Azure",
  },
  {
    name: "TOUR GRIP",
    description:
      "A portable golf glove drying device concept designed for airflow, retention, and on-course usability.",
    stack: "Product Design, CAD, Prototyping, DFM",
  },
];

const navItems = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function PortfolioLandingPage() {
  return (
    <main className="min-h-screen bg-[#080A0F] text-white selection:bg-white selection:text-black">
      <FloatingHeader />
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <Footer />
    </main>
  );
}

function FloatingHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="fixed left-1/2 top-5 z-50 -translate-x-1/2">
      <header className="rounded-full border border-white/10 bg-black/40 px-2 py-1 shadow-xl backdrop-blur-xl">
        <nav className="flex items-center gap-1">
          <a
            href="#top"
            onClick={() => setMenuOpen(false)}
            className="
              rounded-full
              px-3
              py-1.5
              text-white/65
              transition-all
              duration-300
              hover:bg-white/10
              hover:text-white
            "
          >
            <House className="h-4 w-4" />
          </a>

          {/* Desktop nav */}
          <div className="hidden items-center gap-1 sm:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="
                  rounded-full
                  px-4
                  py-1.5
                  text-[11px]
                  text-white/65
                  transition-all
                  duration-300
                  hover:bg-white/10
                  hover:text-white
                  uppercase
                  font-['JetBrains_Mono']
                "
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="
              rounded-full
              px-3
              py-1.5
              text-white/65
              transition-all
              duration-300
              hover:bg-white/10
              hover:text-white
              sm:hidden
            "
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </button>
        </nav>
      </header>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div
          className="
            absolute
            left-1/2
            top-14
            max-w-[calc(100vw-2rem)]
            -translate-x-1/2
            rounded-[28px]
            border
            border-white/10
            bg-[#171A20]/95
            p-8
            shadow-2xl
            backdrop-blur-xl
            sm:hidden
          "
        >
          <div className="flex flex-col gap-7">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="
                  text-xs
                  uppercase
                  tracking-[0.18em]
                  text-white/65
                  transition-all
                  duration-300
                  hover:text-white
                  hover:scale-[1.02]
                "
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function HeroSection() {
  return (
    <section
      id="top"
      className="flex min-h-screen items-center justify-start px-12 pt-24 sm:px-20"
    >
      <div className="max-w-2xl text-left">
        <p className="mb-5 text-sm font-medium uppercase tracking-[0.35em] text-white/50">
          Software Engineer / 2026
        </p>

        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
          I&apos;m Hayden
        </h1>

        <p className="mt-6 max-w-xl text-sm leading-8 text-white/65 text-[15px]">
          I love to code, be outside, and enjoy time with friends and family.
        </p>

      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="px-6 py-28">
      <div className="mx-auto max-w-3xl text-center">
        <SectionLabel>About</SectionLabel>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
          Engineer focused on useful systems and polished products.
        </h2>

        <div className="mx-auto mt-8 space-y-6 text-base leading-8 text-white/65 sm:text-lg">
          <p>
            I&apos;m a software engineer working on AI-powered chatbot systems,
            cloud infrastructure, and customer-facing product experiences. My
            work sits at the intersection of distributed systems, LLM
            applications, APIs, and frontend engineering.
          </p>
          <p>
            Outside of work, I&apos;m usually training, golfing, woodworking, or
            building side projects. I like projects that combine software,
            physical products, design, and performance.
          </p>
        </div>
      </div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section id="experience" className="px-6 py-28">
      <div className="mx-auto max-w-4xl text-center">
        <SectionLabel>Experience</SectionLabel>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
          Where I&apos;ve built, learned, and shipped.
        </h2>

        <div className="relative mx-auto mt-14 max-w-3xl text-left">
          <div className="absolute left-4 top-0 h-full w-px bg-white/15 sm:left-1/2 sm:-translate-x-1/2" />

          <div className="space-y-10">
            {experiences.map((experience, index) => (
              <TimelineItem
                key={experience.company}
                experience={experience}
                align={index % 2 === 0 ? "left" : "right"}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({
  experience,
  align,
}: {
  experience: (typeof experiences)[number];
  align: "left" | "right";
}) {
  const desktopAlign =
    align === "left" ? "sm:pr-10 sm:text-right" : "sm:ml-auto sm:pl-10";

  return (
    <div className="relative grid sm:grid-cols-2">
      <div
        className={`ml-12 rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-xl shadow-black/20 backdrop-blur transition hover:-translate-y-1 hover:bg-white/[0.06] sm:ml-0 ${
          align === "left" ? desktopAlign : "sm:col-start-2 " + desktopAlign
        }`}
      >
        <div className="flex flex-col gap-1 sm:block">
          <h3 className="text-lg font-semibold text-white">
            {experience.company}
          </h3>
          <p className="text-sm text-white/45">{experience.dates}</p>
        </div>
        <p className="mt-3 text-sm font-medium text-white/80">
          {experience.role}
        </p>
        <p className="mt-4 text-sm leading-7 text-white/60">
          {experience.summary}
        </p>
      </div>

      <div className="absolute left-4 top-6 h-3 w-3 -translate-x-1/2 rounded-full bg-white ring-8 ring-white/10 sm:left-1/2" />
    </div>
  );
}

function ProjectsSection() {
  return (
    <section id="projects" className="px-6 py-28">
      <div className="mx-auto max-w-5xl text-center">
        <SectionLabel>Projects</SectionLabel>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
          Selected projects and product work.
        </h2>

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.name}
              className="group rounded-3xl border border-white/10 bg-white/[0.04] p-7 text-left shadow-2xl shadow-black/20 backdrop-blur transition hover:-translate-y-1 hover:bg-white/[0.07]"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-xl font-semibold tracking-tight text-white">
                  {project.name}
                </h3>
                <ArrowUpRight className="h-5 w-5 text-white/35 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
              </div>

              <p className="mt-4 text-sm leading-7 text-white/60">
                {project.description}
              </p>

              <p className="mt-6 rounded-full border border-white/10 bg-black/20 px-4 py-2 text-xs leading-6 text-white/50">
                {project.stack}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contact" className="border-t border-white/10 px-6 py-12">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
        <div>
          <p className="text-lg font-medium text-white">
            Building useful software with care.
          </p>
          <p className="mt-2 text-sm text-white/45">Portfolio / 2026</p>
        </div>

        <div className="flex items-center gap-3">
          <FooterLink href="mailto:hayden@example.com" label="Email">
            <Mail className="h-4 w-4" />
          </FooterLink>
          <FooterLink href="https://github.com/yourusername" label="GitHub">
            <FaGithub className="h-4 w-4" />
          </FooterLink>
          <FooterLink
            href="https://linkedin.com/in/yourusername"
            label="LinkedIn"
          >
            <FaLinkedin className="h-4 w-4" />
          </FooterLink>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/60 transition hover:-translate-y-0.5 hover:bg-white/10 hover:text-white"
    >
      {children}
    </a>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm font-medium uppercase tracking-[0.3em] text-white/40">
      {children}
    </p>
  );
}
