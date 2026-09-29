import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Info } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { skillCategories, skills } from '@/data/skills';
import { cn } from '@/lib/utils';
import type { Skill } from '@/types';

const ROW_COUNT = 3;
const COPIES = [0, 1, 2, 3];

const rows = Array.from({ length: ROW_COUNT }, (_, rowIndex) =>
  skills.filter((_, i) => i % ROW_COUNT === rowIndex)
);

function SkillBar({ skill, delay }: { skill: Skill; delay: number }) {
  const Icon = skill.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.3 }}
      className="flex items-center gap-4 rounded-xl p-3 transition-colors hover:bg-surface-2"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="mb-1.5 flex justify-between">
          <span className="text-sm font-medium text-foreground">{skill.name}</span>
          <span className="text-xs text-dim">{skill.proficiency}%</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-surface-2">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.proficiency}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: 'easeOut', delay: delay + 0.2 }}
            className="h-full rounded-full bg-accent"
          />
        </div>
      </div>
    </motion.div>
  );
}

function MarqueeRow({ items, reverse }: { items: Skill[]; reverse: boolean }) {
  return (
    <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div
        className={cn(
          'flex w-max animate-marquee group-hover/marquee:[animation-play-state:paused]',
          reverse && '[animation-direction:reverse]'
        )}
      >
        {COPIES.map((copy) => (
          <div key={copy} className="flex gap-4 pr-4" aria-hidden={copy > 0}>
            {items.map((skill) => {
              const Icon = skill.icon;
              return (
                <div
                  key={`${copy}-${skill.id}`}
                  className="flex shrink-0 items-center gap-2.5 rounded-xl border border-line bg-surface-2 px-4 py-2.5 transition-[border-color,box-shadow] hover:border-accent/30 hover:shadow-glow-sm"
                >
                  <Icon className="h-4 w-4 text-accent" />
                  <span className="text-sm whitespace-nowrap text-foreground">{skill.name}</span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Skills() {
  const [showCarousel, setShowCarousel] = useState(false);

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-foreground">Skills & Expertise</h2>
          <p className="mt-1 text-sm text-muted">Technologies I work with every day</p>
        </div>

        <div className="group/tip relative">
          <span className="pointer-events-none absolute top-1/2 right-full mr-2 hidden -translate-y-1/2 rounded-lg border border-line bg-surface-2 px-2.5 py-1.5 text-xs whitespace-nowrap text-muted opacity-0 transition-opacity group-hover/tip:opacity-100 sm:block">
            Click to view skills carousel
          </span>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowCarousel((v) => !v)}
            aria-label="Toggle skills carousel"
            aria-expanded={showCarousel}
            className={cn(
              'flex h-11 w-11 items-center justify-center rounded-xl border border-accent/30 text-accent shadow-glow-sm transition-[background-color,box-shadow] hover:shadow-glow-md',
              showCarousel ? 'bg-accent/20' : 'bg-accent/10'
            )}
          >
            <Info className="h-5 w-5" />
          </motion.button>
        </div>
      </div>

      {/* Carousel (hidden until the info button is clicked) */}
      <AnimatePresence initial={false}>
        {showCarousel && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="rounded-2xl border border-line bg-surface p-6 shadow-card">
              <div className="group/marquee space-y-3">
                {rows.map((items, i) => (
                  <MarqueeRow key={i} items={items} reverse={i % 2 === 1} />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid by category */}
      {skillCategories.map((category, catIndex) => (
        <Card key={category} delay={catIndex * 0.08} className="p-6">
          <h3 className="mb-4 flex items-center gap-2 font-semibold text-foreground">
            <span className="h-5 w-1 rounded-full bg-accent" />
            {category}
          </h3>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {skills
              .filter((s) => s.category === category)
              .map((s, i) => (
                <SkillBar key={s.id} skill={s} delay={i * 0.05} />
              ))}
          </div>
        </Card>
      ))}
    </div>
  );
}