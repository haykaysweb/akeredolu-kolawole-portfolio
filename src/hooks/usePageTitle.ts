import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { navItems } from '@/data/nav';
import { personal } from '@/data/personal';

export function usePageTitle() {
  const { pathname } = useLocation();
  const title = navItems.find((item) => item.path === pathname)?.label ?? 'Not Found';

  useEffect(() => {
    document.title = `${title} | ${personal.name} - ${personal.title}`;
  }, [title]);

  return title;
}