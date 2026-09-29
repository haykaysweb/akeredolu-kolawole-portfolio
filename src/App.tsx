import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { SettingsProvider } from "@/lib/SettingsProvider";
import { useSettings } from "@/hooks/useSettings";
import { Layout } from "@/components/layout/Layout";
import { Overview } from "@/pages/Overview";
import { About } from "@/pages/About";
import { Skills } from "@/pages/Skills";
import { TechStack } from "@/pages/TechStack";
import { Projects } from "@/pages/Projects";
import { Experience } from "@/pages/Experience";
import { Services } from "@/pages/Services";
// import { Testimonials } from '@/pages/Testimonials';
import { Contact } from "@/pages/Contact";
import { SettingsPage } from "@/pages/Settings";
import { NotFound } from "@/pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: { mutations: { retry: 0 } },
});

function ThemedToaster() {
  const { settings } = useSettings();
  return (
    <Toaster
      theme={settings.theme}
      position="bottom-right"
      toastOptions={{
        style: {
          background: "var(--c-surface)",
          border: "1px solid var(--c-line)",
          color: "var(--c-text)",
          borderRadius: "12px",
        },
      }}
    />
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SettingsProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Overview />} />
              <Route path="about" element={<About />} />
              <Route path="skills" element={<Skills />} />
              <Route path="tech-stack" element={<TechStack />} />
              <Route path="projects" element={<Projects />} />
              <Route path="experience" element={<Experience />} />
              <Route path="services" element={<Services />} />
              {/* <Route path="testimonials" element={<Testimonials />} /> */}
              <Route path="contact" element={<Contact />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <ThemedToaster />
      </SettingsProvider>
    </QueryClientProvider>
  );
}
