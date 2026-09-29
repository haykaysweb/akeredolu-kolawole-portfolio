import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { useForm, type UseFormRegisterReturn } from "react-hook-form";
import { toast } from "sonner";
import { LoaderCircle, Mail, MapPin, Phone, Send } from "lucide-react";
import { FaGithub, FaLinkedinIn, FaWhatsapp } from "react-icons/fa6";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { personal } from "@/data/personal";
import { sendContactMessage, type ContactPayload } from "@/lib/contact";
import { cn } from "@/lib/utils";

const emptyForm: ContactPayload = {
  name: "",
  email: "",
  subject: "",
  message: "",
  _gotcha: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Rejects empty or whitespace-only values
const required = (label: string) => (value: string) =>
  value.trim().length > 0 || `${label} is required`;

const contactCards = [
  {
    icon: Mail,
    label: "Email",
    value: personal.email,
    href: `mailto:${personal.email}`,
  },
  {
    icon: Phone,
    label: "Phone",
    value: personal.phone,
    href: `tel:${personal.phone}`,
  },
  {
    icon: MapPin,
    label: "Location",
    value: personal.location,
    href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(personal.location)}`,
  },
];

const socials = [
  { icon: FaGithub, label: "GitHub", href: personal.social.github },
  { icon: FaLinkedinIn, label: "LinkedIn", href: personal.social.linkedin },
  { icon: FaWhatsapp, label: "WhatsApp", href: personal.social.whatsapp },
];

interface FieldProps {
  id: string;
  label: string;
  placeholder: string;
  registration: UseFormRegisterReturn;
  error?: string;
  type?: string;
  multiline?: boolean;
}

function Field({
  id,
  label,
  placeholder,
  registration,
  error,
  type = "text",
  multiline = false,
}: FieldProps) {
  const classes = cn(
    "w-full rounded-xl border bg-surface-2 px-4 py-2.5 text-sm text-foreground outline-none transition-all placeholder:text-dim",
    error
      ? "border-red-500/50"
      : "border-line focus:border-accent/50 focus:shadow-glow-sm",
  );

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm text-foreground">
        {label}
      </label>
      {multiline ? (
        <textarea
          id={id}
          rows={5}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          className={cn(classes, "resize-none")}
          {...registration}
        />
      ) : (
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          className={classes}
          {...registration}
        />
      )}
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
}

export function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactPayload>({ defaultValues: emptyForm });

  const { mutate, isPending } = useMutation({
    mutationFn: sendContactMessage,
    onSuccess: () => {
      toast.success("Message sent successfully! I'll get back to you soon.");
      reset();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to send message. Please try again.");
    },
  });

  const onSubmit = (values: ContactPayload) => mutate(values);

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground">Get in Touch</h2>
        <p className="mt-1 text-sm text-muted">
          Let's build something together
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="space-y-4 lg:col-span-2">
          {contactCards.map((c, i) => (
            <motion.a
              key={c.label}
              href={c.href}
              target={c.label === "Location" ? "_blank" : undefined}
              rel={c.label === "Location" ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-4 rounded-xl border border-line bg-surface p-4 transition-[border-color,box-shadow] hover:border-accent/30 hover:shadow-glow-sm"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <c.icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-dim">{c.label}</p>
                <p className="truncate text-sm text-foreground">{c.value}</p>
              </div>
            </motion.a>
          ))}

          <div className="rounded-xl border border-line bg-surface p-4">
            <p className="mb-3 text-xs text-dim">Follow me</p>
            <div className="flex gap-3">
              {socials.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={s.label}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-surface-2 text-muted transition-[color,border-color,box-shadow] hover:border-accent/30 hover:text-accent hover:shadow-glow-sm"
                >
                  <s.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <Card delay={0.1} className="p-6 lg:col-span-3">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
            noValidate
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field
                id="name"
                label="Name"
                placeholder="Your name"
                error={errors.name?.message}
                registration={register("name", { validate: required("Name") })}
              />
              <Field
                id="email"
                label="Email"
                type="email"
                placeholder="you@example.com"
                error={errors.email?.message}
                registration={register("email", {
                  required: "Email is required",
                  pattern: {
                    value: EMAIL_PATTERN,
                    message: "Invalid email address",
                  },
                })}
              />
            </div>

            <Field
              id="subject"
              label="Subject"
              placeholder="Project inquiry"
              error={errors.subject?.message}
              registration={register("subject", {
                validate: required("Subject"),
              })}
            />

            <Field
              id="message"
              label="Message"
              placeholder="Tell me about your project..."
              multiline
              error={errors.message?.message}
              registration={register("message", {
                validate: {
                  required: required("Message"),
                  minLength: (value) =>
                    value.trim().length >= 10 ||
                    "Message must be at least 10 characters",
                },
              })}
            />

            {/* Honeypot: hidden from real users, bots tend to fill it and Formspree discards those */}
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
              {...register("_gotcha")}
            />

            <Button
              type="submit"
              disabled={isPending}
              className="w-full"
              icon={
                isPending ? (
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )
              }
            >
              {isPending ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
