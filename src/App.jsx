import React, { Suspense, useState } from 'react';

// Keep the large Three.js landing screen out of the Bug Arena download path.
// Event participants now load only the arena chunk instead of waiting for the
// animated home page, particle system, and gallery assets first.
const LandingPage = React.lazy(() => import('./components/LandingPage'));
const RedirectPortal = React.lazy(() => import('./components/RedirectPortal'));
const BugArena = React.lazy(() => import('./components/BugArena'));

function App() {
  const [redirectTarget, setRedirectTargetState] = useState(() => {
    try {
      const saved = sessionStorage.getItem('active_redirect_target');
      if (saved) return saved;
      if (window.location.hash) {
        const hash = window.location.hash.replace('#', '');
        if (['bugarena', 'events', 'hackathons', 'puzzles', 'learning', 'family'].includes(hash)) {
          return hash;
        }
      }
    } catch {}
    return null;
  });

  const setRedirectTarget = (target) => {
    setRedirectTargetState(target);
    try {
      if (target) {
        sessionStorage.setItem('active_redirect_target', target);
      } else {
        sessionStorage.removeItem('active_redirect_target');
      }
    } catch {}
  };

  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#070711', color: '#00ffff', fontFamily: 'system-ui' }}>Loading…</div>}>
      {redirectTarget
        ? redirectTarget === 'bugarena'
          ? <BugArena onAbort={() => setRedirectTarget(null)} />
          : <RedirectPortal target={redirectTarget} onAbort={() => setRedirectTarget(null)} />
        : <LandingPage onNavigate={setRedirectTarget} />}
    </Suspense>
  );
}

export default App;
