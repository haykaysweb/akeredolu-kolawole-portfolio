import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, Search, Sun, X } from "lucide-react";
import { skills } from "@/data/skills";
import { projects } from "@/data/projects";
import { navItems } from "@/data/nav";
import { personal } from "@/data/personal";
import { useSettings } from "@/hooks/useSettings";
import { usePageTitle } from "@/hooks/usePageTitle";
import { getInitials } from "@/lib/utils";
import type { SearchResult } from "@/types";

interface HeaderProps {
  onOpenSidebar: () => void;
}

const typeLabel: Record<SearchResult["type"], string> = {
  page: "Page",
  skill: "Skill",
  project: "Project",
};

export function Header({ onOpenSidebar }: HeaderProps) {
  const { settings, update } = useSettings();
  const navigate = useNavigate();
  const pageTitle = usePageTitle();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo<SearchResult[]>(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const pages = navItems
      .filter((n) => n.label.toLowerCase().includes(q))
      .map((n) => ({
        id: n.id,
        title: n.label,
        type: "page" as const,
        path: n.path,
      }));

    const skillHits = skills
      .filter((s) => s.name.toLowerCase().includes(q))
      .map((s) => ({
        id: s.id,
        title: s.name,
        type: "skill" as const,
        path: "/skills",
      }));

    const projectHits = projects
      .filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.tech.some((t) => t.toLowerCase().includes(q)),
      )
      .map((p) => ({
        id: p.id,
        title: p.title,
        type: "project" as const,
        path: "/projects",
      }));

    return [...pages, ...skillHits, ...projectHits].slice(0, 8);
  }, [query]);

  // Ctrl/Cmd + K focuses the search
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const goTo = (result: SearchResult) => {
    navigate(result.path);
    setQuery("");
    setOpen(false);
    inputRef.current?.blur();
  };

  const showDropdown = open && query.trim().length > 0;

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-bg/95 lg:bg-bg/80 lg:backdrop-blur-xl">
      <div className="flex h-16 items-center gap-3 px-4 lg:px-6">
        <button
          onClick={onOpenSidebar}
          className="rounded-lg p-2 text-muted hover:bg-surface-2 lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="hidden min-w-0 sm:block">
          <p className="text-xs text-dim">Dashboard</p>
          <h1 className="truncate text-base font-semibold text-foreground">
            {pageTitle}
          </h1>
        </div>

        {/* Search */}
        <div ref={wrapperRef} className="relative mx-auto max-w-md flex-1">
          <div className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-dim" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setOpen(true);
              }}
              onFocus={() => setOpen(true)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && results[0]) goTo(results[0]);
                if (e.key === "Escape") {
                  setOpen(false);
                  inputRef.current?.blur();
                }
              }}
              placeholder="Search skills, projects, pages..."
              aria-label="Search"
              className="w-full rounded-xl border border-line bg-surface py-2 pr-10 pl-10 text-sm text-foreground outline-none transition-all placeholder:text-dim focus:border-accent/50 focus:shadow-glow-sm"
            />
            {query ? (
              <button
                onClick={() => setQuery("")}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-dim hover:text-foreground"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            ) : (
              <kbd className="pointer-events-none absolute top-1/2 right-3 hidden -translate-y-1/2 rounded-md border border-line bg-surface-2 px-1.5 py-0.5 text-[10px] text-dim md:block">
                Ctrl K
              </kbd>
            )}
          </div>

          <AnimatePresence>
            {showDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.15 }}
                className="absolute top-full z-50 mt-2 w-full overflow-hidden rounded-xl border border-line bg-surface shadow-card"
              >
                {results.length === 0 ? (
                  <p className="px-4 py-3 text-sm text-dim">
                    No results for "{query}"
                  </p>
                ) : (
                  results.map((r) => (
                    <button
                      key={`${r.type}-${r.id}`}
                      onClick={() => goTo(r)}
                      className="flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition-colors hover:bg-surface-2"
                    >
                      <span className="text-foreground">{r.title}</span>
                      <span className="rounded-md bg-surface-2 px-2 py-0.5 text-xs text-dim">
                        {typeLabel[r.type]}
                      </span>
                    </button>
                  ))
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() =>
              update("theme", settings.theme === "dark" ? "light" : "dark")
            }
            className="rounded-lg p-2 text-muted transition-colors hover:bg-surface-2 hover:text-foreground"
            aria-label="Toggle theme"
          >
            {settings.theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>
          {/* <button
            className="relative rounded-lg p-2 text-muted transition-colors hover:bg-surface-2 hover:text-foreground"
            aria-label="Open to work"
            title={personal.availability}
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-accent" />
          </button> */}
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-sm font-semibold text-accent shadow-glow-sm">
            {getInitials(personal.name)}
          </div>
        </div>
      </div>
    </header>
  );
}
