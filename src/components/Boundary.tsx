import { Component, type ErrorInfo, type ReactNode } from 'react';
import { API_URL, IS_UNCONFIGURED } from '@/lib/config';

/**
 * Catches anything thrown while rendering so a mistake shows a readable page
 * rather than an empty one. A blank screen on a static host is the hardest
 * failure to diagnose — it looks identical whether the bundle is missing, the
 * config is wrong, or a component threw.
 */
export class Boundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state: { error: Error | null } = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[scorehub] render failed', error, info.componentStack);
  }

  render() {
    if (!this.state.error) return this.props.children;

    return (
      <div className="mx-auto max-w-xl px-6 py-24">
        <div className="ss-card">
          <h1 className="text-lg font-bold text-white">ScoreHUB could not start</h1>
          <p className="mt-3 text-sm text-slate-300">{this.state.error.message}</p>
          <button
            type="button"
            className="ss-btn-primary mt-6"
            onClick={() => window.location.reload()}
          >
            Reload
          </button>
        </div>
      </div>
    );
  }
}

/** Shown when no backend URL has been set, instead of failing on every call. */
export function SetupNotice() {
  if (!IS_UNCONFIGURED) return null;

  return (
    <div className="border-b border-amber-500/40 bg-amber-500/10 px-6 py-3 text-center text-xs text-amber-200">
      No backend configured — edit <code className="font-semibold">config.js</code> beside
      index.html and set <code className="font-semibold">apiUrl</code> and{' '}
      <code className="font-semibold">socketUrl</code>. Currently calling {API_URL}.
    </div>
  );
}
