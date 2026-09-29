import { Download, Globe, Mail, MapPin, Phone } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { personal } from '@/data/personal';
import { downloadResume } from '@/lib/resume';
import { getInitials } from '@/lib/utils';

export function About() {
  return (
    <div className="mx-auto max-w-5xl">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Profile */}
        <Card className="p-6 lg:col-span-1">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-28 w-28 items-center justify-center rounded-2xl bg-accent/10 text-3xl font-bold text-accent shadow-glow-sm">
              {getInitials(personal.name)}
            </div>
            <h2 className="text-xl font-bold text-foreground">{personal.name}</h2>
            <p className="mb-3 text-sm text-accent">{personal.title}</p>
            <div className="flex items-center gap-1.5 text-sm text-muted">
              <MapPin className="h-4 w-4" />
              {personal.location}
            </div>
          </div>

          <div className="mt-6 space-y-3 border-t border-line pt-6">
            <a
              href={`mailto:${personal.email}`}
              className="flex items-center gap-3 text-sm text-muted transition-colors hover:text-accent"
            >
              <Mail className="h-4 w-4 shrink-0" />
              <span className="truncate">{personal.email}</span>
            </a>
            <div className="flex items-center gap-3 text-sm text-muted">
              <Phone className="h-4 w-4 shrink-0" />
              {personal.phone}
            </div>
            <div className="flex items-center gap-3 text-sm text-muted">
              <Globe className="h-4 w-4 shrink-0" />
              {personal.languages.join(', ')}
            </div>
          </div>

          <div className="mt-6 border-t border-line pt-6">
            <p className="mb-2 text-xs font-medium text-foreground">Interests</p>
            <div className="flex flex-wrap gap-2">
              {personal.interests.map((interest) => (
                <span
                  key={interest}
                  className="rounded-lg border border-line bg-surface-2 px-2.5 py-1 text-xs text-muted"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>

          <Button className="mt-6 w-full" icon={<Download className="h-4 w-4" />} onClick={downloadResume}>
            Download Resume
          </Button>
        </Card>

        {/* Bio */}
        <Card delay={0.1} className="p-6 lg:col-span-2">
          <h3 className="mb-4 text-lg font-semibold text-foreground">About Me</h3>
          <p className="mb-6 leading-relaxed text-muted">{personal.longBio}</p>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {personal.stats.map((s) => (
              <div key={s.id} className="rounded-xl border border-line bg-surface-2 p-3 text-center">
                <p className="text-2xl font-bold text-accent">
                  {s.value}
                  {s.suffix}
                </p>
                <p className="mt-1 text-xs text-dim">{s.label}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}