import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, FolderGit2, X } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { Card } from "@/components/ui/Card";
import { projects } from "@/data/projects";
import { cn } from "@/lib/utils";
import type { Project, ProjectCategory } from "@/types";

const filters: Array<ProjectCategory | "All"> = [
  "All",
  "Web App",
  "Full-Stack",
  "UI Design",
];

const linkBase =
  "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm transition-all";
const secondaryLink = `${linkBase} border border-line bg-surface-2 text-foreground hover:border-accent/40`;
const outlineLink = `${linkBase} border border-accent/40 text-accent hover:bg-accent/10 hover:shadow-glow-sm`;

function ProjectCover({
  project,
  className,
}: {
  project: Project;
  className: string;
}) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(project.image) && !failed;

  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden bg-linear-to-br from-accent/15 via-surface-2 to-surface",
        className,
      )}
    >
      {showImage ? (
        <img
          src={project.image}
          alt={`${project.title} cover`}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <FolderGit2 className="h-12 w-12 text-accent/40" />
      )}
    </div>
  );
}

function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: () => void;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25 }}
    >
      <Card hover className="flex h-full flex-col overflow-hidden">
        <div
          role="button"
          tabIndex={0}
          onClick={onOpen}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onOpen();
            }
          }}
          className="group flex-1 cursor-pointer"
        >
          <ProjectCover project={project} className="h-44" />
          <div className="p-5">
            <div className="mb-2 flex items-start justify-between gap-2">
              <h3 className="font-semibold text-foreground">{project.title}</h3>
              <span className="shrink-0 rounded-md bg-accent/10 px-2 py-0.5 text-xs text-accent">
                {project.category}
              </span>
            </div>
            <p className="mb-3 line-clamp-2 text-sm text-muted">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {project.tech.slice(0, 4).map((t) => (
                <span
                  key={t}
                  className="rounded-md border border-line bg-surface-2 px-2 py-0.5 text-xs text-dim"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex gap-2 px-5 pb-5">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={secondaryLink}
          >
            <FaGithub className="h-3.5 w-3.5" /> Code
          </a>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={outlineLink}
          >
            <ExternalLink className="h-3.5 w-3.5" /> Demo
          </a>
        </div>
      </Card>
    </motion.div>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<ProjectCategory | "All">("All");
  const [selected, setSelected] = useState<Project | null>(null);

  const filtered =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-foreground">Projects</h2>
          <p className="mt-1 text-sm text-muted">{filtered.length} projects</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-xl px-3.5 py-2 text-sm transition-all",
                filter === f
                  ? "bg-accent font-medium text-bg shadow-glow-sm"
                  : "border border-line bg-surface text-muted hover:border-accent/30 hover:text-foreground",
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <motion.div
        layout
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((p) => (
            <ProjectCard key={p.id} project={p} onOpen={() => setSelected(p)} />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={selected.title}
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-line bg-surface"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <ProjectCover
                  key={selected.id}
                  project={selected}
                  className="h-56 sm:h-72"
                />
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 rounded-lg bg-surface/80 p-2 text-muted hover:text-foreground"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-6">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <h3 className="text-xl font-bold text-foreground">
                    {selected.title}
                  </h3>
                  <span className="rounded-md bg-accent/10 px-2 py-0.5 text-xs text-accent">
                    {selected.category}
                  </span>
                </div>
                <p className="mb-4 leading-relaxed text-muted">
                  {selected.longDescription}
                </p>
                <div className="mb-6 flex flex-wrap gap-2">
                  {selected.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-lg border border-line bg-surface-2 px-2.5 py-1 text-xs text-dim"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <a
                    href={selected.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={outlineLink}
                  >
                    <ExternalLink className="h-4 w-4" /> Live Demo
                  </a>
                  <a
                    href={selected.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={secondaryLink}
                  >
                    <FaGithub className="h-4 w-4" /> GitHub
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}