import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Check, Moon, PanelLeft, Palette, RotateCcw, Sparkles, Sun, Type, ZapOff } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useSettings } from '@/hooks/useSettings';
import { accentPresets } from '@/lib/settings-context';
import { cn } from '@/lib/utils';

function SettingRow({
  icon,
  title,
  description,
  children,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-line bg-surface-2 p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
          {icon}
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">{title}</p>
          <p className="text-xs text-dim">{description}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

function Segmented<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T;
  options: readonly T[];
  onChange: (value: T) => void;
}) {
  return (
    <div className="flex gap-2">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onChange(option)}
          className={cn(
            'rounded-lg px-3 py-1.5 text-sm capitalize transition-all',
            value === option
              ? 'bg-accent font-medium text-bg shadow-glow-sm'
              : 'border border-line bg-surface text-muted hover:text-foreground'
          )}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      role="switch"
      aria-checked={checked}
      aria-label={label}
      className={cn(
        'relative h-6 w-12 shrink-0 rounded-full transition-colors',
        checked ? 'bg-accent shadow-glow-sm' : 'border border-line bg-surface'
      )}
    >
      <motion.span
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className={cn('absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm', checked ? 'left-6' : 'left-0.5')}
      />
    </button>
  );
}

export function SettingsPage() {
  const { settings, update, reset } = useSettings();

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">Settings</h2>
          <p className="mt-1 text-sm text-muted">Customize your experience</p>
        </div>
        <Button variant="secondary" size="sm" icon={<RotateCcw className="h-3.5 w-3.5" />} onClick={reset}>
          Reset
        </Button>
      </div>

      {/* Appearance */}
      <Card className="p-6">
        <h3 className="mb-4 flex items-center gap-2 font-semibold text-foreground">
          <Palette className="h-4 w-4 text-accent" />
          Appearance
        </h3>
        <div className="space-y-3">
          <SettingRow
            icon={settings.theme === 'dark' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            title="Theme"
            description="Dark or light mode"
          >
            <Segmented
              value={settings.theme}
              options={['dark', 'light'] as const}
              onChange={(v) => update('theme', v)}
            />
          </SettingRow>

          <div className="rounded-xl border border-line bg-surface-2 p-4">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Accent Color</p>
                <p className="text-xs text-dim">Pick a preset or choose your own</p>
              </div>
              <input
                type="color"
                value={settings.accentColor}
                onChange={(e) => update('accentColor', e.target.value)}
                className="h-10 w-10 cursor-pointer rounded-lg border border-line bg-transparent"
                aria-label="Custom accent color"
              />
            </div>
            <div className="flex flex-wrap gap-2.5">
              {accentPresets.map((color) => {
                const active = settings.accentColor.toLowerCase() === color;
                return (
                  <button
                    key={color}
                    onClick={() => update('accentColor', color)}
                    aria-label={`Use accent ${color}`}
                    style={{ backgroundColor: color }}
                    className={cn(
                      'flex h-9 w-9 items-center justify-center rounded-xl transition-all',
                      active
                        ? 'scale-110 ring-2 ring-accent ring-offset-2 ring-offset-surface-2'
                        : 'hover:scale-110'
                    )}
                  >
                    {active && <Check className="h-4 w-4 text-white" />}
                  </button>
                );
              })}
            </div>
          </div>

          <SettingRow icon={<Type className="h-5 w-5" />} title="Font Size" description="Adjust text scale">
            <Segmented
              value={settings.fontSize}
              options={['sm', 'md', 'lg'] as const}
              onChange={(v) => update('fontSize', v)}
            />
          </SettingRow>
        </div>
      </Card>

      {/* Effects */}
      <Card delay={0.1} className="p-6">
        <h3 className="mb-4 flex items-center gap-2 font-semibold text-foreground">
          <Sparkles className="h-4 w-4 text-accent" />
          Effects & Animations
        </h3>
        <div className="space-y-3">
          <SettingRow
            icon={<Sparkles className="h-5 w-5" />}
            title="Glow Effects"
            description="Soft accent glow on interactive elements"
          >
            <Toggle
              checked={settings.glowEnabled}
              onChange={(v) => update('glowEnabled', v)}
              label="Glow effects"
            />
          </SettingRow>
          <SettingRow
            icon={<ZapOff className="h-5 w-5" />}
            title="Reduce Animations"
            description="Minimize motion for comfort or performance"
          >
            <Toggle
              checked={settings.reduceAnimations}
              onChange={(v) => update('reduceAnimations', v)}
              label="Reduce animations"
            />
          </SettingRow>
        </div>
      </Card>

      {/* Sidebar */}
      <Card delay={0.15} className="p-6">
        <h3 className="mb-4 flex items-center gap-2 font-semibold text-foreground">
          <PanelLeft className="h-4 w-4 text-accent" />
          Sidebar
        </h3>
        <SettingRow
          icon={<PanelLeft className="h-5 w-5" />}
          title="Collapsed by Default"
          description="Show only icons in the sidebar"
        >
          <Toggle
            checked={settings.sidebarCollapsed}
            onChange={(v) => update('sidebarCollapsed', v)}
            label="Collapse sidebar"
          />
        </SettingRow>
      </Card>
    </div>
  );
}