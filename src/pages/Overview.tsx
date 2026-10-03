import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Download, FolderGit2, Mail, TrendingUp } from 'lucide-react';
import {
  Area,
  AreaChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useCountUp } from '@/hooks/useCountUp';
import { downloadResume } from '@/lib/resume';
import { personal } from '@/data/personal';
import { skills } from '@/data/skills';
import { projects } from '@/data/projects';
import { experience } from '@/data/experience';
import type { Stat } from '@/types';

function StatCard({ stat, index }: { stat: Stat; index: number }) {
  const count = useCountUp(stat.value, 1400 + index * 200);
  const Icon = stat.icon;
  return (
    <Card hover delay={index * 0.08} className="p-5">
      <div className="mb-3 flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
          <Icon className="h-5 w-5" />
        </div>
        <span className="text-2xl font-bold text-foreground">
          {count}
          <span className="text-accent">{stat.suffix}</span>
        </span>
      </div>
      <p className="text-sm text-muted">{stat.label}</p>
    </Card>
  );
}

export function Overview() {
  const navigate = useNavigate();
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);
  const topSkills = [...skills].sort((a, b) => b.proficiency - a.proficiency).slice(0, 5);
  const latestExp = experience[0];

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Hero */}
      <Card className="relative overflow-hidden p-6 lg:p-8">
        <div className="absolute top-0 right-0 hidden h-72 w-72 -translate-y-1/2 translate-x-1/4 rounded-full bg-accent/10 blur-3xl md:block" />
        <div className="relative">
          <p className="mb-2 text-sm font-medium text-accent">Welcome to my dashboard</p>
          <h2 className="mb-1 text-2xl font-bold text-foreground lg:text-3xl">I'm {personal.name}</h2>
          <p className="mb-4 text-lg text-muted">{personal.title}</p>
          <p className="mb-6 max-w-2xl leading-relaxed text-muted">{personal.bio}</p>
          <div className="flex flex-wrap gap-3">
            <Button icon={<ArrowRight className="h-4 w-4" />} onClick={() => navigate('/projects')}>
              View Projects
            </Button>
            <Button variant="outline" icon={<Mail className="h-4 w-4" />} onClick={() => navigate('/contact')}>
              Contact Me
            </Button>
            <Button variant="secondary" icon={<Download className="h-4 w-4" />} onClick={downloadResume}>
              Download Resume
            </Button>
          </div>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {personal.stats.map((stat, i) => (
          <StatCard key={stat.id} stat={stat} index={i} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card delay={0.1} className="p-6">
          <div className="mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-accent" />
            <h3 className="font-semibold text-foreground">Projects Per Year</h3>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={personal.activityData}>
              <defs>
                <linearGradient id="projectsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--c-accent)" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="var(--c-accent)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="year" stroke="var(--c-dim)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--c-dim)" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  background: 'var(--c-surface)',
                  border: '1px solid var(--c-line)',
                  borderRadius: '12px',
                  fontSize: '13px',
                }}
                labelStyle={{ color: 'var(--c-text)' }}
                itemStyle={{ color: 'var(--c-accent)' }}
              />
              <Area
                type="monotone"
                dataKey="projects"
                stroke="var(--c-accent)"
                strokeWidth={2}
                fill="url(#projectsGradient)"
                animationDuration={1200}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card delay={0.15} className="p-6">
          <h3 className="mb-4 font-semibold text-foreground">Skill Proficiency</h3>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={personal.skillRadarData}>
              <PolarGrid stroke="var(--c-dim)" strokeOpacity={0.3} />
              <PolarAngleAxis dataKey="category" tick={{ fill: 'var(--c-muted)', fontSize: 12 }} />
              <Radar
                dataKey="proficiency"
                stroke="var(--c-accent)"
                fill="var(--c-accent)"
                fillOpacity={0.3}
                strokeWidth={2}
                animationDuration={1200}
              />
            </RadarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Quick glance */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card delay={0.2} hover className="p-5">
          <h3 className="mb-4 font-semibold text-foreground">Featured Projects</h3>
          <div className="space-y-3">
            {featuredProjects.map((p) => (
              <button
                key={p.id}
                onClick={() => navigate('/projects')}
                className="group flex w-full items-center gap-3 text-left"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <FolderGit2 className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground transition-colors group-hover:text-accent">
                    {p.title}
                  </p>
                  <p className="truncate text-xs text-dim">{p.category}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-dim transition-colors group-hover:text-accent" />
              </button>
            ))}
          </div>
        </Card>

        <Card delay={0.25} hover className="p-5">
          <h3 className="mb-4 font-semibold text-foreground">Top Skills</h3>
          <div className="space-y-3">
            {topSkills.map((s) => (
              <div key={s.id}>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="text-foreground">{s.name}</span>
                  <span className="text-dim">{s.proficiency}%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-surface-2">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${s.proficiency}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="h-full rounded-full bg-accent"
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card delay={0.3} hover className="p-5">
          <h3 className="mb-4 font-semibold text-foreground">Latest Experience</h3>
          <div className="mb-4">
            <p className="text-sm font-medium text-foreground">{latestExp.role}</p>
            <p className="mb-1 text-xs text-accent">{latestExp.company}</p>
            <p className="text-xs text-dim">
              {latestExp.startDate} - {latestExp.endDate}
            </p>
            <p className="mt-2 text-sm text-muted">{latestExp.description}</p>
          </div>
          <Button variant="secondary" size="sm" onClick={() => navigate('/contact')} className="w-full">
            Get in touch
          </Button>
        </Card>
      </div>
    </div>
  );
}