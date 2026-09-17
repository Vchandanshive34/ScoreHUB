/**
 * Where the backend lives.
 *
 * In development Vite reads these from `.env.local`; in CI they are build-time
 * variables. They are baked into the bundle at build time — a static site has
 * no server to read them at runtime — so changing a URL means rebuilding.
 */

function required(value: string | undefined, name: string, fallback: string): string {
  if (value && value.trim()) return value.trim().replace(/\/+$/, '');
  if (import.meta.env.DEV) return fallback;
  // Fail loudly in a production build rather than silently calling the wrong host.
  console.error(
    `[scorehub] ${name} is not set. The app will call ${fallback}, which is almost certainly wrong.`,
  );
  return fallback;
}

export const API_URL = required(
  import.meta.env.VITE_API_URL,
  'VITE_API_URL',
  'http://localhost:3000',
);

export const SOCKET_URL = required(
  import.meta.env.VITE_SOCKET_URL,
  'VITE_SOCKET_URL',
  'http://localhost:4000',
);
