import { NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, Download, X } from "lucide-react";
import { navItems } from "@/data/nav";
import { personal } from "@/data/personal";
import { useSettings } from "@/hooks/useSettings";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { downloadResume } from "@/lib/resume";
import { cn, getInitials } from "@/lib/utils";

interface SidebarContentProps {
  variant: "desktop" | "mobile";
  collapsed: boolean;
  onClose?: () => void;
}

function SidebarContent({ variant, collapsed, onClose }: SidebarContentProps) {
  return (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex items-center gap-3 border-b border-line px-4 py-5">
        <div className="relative shrink-0">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15 text-lg font-bold text-accent shadow-glow-sm">
            {getInitials(personal.name)}
          </div>
          <span className="absolute -right-0.5 -bottom-0.5 h-3 w-3 rounded-full bg-accent ring-2 ring-surface" />
        </div>
        <AnimatePresence initial={false}>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="min-w-0"
            >
              <p className="truncate text-sm font-semibold text-foreground">
                {personal.name}
              </p>
              <p className="truncate text-xs text-muted">{personal.title}</p>
            </motion.div>
          )}
        </AnimatePresence>
        {variant === "mobile" && (
          <button
            onClick={onClose}
            className="ml-auto rounded-lg p-2 text-muted hover:bg-surface-2 hover:text-foreground"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-x-hidden overflow-y-auto px-3 py-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.id}
              to={item.path}
              end={item.path === "/"}
              onClick={onClose}
              title={collapsed ? item.label : undefined}
              className={({ isActive }) =>
                cn(
                  "relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors duration-200",
                  collapsed && "justify-center",
                  isActive
                    ? "font-medium text-accent"
                    : "text-muted hover:bg-surface-2 hover:text-foreground",
                )
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.div
                      layoutId={`sidebar-active-${variant}`}
                      className="absolute inset-0 rounded-xl border border-accent/30 bg-accent/10 shadow-glow-sm"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 35,
                      }}
                    />
                  )}
                  <Icon className="relative z-10 h-5 w-5 shrink-0" />
                  <AnimatePresence initial={false}>
                    {!collapsed && (
                      <motion.span
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -5 }}
                        transition={{ duration: 0.15 }}
                        className="relative z-10 whitespace-nowrap"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="space-y-3 border-t border-line p-3">
        <div
          className={cn(
            "flex items-center gap-2.5",
            collapsed && "justify-center",
          )}
        >
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
          </span>
          {!collapsed && (
            <p className="text-xs text-muted">{personal.availability}</p>
          )}
        </div>
        <button
          onClick={downloadResume}
          aria-label="Download resume"
          className={cn(
            "flex w-full items-center gap-2 rounded-xl border border-accent/30 bg-accent/10 px-3 py-2.5 text-sm text-accent transition-all hover:bg-accent/15 hover:shadow-glow-sm",
            collapsed && "justify-center",
          )}
        >
          <Download className="h-4 w-4 shrink-0" />
          {!collapsed && <span>Download Resume</span>}
        </button>
      </div>
    </div>
  );
}

interface SidebarProps {
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export function Sidebar({ mobileOpen, onCloseMobile }: SidebarProps) {
  const { settings, update } = useSettings();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const collapsed = settings.sidebarCollapsed && isDesktop;

  return (
    <>
      {/* Desktop */}
      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 76 : 260 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="sticky top-0 z-40 hidden h-screen shrink-0 border-r border-line bg-surface lg:block"
      >
        <SidebarContent variant="desktop" collapsed={collapsed} />
        <button
          onClick={() => update("sidebarCollapsed", !settings.sidebarCollapsed)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="absolute top-7 -right-3 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-line bg-surface text-muted transition-all hover:text-accent hover:shadow-glow-sm"
        >
          <ChevronLeft
            className={cn(
              "h-3.5 w-3.5 transition-transform",
              collapsed && "rotate-180",
            )}
          />
        </button>
      </motion.aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && !isDesktop && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50"
              onClick={onCloseMobile}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 left-0 z-50 w-65 border-r border-line bg-surface"
            >
              <SidebarContent
                variant="mobile"
                collapsed={false}
                onClose={onCloseMobile}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
