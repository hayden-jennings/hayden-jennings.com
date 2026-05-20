import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import Lenis from "lenis";

import { Mail, House, Menu, X } from "lucide-react";

import { FaGithub, FaLinkedin } from "react-icons/fa";

import "@fontsource/jost/300.css";
import "@fontsource/jost/400.css";
import "@fontsource/jost/500.css";
import "@fontsource/jost/600.css";

import "@fontsource/jetbrains-mono/300.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "@fontsource/jetbrains-mono/600.css";
import "@fontsource/jetbrains-mono/700.css";

const experiences = [
  {
    company: "AAA / ClubLabs",
    dates: "2024 — Present",
    role: "Software Engineer",
    summary:
      "I've spent over 2 years at AAA. During my time here, I designed and built high-availability AI and chatbot systems that support roadside assistance workflows, distributed cloud infrastructure, LLM-powered agents, and member-facing service experiences. I've gained vast experience working with AI technologies that impact millions of users, and have developed a strong passion for building software that solves real problems and makes people's lives easier.",
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
      "Balanced joint computer science and mathematics major with Division 1 track and field, developing strong habits around discipline, performance, and technical problem solving.",
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
    name: "Wallet Wiz",
    description:
      "I got tired of always calculated home much money I actually had and decided to have a machine do that for me. Introducing Wallet Wiz, a personalized chatbot that answers questions about balances, spending, transactions, and abnormal purchases.",
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

// Callback slot — called inside the Lenis rAF loop so the position read
// always happens AFTER Lenis has advanced the scroll for that frame.
let afterLenisCallback: (() => void) | null = null;

const navItems = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

function FishingLineFromRod() {
  const lineRef = useRef<HTMLDivElement>(null);
  const lureRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    afterLenisCallback = () => {
      const anchor = document.getElementById("rod-tip-anchor");
      const lineEl = lineRef.current;
      const lureEl = lureRef.current;
      if (!anchor || !lineEl || !lureEl) return;

      const rect = anchor.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top;
      const lureY = window.innerHeight * 0.54;
      const lineHeight = Math.max(lureY - y, 18);

      lineEl.style.left = `${x + 1}px`;
      lineEl.style.top = `${y}px`;
      lineEl.style.height = `${lineHeight}px`;

      lureEl.style.left = `${x + 2}px`;
      lureEl.style.top = `${y + lineHeight + 17}px`;
    };

    return () => {
      afterLenisCallback = null;
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[19]">
      <div ref={lineRef} className="absolute w-0.5 bg-[rgba(15,23,42,0.8)]" />
      <img
        ref={lureRef}
        src="/images/lure-with-worm.png"
        alt="lure"
        className="absolute -translate-x-1/2 -translate-y-1/2"
        style={{ width: 64, height: "auto" }}
      />
    </div>
  );
}

export default function PortfolioLandingPage() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      afterLenisCallback?.();
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#F8F4EC] text-[#0F172A] selection:bg-[#0F172A] selection:text-[#F8F4EC]">
      <FloatingHeader />
      <FishingLineFromRod />
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <div className="relative">
        <ProjectsSection />
        <Footer />
        <img
          src="/images/background-bottom.png"
          alt=""
          className="pointer-events-none absolute bottom-0 left-0 w-full object-cover object-bottom"
          style={{ zIndex: 1 }}
        />
      </div>
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
              hover:text-[#D5C292]
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
                  hover:text-[#D5C292]
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
              hover:text-[#D5C292]
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
                  hover:text-[#D5C292]
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
      className="relative flex min-h-screen items-center overflow-hidden px-12 pt-24 sm:px-20"
    >
      {/* Lake background */}
      <img
        src="/images/lake-hero5.png"
        alt=""
        className="
          absolute
          inset-0
          h-full
          w-full
          object-cover
          object-center
          image-render-pixel
        "
      />

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#080A0F]/65 via-[#080A0F]/30 to-[#080A0F]/5" />

      {/* Hero text */}
      <div className="relative z-20 max-w-2xl -translate-y-80 text-left sm:translate-y-18 sm:translate-x-20">
        <p className="mb-5 text-sm font-light uppercase tracking-[0.15em] text-[#F7EDE4]/70 font-['JetBrains_Mono']">
          Software Engineer / 2026
        </p>

        <div className="flex items-center gap-4 mt-0">
          <h1 className="text-3xl tracking-tight font-normal sm:text-4xl md:text-5xl text-[#F7EDE4] font-['Jost']">
            I&apos;m Hayden
          </h1>
          <MagneticEffect strength={0.5}>
            <div className="relative h-16 w-16 shrink-0">
              {/* Background circle sized inward to match just the circular part of the image */}
              <div
                className="absolute inset-[8%] rounded-full"
                style={{ backgroundColor: "#F7EDE4" }}
              />
              <img
                src="/images/Headshot8bitProfile.png"
                alt="Hayden profile"
                className="relative h-full w-full object-contain image-render-pixel"
              />
            </div>
          </MagneticEffect>
        </div>

        <p className="mt-6 max-w-2xl text-[15px] font-light leading-8 tracking-tight text-[#F7EDE4]/70 font-['JetBrains_Mono']">
          I love to code, be outside, and enjoy time with friends and family.
        </p>
      </div>

      {/* Boat + fishing line scene */}
      <div
        className="
          pointer-events-none
          absolute
          bottom-[24%]
          right-[12%]
          z-20
          hidden
          h-[260px]
          w-[460px]
          md:block
        "
      >
        <img
          src="/images/boat-avatar4.png"
          alt="Pixel art Hayden fishing in a boat"
          className="
            absolute
            bottom-0
            right-0
            w-[360px]
            image-render-pixel
            animate-[boatFloat_7s_ease-in-out_infinite]
            z-[20]
          "
        />

        <div
          id="rod-tip-anchor"
          className="
            absolute
            right-[275px]
            top-[130px]
            h-1
            w-1
            animate-[boatFloat_7s_ease-in-out_infinite]
          "
        />
      </div>

      {/* Foreground bushes — sits above rod line (z-[19]) */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[16%] z-[20]">
        <img
          src="/images/lake-hero-bushes.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-bottom image-render-pixel"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080A0F]/65 via-[#080A0F]/30 to-[#080A0F]/5" />
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section
      id="about"
      className="relative overflow-hidden px-6 py-28"
      style={{
        backgroundImage: "url(/images/background-bubbles.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="relative z-10 mx-auto max-w-2xl text-left">
        <SectionLabel>About</SectionLabel>
        <h2 className="mt-4 text-sm tracking-tight sm:text-2xl font-['Jost']">
          I'm Hayden
        </h2>

        <div className="mt-8 max-w-2xl space-y-6 text-base leading-8 text-[#334155] sm:text-md">
          <p>
            I&apos;m a software engineer based out of Los Angeles. I have
            experience working on AI-powered chatbot systems, cloud
            infrastructure, and customer-facing product experiences. I enjoy
            building software that solves real problems and makes people&apos;s
            lives easier.
          </p>
          <p>
            Outside of the office, you can usually find me outdoors, in the gym,
            or building fun projects in either in the digital (code) or physical
            (woodworking) realms.
          </p>
        </div>
      </div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section
      id="experience"
      className="relative overflow-hidden px-6 py-28"
      style={{
        backgroundImage: "url(/images/background-bubbles2.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="relative z-10 mx-auto max-w-2xl text-left">
        <SectionLabel>Experience</SectionLabel>
        <h2 className="mt-4 text-sm tracking-tight sm:text-2xl font-['Jost']">
          Where I&apos;ve worked and what I&apos;ve built.
        </h2>

        <div className="mt-8 max-w-2xl space-y-6 text-base leading-8 text-[#334155] sm:text-md">
          {experiences.map((experience) => (
            <div key={experience.company}>
              <p className="font-semibold text-[#0F172A] flex items-baseline gap-3">
                {experience.company}
                <span className="text-xs font-normal text-[#0F172A]/40 font-['JetBrains_Mono']">
                  {experience.dates}
                </span>
              </p>
              <p className="text-sm text-[#2E749E]">{experience.role}</p>
              <p className="mt-2">{experience.summary}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MagneticEffect({
  children,
  strength = 0.4,
}: {
  children: React.ReactNode;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x: xSpring, y: ySpring }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}

function TiltEffect({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 30, stiffness: 400, mass: 0.5 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const rotateX = useTransform(
    ySpring,
    [-size.height / 2, size.height / 2],
    [10, -10],
  );
  const rotateY = useTransform(
    xSpring,
    [-size.width / 2, size.width / 2],
    [-10, 10],
  );

  useEffect(() => {
    const update = () => {
      if (ref.current)
        setSize({
          width: ref.current.offsetWidth,
          height: ref.current.offsetHeight,
        });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <motion.div
      ref={ref}
      className="h-full"
      style={{ perspective: 1000, transformStyle: "preserve-3d" }}
      onMouseMove={(e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        x.set(e.clientX - rect.left - size.width / 2);
        y.set(e.clientY - rect.top - size.height / 2);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      <motion.div className="h-full" style={{ rotateX, rotateY }}>
        {children}
      </motion.div>
    </motion.div>
  );
}

function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative overflow-hidden px-6 py-28"
      style={{
        backgroundImage: "url(/images/background-bubbles.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="relative z-10 mx-auto max-w-2xl text-left">
        <SectionLabel>Projects</SectionLabel>
        <h2 className="mt-4 text-sm tracking-tight sm:text-2xl font-['Jost']">
          Selected projects and product work.
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 auto-rows-[1fr]">
          {projects.map((project) => (
            <TiltEffect key={project.name}>
              <div className="flex h-full flex-col gap-5 rounded-2xl border border-[#E2D8C8] bg-[#FBF8F2]/80 p-6 backdrop-blur-sm">
                <p className="font-semibold text-[#0F172A] font-['Jost']">
                  {project.name}
                </p>
                <p className="flex-1 text-15 leading-6 font-['Jost'] text-[#334155]">
                  {project.description}
                </p>
                <p className="text-xs text-[#2E749E] font-['JetBrains_Mono']">
                  {project.stack}
                </p>
              </div>
            </TiltEffect>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer
      id="contact"
      className="relative overflow-visible border-t border-[#E2D8C8] px-6 py-12"
    >
      <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
        <div>
          <p className="text-lg font-medium text-[#0F172A]">
            Building useful software with care.
          </p>
          <p className="mt-2 text-sm text-[#64748B]">Portfolio / 2026</p>
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
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#E2D8C8] bg-[#FBF8F2] text-[#64748B] transition hover:-translate-y-0.5 hover:bg-[#F2EADC] hover:text-[#0F172A]"
    >
      {children}
    </a>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm font-light uppercase font-['JetBrains_Mono'] tracking-[0.10em] text-[#2E749E]">
      {children}
    </p>
  );
}
