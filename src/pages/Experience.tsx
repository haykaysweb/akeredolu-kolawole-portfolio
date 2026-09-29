import { motion } from 'framer-motion';
import { Briefcase, GraduationCap } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { experience } from '@/data/experience';
import { cn } from '@/lib/utils';

export function Experience() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground">Experience & Education</h2>
        <p className="mt-1 text-sm text-muted">My professional journey</p>
      </div>

      <Card className="p-6 lg:p-8">
        <div className="relative">
          <div className="absolute top-2 bottom-2 left-5 w-px bg-line" />
          <div className="space-y-8">
            {experience.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="relative pl-14"
              >
                <div
                  className={cn(
                    'absolute top-0.5 left-0 flex h-10 w-10 items-center justify-center rounded-xl border border-line',
                    exp.type === 'education' ? 'bg-blue-500/10 text-blue-400' : 'bg-accent/10 text-accent'
                  )}
                >
                  {exp.type === 'education' ? (
                    <GraduationCap className="h-5 w-5" />
                  ) : (
                    <Briefcase className="h-5 w-5" />
                  )}
                </div>
                <div className="mb-2">
                  <div className="flex flex-wrap items-baseline gap-2">
                    <h3 className="font-semibold text-foreground">{exp.role}</h3>
                    <span className="text-sm text-accent">{exp.company}</span>
                  </div>
                  <p className="text-xs text-dim">
                    {exp.startDate} - {exp.endDate}
                  </p>
                </div>
                <p className="mb-3 text-sm text-muted">{exp.description}</p>
                <ul className="space-y-1.5">
                  {exp.achievements.map((a) => (
                    <li key={a} className="flex items-start gap-2 text-sm text-dim">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {a}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}