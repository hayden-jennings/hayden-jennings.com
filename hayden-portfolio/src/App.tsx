import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { logEvent } from "firebase/analytics";
import { analytics } from "./firebase";
import Lenis from "lenis";

import { Mail, House, Menu, X, ExternalLink } from "lucide-react";

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
    company: "AAA",
    dates: "2024 — Present",
    role: "Software Engineer",
    summary:
      "I've been at AAA for over 2 years working on the AI systems that handle roadside assistance for millions of calls a year. Day to day, that's involved building and fine-tuning conversational AI that handles real service calls end-to-end, architecting multi-region infrastructure built for high availability, and more recently developing multi-agent workflows on Amazon Bedrock with Strands to reduce latency and improve response quality. I also won the AAA Futures Hackathon in 2025 for a prototype that improved how members and travel agents get things done.",
  },
  {
    company: "Freelance Software Engineer",
    dates: "2023 — 2024",
    role: "Software Engineer",
    summary:
      "I worked independently with small businesses and founders to build web apps and AI-powered chatbots from the ground up. Leading every phase myself, from scoping and design through development, deployment, and iteration based on real feedback, taught me a lot about what it takes to own something completely.",
  },
  {
    company: "Shape Lab",
    dates: "2022",
    role: "Research Intern",
    summary:
      "I spent a summer at Boston University's Shape Lab working on human motion research. I ran motion capture sessions, cleaned and processed movement data in Python, and helped turn raw recordings into usable datasets for studies across athletics, yoga, and dance. This was my first real taste of turning messy real-world data into something useful.",
  },
];

const projects = [
  {
    name: "The Pump App",
    description:
      "A fitness app I built from 0 → 1 taking it from idea to App Store. It helps users track workouts, log progress, build routines, and stay consistent with their fitness goals. I handled the full product journey end-to-end, from idea and design through development, launch, and deployment.",
    stack: "React Native, TypeScript, Python, AWS",
    url: "https://apps.apple.com/us/app/the-pump-app/id6738340767",
  },
  {
    name: "Truck Tracker",
    description:
      "One of the pain points in the AAA roadside experience was simple: members didn't know where their truck was or when it would arrive. I built a near real-time geospatial tracking feature inside the AAA chatbot that shows live truck locations, ETA updates, and reroutes as they happen. Owned it end-to-end, integrated Google Maps APIs, and it became one of the team's biggest wins for member satisfaction.",
    stack: "TypeScript, C#, Google Maps APIs, AWS, Azure",
    url: "https://chat.ace.aaa.com/",
  },
  {
    name: "Wallet Wiz",
    description:
      "I got tired of mentally tracking where my money was going, so I built something to do it for me. Wallet Wiz is a Telegram chatbot that connects to your bank via Plaid and answers real questions about balances, spending patterns, transactions, anything unusual. Local-first, multi-agent architecture, running 24/7.",
    stack: "Python, FastAPI, LangGraph, PostgreSQL, Plaid, Telegram",
    url: "https://github.com/hayden-jennings/wallet-wiz",
  },
];

// Callback slot — called inside the Lenis rAF loop so the position read
// always happens AFTER Lenis has advanced the scroll for that frame.
let afterLenisCallback: (() => void) | null = null;
let lenisInstance: Lenis | null = null;

const navItems = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function PortfolioLandingPage() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisInstance = lenis;

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
      lenisInstance = null;
    };
  }, []);

  return (
    <main className="min-h-screen text-[#0F172A] selection:bg-[#0F172A] selection:text-[#F8F4EC] bg-[url('/images/background-bubbles3.webp')] lg:bg-none bg-repeat-y [background-size:100%_auto]">
      <FloatingHeader />
      <FishingLineFromRod />
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <div className="relative overflow-hidden">
        <ProjectsSection />
        <Footer />
        <img
          src="/images/background-bottom1.webp"
          alt=""
          loading="lazy"
          className="pointer-events-none absolute bottom-0 left-0 w-full object-cover object-bottom"
          style={{ zIndex: 1 }}
        />
      </div>
    </main>
  );
}

function FloatingHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  function handleNavClick(
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) {
    e.preventDefault();
    setMenuOpen(false);
    const target =
      href === "#top" ? document.body : document.querySelector(href);
    if (target) lenisInstance?.scrollTo(target as HTMLElement, { offset: 0 });
  }

  return (
    <div
      className="fixed left-1/2 z-50 -translate-x-1/2"
      style={{ top: "calc(env(safe-area-inset-top, 0px) + 20px)" }}
    >
      <header className="rounded-full border border-white/10 bg-black/40 px-2 py-1 shadow-xl backdrop-blur-xl">
        <nav className="flex items-center gap-1">
          <a
            href="#top"
            aria-label="Back to top"
            onClick={(e) => handleNavClick(e, "#top")}
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
                onClick={(e) => handleNavClick(e, item.href)}
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
            bg-black/40
            p-8
            shadow-xl
            backdrop-blur-xl
            sm:hidden
          "
        >
          <div className="flex flex-col gap-7">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
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

function FishingLineFromRod() {
  const lineRef = useRef<HTMLDivElement>(null);
  const lineConnectorRef = useRef<HTMLDivElement>(null);
  const lureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    afterLenisCallback = () => {
      const anchor = document.getElementById("rod-tip-anchor");
      const lineEl = lineRef.current;
      const lineConnectorEl = lineConnectorRef.current;
      const lureEl = lureRef.current;
      if (!anchor || !lineEl || !lineConnectorEl || !lureEl) return;

      const rect = anchor.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top;

      const scrollTop = document.documentElement.scrollTop;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight || 1;

      // Responsive sizing keyed off Tailwind's lg/xl/2xl breakpoints (same
      // ones the boat scene uses). Tune each row to taste per breakpoint.
      const vw = window.innerWidth;
      const lureRestPct =
        vw >= 1536 ? 0.25 : vw >= 1280 ? 0.25 : vw >= 1024 ? 0.27 : 0.25;
      const lureFinalPct =
        vw >= 1536 ? 0.6 : vw >= 1280 ? 0.6 : vw >= 1024 ? 0.62 : 0.6;
      const minStub = vw >= 1280 ? 50 : vw >= 1024 ? 45 : 35;
      const lineLureGap = vw >= 1280 ? 18 : vw >= 1024 ? 16 : 12;

      // The lure's resting viewport Y (where it sits before scroll activates it)
      const lureRestY = window.innerHeight * lureRestPct;
      // The lure's final viewport Y at the very bottom of the page
      const lureFinalY = window.innerHeight * lureFinalPct;

      // Activate once the scroll has traveled far enough that the lure's
      // document-space position has entered the viewport's lower half.
      // We treat the activation threshold as the scroll amount that would
      // move a document element from lureRestY to the top — i.e. the lure
      // "rides along" once scroll reaches its initial document offset.
      const activationScroll = lureRestY; // px of scroll before lure starts moving
      const activeRange = maxScroll - activationScroll;
      const activeProgress = Math.max(
        0,
        Math.min(1, (scrollTop - activationScroll) / (activeRange || 1)),
      );

      const lureY = lureRestY + activeProgress * (lureFinalY - lureRestY);
      const lineHeight = Math.max(lureY - y, minStub);

      // The line splits into two roles that hand off at the viewport top
      // (y = 0). On iOS Safari, native scrolling runs on the compositor
      // thread and can advance multiple times per JS RAF tick, so any
      // JS-driven size update lags the native scroll — that's what made the
      // line bottom detach from the lure during fast scrolling.
      //
      // Element A (absolute in body): cemented to the rod via document-coord
      // positioning. The browser scrolls it natively, so its top never lags
      // — it stays glued to the rod tip. When the rod is in view (hero), this
      // element IS the entire line. When the rod is above viewport, it only
      // covers the safe-area extension above viewport y = 0; iOS Safari
      // clips fixed elements at the safe area but renders absolute-in-body
      // through it, which is why this MUST be absolute, not fixed.
      //
      // Element B (fixed, top at 0): only shown once the rod is above
      // viewport. Its top is the constant viewport y = 0 (no scroll lag),
      // and its bottom is the lure (also fixed) — so the line bottom and
      // lure stay glued together regardless of JS timing.
      //
      // Hiding Element B in hero avoids two issues: a JS-tracked top
      // jittering against the rod, and double-rendering the line at ~96%
      // opacity instead of the intended 80%.
      const docX = x + window.scrollX;
      const docY = y + window.scrollY;

      // When the rod is off-screen, extend Element A 200px past viewport top
      // so it overlaps deep into Element B's territory. Even if Element A's
      // height update lags native scroll by tens of pixels, its bottom stays
      // well inside the overlap zone — never short enough to expose a gap.
      // Both elements are opaque and the same color, so overlap is invisible.
      const elementAHeight = y > 0 ? lineHeight : -y + 150;
      lineEl.style.transform = `translate3d(${docX + 1}px, ${docY}px, 0)`;
      lineEl.style.height = `${elementAHeight}px`;

      const elementBHeight = y > 0 ? 0 : lureY;
      lineConnectorEl.style.transform = `translate3d(${x + 1}px, 0, 0)`;
      lineConnectorEl.style.height = `${elementBHeight}px`;

      const lureTopViewportY = y + lineHeight + lineLureGap;
      lureEl.style.transform = `translate3d(${x + 2}px, ${lureTopViewportY}px, 0)`;
    };

    return () => {
      afterLenisCallback = null;
    };
  }, []);

  return createPortal(
    <>
      <div
        ref={lineRef}
        className="pointer-events-none absolute left-0 top-0 w-0.5 bg-[#292929] z-[19] will-change-transform"
      />
      <div
        ref={lineConnectorRef}
        className="pointer-events-none fixed left-0 top-0 w-0.5 bg-[#292929] z-[19] will-change-transform"
      />
      <div
        ref={lureRef}
        className="pointer-events-none fixed left-0 top-0 z-[19] will-change-transform"
      >
        <img
          src="/images/lure-with-worm.webp"
          alt="lure"
          className="w-[16px] lg:w-[17px] xl:w-[18px] 2xl:w-[20px] -translate-x-1/2 -translate-y-1/2 2xl:scale-x-[-1]"
          style={{ height: "auto" }}
        />
      </div>
    </>,
    document.body,
  );
}

function HeroSection() {
  return (
    <section
      id="top"
      className="relative flex items-start xl:items-center overflow-hidden px-12 pt-24 sm:px-20 [min-height:calc(100lvh+60px)] xl:[min-height:100lvh]"
    >
      {/* Lake background */}
      <img
        src="/images/lake-hero5.webp"
        alt=""
        fetchPriority="high"
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
      <div className="relative z-20 max-w-2xl text-left pt-22 xl:pb-30 2xl:pb-0 xl:pt-0 lg:translate-y-18 lg:translate-x-20">
        <p className="mb-5 text-sm font-light uppercase tracking-[0.15em] text-[#F7EDE4]/70 font-['JetBrains_Mono']">
          Software Engineer / 2026
        </p>

        <div className="flex items-center gap-4 mt-0">
          <h1 className="text-3xl tracking-tight font-normal sm:text-4xl xl:text-5xl text-[#F7EDE4] font-['Jost']">
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
                src="/images/Headshot8bitProfile1.webp"
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
          right-[7%]
          z-20
          h-[200px]
          w-[130px]
          lg:h-[230px]
          lg:w-[220px]
          xl:right-[10%]
          xl:h-[260px]
          xl:w-[300px]
          2xl:left-auto
          2xl:right-[13%]
          2xl:h-[260px]
          2xl:w-[460px]
          scale-x-[-1]
          2xl:scale-x-[1]
        "
      >
        <img
          src="/images/boat-avatar6.webp"
          alt="Pixel art Hayden fishing in a boat"
          className="
            absolute
            bottom-0
            right-0
            w-[130px]
            image-render-pixel
            animate-[boatFloat_7s_ease-in-out_infinite]
            z-[20]
            lg:w-[165px]
            xl:w-[200px]
          "
        />

        <div
          id="rod-tip-anchor"
          className="
            absolute
            right-[123px]
            top-[128px]
            h-1
            w-1
            animate-[boatFloat_7s_ease-in-out_infinite]
            lg:right-[157px]
            lg:top-[140px]
            xl:right-[191px]
            xl:top-[150px]
            2xl:right-[194px]
            2xl:top-[151px]
          "
        />
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section
      id="about"
      className="relative overflow-hidden px-6 pr-[15%] lg:pr-[0%] pt-42 pb-28"
    >
      <div
        className="pointer-events-none absolute inset-0 hidden lg:block"
        style={{
          backgroundImage: "url('/images/background-bubbles4.webp')",
          backgroundRepeat: "repeat-y",
          backgroundSize: "100% auto",
        }}
      />
      {/* Dark fade from hero — prevents jarring cream bleed when about section enters viewport */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-44" />
      <div className="relative z-10 mx-auto max-w-2xl text-left">
        <SectionLabel>About</SectionLabel>
        <h2 className="mt-4 text-xl tracking-tight sm:text-2xl font-['Jost']">
          I'm Hayden
        </h2>

        <div className="mt-8 max-w-2xl space-y-6 text-base leading-8 text-[#334155] sm:text-md">
          <p>
            I&apos;m a software engineer based in Los Angeles (open to
            relocation), focused on building AI-powered systems, cloud
            infrastructure, and products people actually want to use.
          </p>
          <p>
            Before I was engineer, I was a Division 1 track & field athlete at
            Boston University. That background shapes how I work:
            process-driven, competitive, and genuinely motivated by getting
            better.
          </p>
          <p>
            When I'm not at a keyboard, I'm usually outside, in the gym, or
            building something out of wood – same problem-solving brain,
            different medium.
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
      className="relative overflow-hidden px-6 pr-14 pr-[15%] lg:pr-[0%] pt-42 pb-28"
    >
      <div
        className="pointer-events-none absolute inset-0 hidden lg:block"
        style={{
          backgroundImage: "url('/images/background-bubbles5.webp')",
          backgroundRepeat: "repeat-y",
          backgroundSize: "100% auto",
        }}
      />
      <div className="relative z-10 mx-auto max-w-2xl text-left">
        <SectionLabel>Experience</SectionLabel>
        <h2 className="mt-4 text-xl tracking-tight sm:text-2xl font-['Jost']">
          Where I&apos;ve worked.
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
      className="relative overflow-hidden px-6 pr-14 pr-[15%] lg:pr-[0%] pt-42 pb-28"
    >
      <div
        className="pointer-events-none absolute inset-0 hidden lg:block"
        style={{
          backgroundImage: "url('/images/background-bubbles4.webp')",
          backgroundRepeat: "repeat-y",
          backgroundSize: "100% auto",
        }}
      />
      <div className="relative z-10 mx-auto max-w-2xl text-left">
        <SectionLabel>Projects</SectionLabel>
        <h2 className="mt-4 text-xl tracking-tight sm:text-2xl font-['Jost']">
          Selected projects – ask me about them.
        </h2>

        <div className="mt-8 flex flex-col gap-4">
          {projects.map((project) => (
            <a
              key={project.name}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
              onClick={() =>
                logEvent(analytics, "project_click", {
                  project_name: project.name,
                  project_url: project.url,
                })
              }
            >
              <TiltEffect>
                <div className="relative flex h-full flex-col gap-6 rounded-2xl border border-[#E2D8C8] bg-[#FBF8F2]/80 p-8 backdrop-blur-sm transition-[background-color,box-shadow,border-color] duration-300 group-hover:bg-[#FBF8F2] group-hover:border-[#2E749E]/30 group-hover:shadow-[0_0_8px_rgba(46,116,158,0.2)]">
                  <ExternalLink
                    className="absolute top-6 right-6 h-4 w-4 text-[#334155]/60 transition-colors group-hover:text-[#2E749E]"
                    aria-hidden="true"
                  />
                  <p className="font-semibold text-[#0F172A] font-['Jost'] pr-8">
                    {project.name}
                  </p>
                  <p className="flex-1 text-15 leading-7 font-['Jost'] text-[#334155]">
                    {project.description}
                  </p>
                  <p className="text-xs text-[#2E749E]/80 font-['JetBrains_Mono']">
                    {project.stack}
                  </p>
                </div>
              </TiltEffect>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contact" className="relative overflow-visible px-6 py-12">
      <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center justify-between gap-6 border-t border-[#E2D8C8] pt-12 text-center sm:flex-row sm:text-left">
        <div>
          <p className="text-lg font-medium text-[#0F172A]">
            Building useful software with care.
          </p>
          <p className="mt-2 text-sm text-[#64748B]">Portfolio / 2026</p>
        </div>

        <div className="flex items-center gap-3">
          <FooterLink href="mailto:hayden-jennings@outlook.com" label="Email">
            <Mail className="h-4 w-4" />
          </FooterLink>
          <FooterLink href="https://github.com/hayden-jennings" label="GitHub">
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </FooterLink>
          <FooterLink
            href="https://www.linkedin.com/in/hayden-jennings-9b665719b/"
            label="LinkedIn"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
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
      onClick={() => logEvent(analytics, "footer_link_click", { label })}
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
