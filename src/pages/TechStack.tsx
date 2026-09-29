import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { skillCategories, skills } from '@/data/skills';
import type { SkillCategory } from '@/types';

const layerMeta: Record<SkillCategory, { color: string; description: string }> = {
  Frontend: { color: 'text-accent', description: 'User interface and experience' },
  Backend: { color: 'text-blue-400', description: 'Server logic and APIs' },
  Database: { color: 'text-amber-400', description: 'Data persistence' },
  'Tools & Design': { color: 'text-purple-400', description: 'Workflow, testing and design' },
};

export function TechStack() {
  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground">Tech Stack</h2>
        <p className="mt-1 text-sm text-muted">Technologies organized by layer</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {skillCategories.map((category, catIndex) => {
          const catSkills = skills.filter((s) => s.category === category);
          const meta = layerMeta[category];
          return (
            <Card key={category} delay={catIndex * 0.08} className="p-6">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h3 className={`font-semibold ${meta.color}`}>{category}</h3>
                  <p className="mt-0.5 text-xs text-dim">{meta.description}</p>
                </div>
                <span className="rounded-lg border border-line bg-surface-2 px-2.5 py-1 text-xs text-muted">
                  {catSkills.length} tools
                </span>
              </div>
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                {catSkills.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <motion.div
                      key={s.id}
                      title={`${s.name} - ${s.proficiency}%`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.04 }}
                      whileHover={{ scale: 1.08, y: -2 }}
                      className="flex cursor-default flex-col items-center gap-2 rounded-xl border border-line bg-surface-2 p-3 transition-[border-color,box-shadow] hover:border-accent/30 hover:shadow-glow-sm"
                    >
                      <Icon className={`h-6 w-6 ${meta.color}`} />
                      <span className="text-center text-xs leading-tight text-muted">{s.name}</span>
                    </motion.div>
                  );
                })}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}