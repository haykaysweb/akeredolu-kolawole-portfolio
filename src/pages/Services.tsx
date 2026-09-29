import { useNavigate } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { services } from '@/data/services';

export function Services() {
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground">Services</h2>
        <p className="mt-1 text-sm text-muted">What I can do for you</p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {services.map((s, i) => {
          const Icon = s.icon;
          return (
            <Card key={s.id} delay={i * 0.1} hover className="p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent shadow-glow-sm">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 font-semibold text-foreground">{s.title}</h3>
              <p className="mb-4 text-sm leading-relaxed text-muted">{s.description}</p>
              <ul className="mb-5 space-y-2">
                {s.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-dim">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-accent/10">
                      <Check className="h-3 w-3 text-accent" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                variant="secondary"
                size="sm"
                icon={<ArrowRight className="h-3.5 w-3.5" />}
                onClick={() => navigate('/contact')}
              >
                Get Started
              </Button>
            </Card>
          );
        })}
      </div>
    </div>
  );
}