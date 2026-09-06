import { Button } from "@/components/ui/button";
import { AmbientBackground } from "@/components/portfolio/AmbientBackground";
import { GlassCard } from "@/components/portfolio/GlassCard";
import { useAuth } from "@/hooks/use-auth";
import {
  ArrowUpRight,
  FolderKanban,
  LogOut,
  Mail,
  Sparkles,
} from "lucide-react";
import { Link, useNavigate } from "react-router";

const QUICK_LINKS = [
  { href: "/#about", label: "About & education" },
  { href: "/#skills", label: "Skills & tech stack" },
  { href: "/#projects", label: "Projects" },
  { href: "/#contact", label: "Contact" },
];

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <main className="relative min-h-screen px-6 py-10 text-foreground">
      <AmbientBackground />

      <div className="relative mx-auto flex w-full max-w-4xl flex-col gap-8">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-sky-600">
              Signed-in workspace
            </p>
            <h1 className="mt-1.5 font-display text-3xl font-bold tracking-tight text-slate-900">
              Welcome{user?.name ? `, ${user.name}` : " back"}
              <Sparkles className="ml-2 inline size-6 text-sky-500" />
            </h1>
          </div>
          <Button
            type="button"
            variant="outline"
            className="cursor-pointer gap-2 self-start rounded-xl border-white/80 bg-white/60 text-slate-700 backdrop-blur-md hover:bg-white/90"
            onClick={handleSignOut}
          >
            <LogOut className="size-4" />
            Sign out
          </Button>
        </header>

        <GlassCard glow="indigo" className="p-7 sm:p-8">
          <div className="flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 text-white shadow-md shadow-sky-500/30">
              <FolderKanban className="size-6" />
            </div>
            <div>
              <h2 className="font-display text-xl font-semibold tracking-tight text-slate-900">
                Sanskar&apos;s portfolio workspace
              </h2>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                You&apos;re signed in. Jump back to any section of the
                portfolio, or drop a note via the contact panel.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {QUICK_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="group flex items-center justify-between rounded-2xl border border-white/80 bg-white/55 px-4 py-3 text-sm font-medium text-slate-700 backdrop-blur-sm transition-colors hover:bg-white/90 hover:text-slate-900"
              >
                {link.label}
                <ArrowUpRight className="size-4 text-sky-500 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-2 rounded-2xl border border-sky-200/70 bg-sky-100/50 px-4 py-3 text-sm text-slate-700">
            <Mail className="size-4 shrink-0 text-sky-600" />
            Questions or collabs?
            <a
              href="mailto:sanskarpandey2123@gmail.com"
              className="ml-1 font-semibold text-sky-700 underline-offset-2 hover:underline"
            >
              sanskarpandey2123@gmail.com
            </a>
          </div>
        </GlassCard>
      </div>
    </main>
  );
}
