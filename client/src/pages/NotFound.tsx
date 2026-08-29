import { ArrowUpRight } from "lucide-react";
import { useLocation } from "wouter";
import { SunexMark } from "./components/sunex/SunexMark";

export default function NotFound() {
  const [, setLocation] = useLocation();

  const handleGoHome = () => {
    setLocation("/");
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative bg-[var(--background)] p-6 overflow-hidden">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[40vw] h-[40vw] rounded-full bg-[var(--sunex-orange)] opacity-[0.03] blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[50vw] h-[50vw] rounded-full bg-[#1e40af] opacity-[0.02] blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-lg text-center flex flex-col items-center">
        <div className="mb-12">
          <SunexMark showLockup />
        </div>

        <p className="eyebrow" style={{ marginBottom: 12 }}>Error 404</p>
        <h1 className="display" style={{ fontSize: 'clamp(48px, 8vw, 72px)', margin: '0 0 16px 0', lineHeight: 1.1 }}>
          Page not <br/><em>found.</em>
        </h1>

        <p className="copy" style={{ maxWidth: '400px', margin: '0 auto 40px auto', fontSize: '16px', color: 'var(--muted-foreground)' }}>
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        <button 
          onClick={handleGoHome}
          className="rivr-pill rivr-pill--dark"
          style={{ padding: '16px 32px', fontSize: '15px' }}
        >
          Return to homepage <span><ArrowUpRight className="sunex-action-glyph" size={16} /></span>
        </button>
      </div>
    </div>
  );
}
