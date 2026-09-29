export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
  _gotcha?: string; // honeypot field for spam bots, real users never fill this
}

const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT as string | undefined;

export async function sendContactMessage(payload: ContactPayload) {
  if (!FORMSPREE_ENDPOINT) {
    throw new Error('The contact form is not configured yet.');
  }

  const response = await fetch(FORMSPREE_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    // `_subject` becomes the subject line of the email received
    body: JSON.stringify({ ...payload, _subject: payload.subject }),
  });

  const result = (await response.json().catch(() => null)) as {
    errors?: { message: string }[];
    error?: string;
  } | null;

  if (!response.ok) {
    throw new Error(
      result?.errors?.[0]?.message ?? result?.error ?? 'Something went wrong. Please try again.'
    );
  }

  return result;
}