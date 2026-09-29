import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CircleAlert, House } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-accent/10 text-accent shadow-glow-sm">
          <CircleAlert className="h-10 w-10" />
        </div>
        <h1 className="mb-2 text-5xl font-bold text-foreground">404</h1>
        <p className="mb-1 text-lg text-muted">Page not found</p>
        <p className="mb-6 max-w-sm text-sm text-dim">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button icon={<House className="h-4 w-4" />} onClick={() => navigate('/')}>
          Back to Dashboard
        </Button>
      </motion.div>
    </div>
  );
}