import { toast } from 'sonner';
import { personal } from '@/data/personal';

export function downloadResume() {
  const link = document.createElement('a');
  link.href = personal.resumeUrl;
  link.download = personal.resumeFileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  toast.success('Resume downloaded');
}