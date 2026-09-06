import { animate, motion, useInView, useMotionValue, useSpring } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Code2,
  Copy,
  Check,
  Database,
  FolderKanban,
  Globe,
  GraduationCap,
  Languages,
  Layers,
  LayoutTemplate,
  ListTodo,
  Mail,
  MapPin,
  Menu,
  MessageSquare,
  MonitorSmartphone,
  MousePointer2,
  Radar,
  Rocket,
  Server,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AmbientBackground } from "@/components/portfolio/AmbientBackground";
import { GlassCard } from "@/components/portfolio/GlassCard";

const EMAIL = "sanskarpandey2123@gmail.com";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

/* ------------------------------------------------------------------ */
/*  Cursor                                                             */
/* ------------------------------------------------------------------ */

/** Subtle light-glass cursor companion: a soft ring that trails the pointer. */
function CursorGlow() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const ringX = useSpring(x, { stiffness: 260, damping: 26, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 260, damping: 26, mass: 0.6 });

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    if (!finePointer.matches) return;
    let started = false;

    const handleMove = (event: MouseEvent) => {
      if (!started) {
        // Jump the trailing ring to the cursor so it never sweeps in from
        // its initial offscreen position on the first move.
        started = true;
        ringX.jump(event.clientX);
        ringY.jump(event.clientY);
        setEnabled(true);
      }
      x.set(event.clientX);
      y.set(event.clientY);
      const target = event.target as HTMLElement | null;
      setHovering(
        !!target?.closest("a, button, [role='button'], input, textarea"),
      );
    };
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [x, y, ringX, ringY]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[90] hidden md:block"
        style={{ x: ringX, y: ringY }}
      >
        <motion.div
          className="size-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-sky-400/50 bg-white/25 backdrop-blur-[1px]"
          animate={{ scale: hovering ? 1.5 : 1, opacity: hovering ? 0.9 : 0.55 }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[90] hidden md:block"
        style={{ x, y }}
      >
        <div className="size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-sky-500 to-indigo-600" />
      </motion.div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Navigation                                                         */
/* ------------------------------------------------------------------ */

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <nav className="flex items-center justify-between rounded-2xl border border-white/70 bg-white/60 py-2.5 pl-3.5 pr-2.5 shadow-lg shadow-sky-900/[0.07] backdrop-blur-xl sm:pr-3.5">
          <a href="#top" className="flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 font-display text-sm font-bold text-white shadow-md shadow-sky-500/30">
              SP
            </span>
            <span className="hidden font-display text-[15px] font-semibold tracking-tight text-slate-800 sm:block">
              Sanskar Pandey
            </span>
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-xl px-3.5 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-white/80 hover:text-slate-900"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="rounded-xl text-slate-600 hover:bg-white/80 hover:text-slate-900"
            >
              <Link to="/auth">Sign in</Link>
            </Button>
            <Button
              asChild
              size="sm"
              className="rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 shadow-md shadow-sky-500/30 hover:from-sky-500/95 hover:to-indigo-600/95"
            >
              <a href={`mailto:${EMAIL}`}>Let&apos;s talk</a>
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex size-9 items-center justify-center rounded-xl border border-white/70 bg-white/70 text-slate-700 md:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </nav>

        {open && (
          <div className="mt-2 rounded-2xl border border-white/70 bg-white/75 p-3 shadow-xl shadow-sky-900/10 backdrop-blur-2xl md:hidden">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-white/90"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-2 flex gap-2 border-t border-white/70 pt-3">
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="flex-1 rounded-xl"
              >
                <Link to="/auth" onClick={() => setOpen(false)}>
                  Sign in
                </Link>
              </Button>
              <Button
                asChild
                size="sm"
                className="flex-1 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600"
              >
                <a href={`mailto:${EMAIL}`} onClick={() => setOpen(false)}>
                  Let&apos;s talk
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/*  Section header                                                     */
/* ------------------------------------------------------------------ */

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mx-auto max-w-2xl text-center"
    >
      <span className="glass-chip">{eyebrow}</span>
      <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-7 text-slate-600">{description}</p>
      )}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */

function Hero() {
  return (
    <section id="top" className="relative mx-auto max-w-6xl px-4 pb-6 pt-36 sm:px-6 lg:pt-44">
      <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span className="glass-chip">
            <span className="size-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_2px_rgba(16,185,129,0.5)]" />
            Open to internships &amp; collaborations
          </span>

          <h1 className="mt-6 font-display text-5xl font-bold leading-[1.04] tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
            Sanskar{" "}
            <span className="text-gradient-cool">Pandey</span>
          </h1>

          <p className="mt-5 font-display text-lg font-semibold text-slate-700 sm:text-xl">
            Full-Stack Developer
            <span className="mx-2.5 text-slate-300">·</span>
            <span className="text-gradient-cool">Security-Focused</span>{" "}
            Engineering
          </p>

          <p className="mt-5 max-w-xl text-base leading-7 text-slate-600">
            I build secure, scalable full-stack applications and explore the
            intersection of development and cybersecurity — from JWT-protected
            task apps to Python network scanners. Hands-on with React, Node.js,
            and modern tooling, always shipping with the user and the threat
            model in mind.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button
              asChild
              size="lg"
              className="rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 px-6 shadow-lg shadow-sky-500/30 hover:from-sky-500/95 hover:to-indigo-600/95"
            >
              <a href="#projects">
                View my work
                <ArrowRight className="ml-2 size-4" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-xl border-white/80 bg-white/60 px-6 text-slate-700 backdrop-blur-md hover:bg-white/90 hover:text-slate-900"
            >
              <a href={`mailto:${EMAIL}`}>Get in touch</a>
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm font-medium text-slate-500">
            <span className="flex items-center gap-2">
              <GraduationCap className="size-4 text-sky-600" />
              B.Tech CSE · VIT Vellore
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck className="size-4 text-sky-600" />
              Information Security
            </span>
            <span className="flex items-center gap-2">
              <Languages className="size-4 text-sky-600" />
              4 languages
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.18, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-lg"
        >
          <div className="absolute -inset-8 -z-10 rounded-[3rem] bg-gradient-to-br from-sky-300/45 via-indigo-200/40 to-cyan-200/45 blur-2xl" />

          <GlassCard glow="indigo" className="p-2">
            <div className="overflow-hidden rounded-[1.15rem] border border-white/60 bg-white/45">
              <div className="flex items-center gap-2 border-b border-white/60 bg-white/30 px-4 py-3">
                <span className="size-3 rounded-full bg-rose-300" />
                <span className="size-3 rounded-full bg-amber-300" />
                <span className="size-3 rounded-full bg-emerald-300" />
                <span className="ml-2 font-mono text-xs font-medium text-slate-500">
                  portfolio.ts
                </span>
                <span className="ml-auto hidden items-center gap-1.5 rounded-full border border-emerald-200/80 bg-emerald-100/60 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 sm:flex">
                  <span className="size-1.5 rounded-full bg-emerald-500" />
                  deploy: live
                </span>
              </div>
              <div className="space-y-1.5 p-5 font-mono text-[13px] leading-6 sm:p-6 sm:text-sm">
                <p className="italic text-slate-400">
                  {"// hi, I'm Sanskar 👋"}
                </p>
                <p>
                  <span className="text-sky-700">const</span>{" "}
                  <span className="text-indigo-600">engineer</span>{" "}
                  <span className="text-slate-400">= {"{"}</span>
                </p>
                <p className="pl-5">
                  <span className="text-sky-700">name</span>
                  <span className="text-slate-400">:</span>{" "}
                  <span className="text-indigo-700">"Sanskar Pandey"</span>,
                </p>
                <p className="pl-5">
                  <span className="text-sky-700">role</span>
                  <span className="text-slate-400">:</span>{" "}
                  <span className="text-indigo-700">
                    "Full-Stack Developer"
                  </span>
                  ,
                </p>
                <p className="pl-5">
                  <span className="text-sky-700">stack</span>
                  <span className="text-slate-400">:</span>{" "}
                  <span className="text-slate-400">[</span>
                  <span className="text-cyan-700">"React"</span>
                  <span className="text-slate-400">, </span>
                  <span className="text-cyan-700">"Node.js"</span>
                  <span className="text-slate-400">, </span>
                  <span className="text-cyan-700">"MySQL"</span>
                  <span className="text-slate-400">]</span>,
                </p>
                <p className="pl-5">
                  <span className="text-sky-700">focus</span>
                  <span className="text-slate-400">:</span>{" "}
                  <span className="text-indigo-700">
                    "secure web apps &amp; security"
                  </span>
                  ,
                </p>
                <p className="pl-5">
                  <span className="text-sky-700">college</span>
                  <span className="text-slate-400">:</span>{" "}
                  <span className="text-indigo-700">"VIT Vellore"</span>,
                </p>
                <p className="pl-5">
                  <span className="text-sky-700">openTo</span>
                  <span className="text-slate-400">:</span>{" "}
                  <span className="text-indigo-700">
                    "internships &amp; collaborations"
                  </span>
                  ,
                </p>
                <p className="text-slate-400">{"};"}</p>
              </div>
            </div>
          </GlassCard>

          {/* Floating glass chips */}
          <div className="absolute -left-7 top-8 hidden animate-float-slow lg:block">
            <div className="flex items-center gap-2 rounded-2xl border border-white/75 bg-white/75 px-3.5 py-2 text-sm font-semibold text-slate-700 shadow-lg shadow-sky-900/10 backdrop-blur-xl">
              <Code2 className="size-4 text-sky-600" />
              React
            </div>
          </div>
          <div
            className="absolute -right-6 top-1/3 hidden animate-float-slow lg:block"
            style={{ animationDelay: "1.3s" }}
          >
            <div className="flex items-center gap-2 rounded-2xl border border-white/75 bg-white/75 px-3.5 py-2 text-sm font-semibold text-slate-700 shadow-lg shadow-sky-900/10 backdrop-blur-xl">
              <Server className="size-4 text-indigo-600" />
              Node.js
            </div>
          </div>
          <div
            className="absolute -left-9 bottom-24 hidden animate-float-slow lg:block"
            style={{ animationDelay: "2.1s" }}
          >
            <div className="flex items-center gap-2 rounded-2xl border border-white/75 bg-white/75 px-3.5 py-2 text-sm font-semibold text-slate-700 shadow-lg shadow-sky-900/10 backdrop-blur-xl">
              <Database className="size-4 text-cyan-600" />
              MySQL
            </div>
          </div>
          <div
            className="absolute -right-8 bottom-8 hidden animate-float-slow lg:block"
            style={{ animationDelay: "0.7s" }}
          >
            <div className="flex items-center gap-2 rounded-2xl border border-white/75 bg-white/75 px-3.5 py-2 text-sm font-semibold text-slate-700 shadow-lg shadow-sky-900/10 backdrop-blur-xl">
              <ShieldCheck className="size-4 text-blue-600" />
              Security
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Tech marquee                                                       */
/* ------------------------------------------------------------------ */

const MARQUEE_ITEMS = [
  "React",
  "Node.js",
  "Express",
  "MySQL",
  "JavaScript",
  "Python",
  "JWT Auth",
  "REST APIs",
  "Git & GitHub",
  "Linux",
  "Security",
];

function TechMarquee() {
  return (
    <div className="relative mx-auto mt-10 max-w-6xl overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
      <div className="flex w-max animate-marquee">
        {[0, 1].map((half) => (
          <div
            key={half}
            className="flex items-center gap-10 pr-10"
            aria-hidden={half === 1}
          >
            {MARQUEE_ITEMS.map((item) => (
              <span
                key={item}
                className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-slate-400"
              >
                {item}
                <Sparkles className="size-3.5 text-sky-400/80" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  About                                                              */
/* ------------------------------------------------------------------ */

const QUICK_FACTS = [
  { value: "7.86", label: "CGPA" },
  { value: "2+", label: "Years coding" },
  { value: "4", label: "Languages" },
  { value: "3+", label: "Projects" },
];

function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-24 sm:px-6">
      <SectionHeader
        eyebrow="About me"
        title="Developer by day, security enthusiast by night"
        description="A quick look at who I am, what I study, and what drives the way I build software."
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <GlassCard className="h-full p-7 sm:p-9">
            <div className="flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 text-white shadow-md shadow-sky-500/30">
              <Rocket className="size-5" />
            </div>
            <h3 className="mt-5 font-display text-xl font-semibold tracking-tight text-slate-900">
              Hi, I&apos;m Sanskar 👋
            </h3>
            <p className="mt-3 text-[15px] leading-7 text-slate-600">
              I&apos;m a B.Tech Computer Science student specialising in{" "}
              <span className="font-semibold text-slate-800">
                Information Security
              </span>{" "}
              at VIT Vellore, and an aspiring Software Development Engineer. I
              enjoy building secure, scalable full-stack applications and
              exploring the intersection of development and cybersecurity.
            </p>
            <p className="mt-4 text-[15px] leading-7 text-slate-600">
              Whether it&apos;s designing a JWT-protected REST API, scanning a
              network for open ports, or polishing an interface until it feels
              effortless — I care about the details that make software both
              <span className="font-semibold text-slate-800"> usable</span> and{" "}
              <span className="font-semibold text-slate-800">safe</span>.
            </p>

            <div className="mt-7 flex flex-wrap gap-2.5">
              {QUICK_FACTS.map((fact) => (
                <span
                  key={fact.label}
                  className="rounded-full border border-white/80 bg-white/60 px-3.5 py-1.5 text-xs font-semibold text-slate-600 backdrop-blur-sm"
                >
                  {fact.value}{" "}
                  <span className="font-medium text-slate-400">
                    · {fact.label}
                  </span>
                </span>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        <div className="grid gap-6">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          >
            <GlassCard glow="indigo" className="flex items-start gap-5 p-7">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 text-white shadow-md shadow-indigo-500/30">
                <GraduationCap className="size-5" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sky-600">
                  Education
                </p>
                <h3 className="mt-1.5 font-display text-lg font-semibold tracking-tight text-slate-900">
                  B.Tech — Computer Science &amp; Engineering
                </h3>
                <p className="mt-1 text-sm font-medium text-slate-600">
                  Information Security specialisation
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  VIT Vellore · CGPA{" "}
                  <span className="font-semibold text-slate-700">7.86</span>
                </p>
              </div>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <GlassCard glow="cyan" className="flex items-start gap-5 p-7">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-sky-600 text-white shadow-md shadow-cyan-500/30">
                <MapPin className="size-5" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sky-600">
                  Currently
                </p>
                <h3 className="mt-1.5 font-display text-lg font-semibold tracking-tight text-slate-900">
                  Exploring dev × security
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Building full-stack projects, hardening what I ship, and
                  learning how real-world attacks shape real-world software.
                </p>
                <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-emerald-200/80 bg-emerald-100/50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  <span className="size-1.5 rounded-full bg-emerald-500" />
                  Open to internships &amp; collaborations
                </p>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Skills                                                            */
/* ------------------------------------------------------------------ */

const SKILL_GROUPS = [
  {
    title: "Frontend",
    icon: LayoutTemplate,
    tint: "from-sky-500 to-cyan-500 shadow-sky-500/30",
    skills: ["HTML5", "CSS3", "JavaScript (ES6+)", "React"],
  },
  {
    title: "Backend",
    icon: Server,
    tint: "from-indigo-500 to-blue-600 shadow-indigo-500/30",
    skills: ["Node.js", "Express.js", "REST APIs", "JWT Authentication"],
  },
  {
    title: "Database",
    icon: Database,
    tint: "from-cyan-500 to-sky-600 shadow-cyan-500/30",
    skills: ["MySQL", "Data modeling", "Query optimization", "Secure schema design"],
  },
  {
    title: "Tools & Security",
    icon: ShieldCheck,
    tint: "from-blue-500 to-indigo-600 shadow-blue-500/30",
    skills: ["Git & GitHub", "VS Code", "Linux", "Network security"],
  },
];

function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-24 sm:px-6">
      <SectionHeader
        eyebrow="Tech stack"
        title="Tools I build and secure with"
        description="The frontend, backend, data, and security toolkit behind my projects."
      />

      <div className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {SKILL_GROUPS.map((group, index) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.55, delay: index * 0.08, ease: "easeOut" }}
          >
            <GlassCard className="h-full p-6 transition-transform duration-300 hover:-translate-y-1.5">
              <div
                className={`flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-md ${group.tint}`}
              >
                <group.icon className="size-5" />
              </div>
              <h3 className="mt-5 font-display text-base font-semibold tracking-tight text-slate-900">
                {group.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {group.skills.map((skill) => (
                  <li key={skill} className="flex items-center gap-2.5 text-sm text-slate-600">
                    <span className="flex size-5 items-center justify-center rounded-full bg-sky-100 text-sky-600">
                      <Check className="size-3" strokeWidth={3} />
                    </span>
                    {skill}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Features                                                           */
/* ------------------------------------------------------------------ */

const FEATURES = [
  {
    icon: MonitorSmartphone,
    title: "Responsive & modern UI",
    description:
      "A polished interface that adapts beautifully from mobile to ultrawide.",
  },
  {
    icon: Sparkles,
    title: "Smooth motion",
    description:
      "Eased scroll reveals and gentle animations keep the experience fluid.",
  },
  {
    icon: Layers,
    title: "Light glassmorphism",
    description:
      "Layered translucent panels, controlled blur, and bright cool surfaces.",
  },
  {
    icon: MousePointer2,
    title: "Custom cursor",
    description:
      "A subtle cursor companion that echoes every hover across the page.",
  },
  {
    icon: FolderKanban,
    title: "Project showcase",
    description:
      "Hands-on full-stack and security projects — documented and demo-ready.",
  },
  {
    icon: MessageSquare,
    title: "Contact integration",
    description:
      "One-click email with copy-to-clipboard — no friction between us.",
  },
];

function Features() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-8 sm:px-6">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: (index % 3) * 0.07, ease: "easeOut" }}
          >
            <GlassCard className="flex h-full items-start gap-4 p-6 transition-transform duration-300 hover:-translate-y-1">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/80 bg-white/60 text-sky-600 shadow-sm">
                <feature.icon className="size-5" />
              </div>
              <div>
                <h3 className="font-display text-[15px] font-semibold tracking-tight text-slate-900">
                  {feature.title}
                </h3>
                <p className="mt-1.5 text-sm leading-6 text-slate-600">
                  {feature.description}
                </p>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Projects                                                           */
/* ------------------------------------------------------------------ */

const PROJECTS = [
  {
    title: "Task Manager App",
    tagline: "Full-stack · React + Node + MySQL",
    icon: ListTodo,
    tint: "from-sky-500 to-indigo-600 shadow-sky-500/30",
    description:
      "A full-stack productivity app with JWT-based authentication and complete CRUD flows for tasks — secure sessions, protected routes, and a clean REST API.",
    stack: ["React", "Node.js", "Express", "MySQL", "JWT"],
    status: { label: "In progress", dot: "bg-amber-500", pill: "border-amber-200/90 bg-amber-100/60 text-amber-700" },
    progress: 65,
  },
  {
    title: "Network Port Scanner",
    tagline: "Security tool · Python",
    icon: Radar,
    tint: "from-indigo-500 to-blue-600 shadow-indigo-500/30",
    description:
      "A Python-based network security tool that scans hosts for open ports and detects running services — built for labs, CTFs, and security research.",
    stack: ["Python", "Sockets", "Service detection"],
    status: { label: "Security tool", dot: "bg-sky-500", pill: "border-sky-200/90 bg-sky-100/60 text-sky-700" },
  },
  {
    title: "Portfolio Website",
    tagline: "Frontend · Interactive UI",
    icon: Globe,
    tint: "from-cyan-500 to-sky-600 shadow-cyan-500/30",
    description:
      "An interactive personal portfolio with animations, smooth scrolling, and a responsive glassmorphism UI — built from scratch with the web platform.",
    stack: ["HTML5", "CSS3", "JavaScript"],
    status: { label: "Live", dot: "bg-emerald-500", pill: "border-emerald-200/90 bg-emerald-100/60 text-emerald-700" },
  },
];

function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-24 sm:px-6">
      <SectionHeader
        eyebrow="Projects"
        title="Things I&apos;ve built"
        description="Full-stack apps and security tools that show how I think, ship, and secure software."
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {PROJECTS.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
            className="h-full"
          >
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 280, damping: 24 }}
              className="h-full"
            >
              <GlassCard glow="indigo" className="flex h-full flex-col p-7">
                <div className="flex items-start justify-between gap-4">
                  <div
                    className={`flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-md ${project.tint}`}
                  >
                    <project.icon className="size-6" />
                  </div>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${project.status.pill}`}
                  >
                    <span className={`size-1.5 rounded-full ${project.status.dot} ${project.status.label === "In progress" ? "animate-pulse" : ""}`} />
                    {project.status.label}
                  </span>
                </div>

                <h3 className="mt-5 font-display text-xl font-semibold tracking-tight text-slate-900">
                  {project.title}
                </h3>
                <p className="mt-0.5 text-xs font-semibold uppercase tracking-[0.12em] text-sky-600">
                  {project.tagline}
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {project.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-white/80 bg-white/60 px-2.5 py-1 text-xs font-medium text-slate-600 backdrop-blur-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-auto pt-6">
                  {typeof project.progress === "number" ? (
                    <div>
                      <div className="mb-2 flex items-center justify-between text-xs font-medium text-slate-500">
                        <span>Ship progress</span>
                        <span className="font-semibold text-slate-700">
                          {project.progress}%
                        </span>
                      </div>
                      <Progress
                        value={project.progress}
                        className="h-1.5 rounded-full bg-white/70 [&>div]:bg-gradient-to-r [&>div]:from-sky-500 [&>div]:to-indigo-500"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                      <span className="inline-block h-px w-8 bg-sky-300/70" />
                      Case study
                    </div>
                  )}
                </div>
              </GlassCard>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Stats                                                              */
/* ------------------------------------------------------------------ */

function StatCounter({
  value,
  decimals = 0,
  suffix = "",
}: {
  value: number;
  decimals?: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.7,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplay(latest.toFixed(decimals)),
    });
    return () => controls.stop();
  }, [inView, value, decimals]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}

const STATS = [
  {
    icon: GraduationCap,
    value: 7.86,
    decimals: 2,
    label: "CGPA · VIT Vellore",
  },
  { icon: Code2, value: 2, suffix: "+", label: "Years of coding" },
  { icon: Languages, value: 4, label: "Languages known" },
  { icon: FolderKanban, value: 3, suffix: "+", label: "Projects built" },
];

function Stats() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-8 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.65, ease: "easeOut" }}
      >
        <GlassCard glow="cyan" className="p-8 sm:p-12">
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="mx-auto flex size-10 items-center justify-center rounded-xl border border-white/80 bg-white/60 text-sky-600 shadow-sm">
                  <stat.icon className="size-5" />
                </div>
                <div className="mt-4 font-display text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                  <StatCounter
                    value={stat.value}
                    decimals={stat.decimals ?? 0}
                    suffix={stat.suffix ?? ""}
                  />
                </div>
                <p className="mt-2 text-sm font-medium text-slate-500">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </GlassCard>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Contact                                                            */
/* ------------------------------------------------------------------ */

function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="contact" className="mx-auto max-w-4xl scroll-mt-24 px-4 py-24 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.65, ease: "easeOut" }}
      >
        <GlassCard glow="indigo" className="relative overflow-hidden p-8 text-center sm:p-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -right-20 size-64 rounded-full bg-sky-200/50 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-28 -left-16 size-64 rounded-full bg-indigo-200/50 blur-3xl"
          />

          <div className="relative">
            <span className="glass-chip">
              <Mail className="size-3.5" />
              Contact
            </span>
            <h2 className="mt-6 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Let&apos;s build something{" "}
              <span className="text-gradient-cool">secure</span> together
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-600">
              Open to internships, collaborations, and opportunities in Full
              Stack Development and Software Engineering. My inbox is always
              open — let&apos;s talk.
            </p>

            <div className="mx-auto mt-9 flex max-w-md items-center justify-between gap-3 rounded-2xl border border-white/80 bg-white/60 py-2.5 pl-3 pr-2.5 backdrop-blur-md">
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 text-white shadow-md shadow-sky-500/30">
                  <Mail className="size-4" />
                </span>
                <span className="truncate text-sm font-medium text-slate-700">
                  {EMAIL}
                </span>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={copyEmail}
                aria-label="Copy email address"
                className="size-9 shrink-0 rounded-xl text-slate-500 hover:bg-white/80 hover:text-slate-900"
              >
                {copied ? (
                  <Check className="size-4 text-emerald-600" />
                ) : (
                  <Copy className="size-4" />
                )}
              </Button>
            </div>
            {copied && (
              <p className="mt-2 text-xs font-medium text-emerald-600">
                Email copied to clipboard!
              </p>
            )}

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button
                asChild
                size="lg"
                className="rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 px-7 shadow-lg shadow-sky-500/30 hover:from-sky-500/95 hover:to-indigo-600/95"
              >
                <a href={`mailto:${EMAIL}?subject=Let's%20work%20together`}>
                  Send an email
                  <ArrowUpRight className="ml-2 size-4" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-xl border-white/80 bg-white/60 px-7 text-slate-700 backdrop-blur-md hover:bg-white/90 hover:text-slate-900"
              >
                <a href="#top">Back to top ↑</a>
              </Button>
            </div>

            <p className="mt-8 text-sm font-medium text-slate-500">
              🚀 Status: open to internships, collaborations &amp; opportunities
            </p>
          </div>
        </GlassCard>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Footer                                                             */
/* ------------------------------------------------------------------ */

function Footer() {
  return (
    <footer className="px-4 pb-8 sm:px-6">
      <div className="mx-auto max-w-6xl rounded-3xl border border-white/60 bg-white/45 px-6 py-7 backdrop-blur-xl">
        <div className="flex flex-col items-center justify-between gap-5 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-sky-500 to-indigo-600 font-display text-xs font-bold text-white">
              SP
            </span>
            <span className="font-display text-sm font-semibold tracking-tight text-slate-800">
              Sanskar Pandey
            </span>
          </div>
          <p className="max-w-md text-center text-xs leading-5 text-slate-500 sm:text-left">
            © 2026 Sanskar Pandey · Open source — free for personal &
            educational use. If you like this portfolio, give it a star ⭐
          </p>
          <div className="flex items-center gap-5 text-xs font-semibold">
            <Link
              to="/auth"
              className="text-slate-500 transition-colors hover:text-slate-900"
            >
              Sign in
            </Link>
            <a
              href="#top"
              className="text-slate-500 transition-colors hover:text-slate-900"
            >
              Back to top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function Landing() {
  // When arriving with a hash (e.g. from the dashboard quick links or a
  // direct URL like /#projects), scroll to the section once the page mounts.
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const timer = window.setTimeout(() => {
      document
        .getElementById(hash.slice(1))
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-clip text-foreground antialiased">
      <AmbientBackground />
      <CursorGlow />
      <Navbar />
      <main>
        <Hero />
        <TechMarquee />
        <About />
        <Skills />
        <Features />
        <Projects />
        <Stats />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
