import { useState, useEffect, useCallback } from "react";
import { StatusBar } from "@/components/StatusBar";
import { IdleState } from "@/components/IdleState";
import { LoadingState } from "@/components/LoadingState";
import { SuccessState } from "@/components/SuccessState";
import { PostConfirmState } from "@/components/PostConfirmState";

type AppState = "idle" | "confirm" | "loading" | "success";

const Index = () => {
  const [state, setState] = useState<AppState>("idle");
  const [showPostConfirm, setShowPostConfirm] = useState(false);
  const [sessionId] = useState(() => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    return Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  });

  const handleActivate = useCallback(() => {
    setState("confirm");
  }, []);

  const handleConfirm = useCallback(() => {
    setState("loading");
  }, []);

  const handlePostConfirm = useCallback(() => {
    setShowPostConfirm(false);
    setTimeout(() => setState("success"), 300);
  }, []);

  useEffect(() => {
    if (state === "loading") {
      const timer = setTimeout(() => setShowPostConfirm(true), 5700);
      return () => clearTimeout(timer);
    }
  }, [state]);

  return (
    <div className="flex flex-col min-h-[100dvh] bg-background px-5 py-4 max-w-[430px] mx-auto select-none relative">
      <StatusBar sessionId={sessionId} />
      <main className="flex-1 flex flex-col justify-center">
        {state === "idle" && <IdleState onActivate={handleActivate} />}
        {state === "confirm" && (
          <div className="animate-fade-in">
            <ConfirmState onConfirm={handleConfirm} />
          </div>
        )}
        {state === "loading" && <LoadingState />}
        {state === "success" && <SuccessState />}
      </main>

      {/* Post-confirm modal overlay */}
      {showPostConfirm && (
        <div className="absolute inset-0 z-50 flex items-center justify-center animate-overlay-in">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
          <div className="relative z-10 w-full px-5 animate-modal-in">
            <PostConfirmState onConfirm={handlePostConfirm} />
          </div>
        </div>
      )}
      <footer className="pb-2 pt-4">
        <div className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground/40">
          <svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1a7 7 0 100 14A7 7 0 008 1zm0 1.2a5.8 5.8 0 110 11.6A5.8 5.8 0 018 2.2zm0 1.8a1 1 0 00-1 1v3.6l-2.1 1.2a1 1 0 001 1.7l2.6-1.5A1 1 0 009 9V5a1 1 0 00-1-1z"/></svg>
          <span>Entorno seguro · v4.2.1</span>
        </div>
      </footer>
    </div>
  );
};

/* ---------- Confirm State (micro-disclaimers) ---------- */
import { useState as useS } from "react";
import bet7kLogo from "@/assets/bet7k-logo.png";

const ConfirmState = ({ onConfirm }: { onConfirm: () => void }) => {
  const [checks, setChecks] = useS([false, false]);

  const toggle = (i: number) =>
    setChecks((prev) => prev.map((v, idx) => (idx === i ? !v : v)) as [boolean, boolean]);

  const allChecked = checks.every(Boolean);

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center border border-border overflow-hidden">
        <img src={bet7kLogo} alt="" className="w-9 h-9 object-contain" />
      </div>

      <div className="text-center space-y-1.5">
        <h2 className="text-base font-semibold text-foreground">Confirmar activación</h2>
        <p className="text-xs text-muted-foreground">Revisa y acepta antes de continuar.</p>
      </div>

      <div className="w-full space-y-3">
        {/* Disclaimer 1 */}
        <button
          type="button"
          onClick={() => toggle(0)}
          className={`w-full flex items-start gap-3 rounded-xl border p-3.5 text-left transition-all duration-200 ${
            checks[0]
              ? "border-primary/30 bg-primary/5"
              : "border-border bg-secondary/30"
          }`}
        >
          <div className={`mt-0.5 w-4 h-4 rounded flex-shrink-0 border transition-all duration-200 flex items-center justify-center ${
            checks[0] ? "bg-primary border-primary" : "border-muted-foreground/30"
          }`}>
            {checks[0] && (
              <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="hsl(var(--primary-foreground))" strokeWidth="3" strokeLinecap="round">
                <path d="M3 8.5l3.5 3.5L13 5" />
              </svg>
            )}
          </div>
          <span className="text-xs text-foreground/80 leading-relaxed">
            Entiendo que mi cuenta será creada con configuración de nivel Influencer por 48 horas.
          </span>
        </button>

        {/* Disclaimer 2 */}
        <button
          type="button"
          onClick={() => toggle(1)}
          className={`w-full flex items-start gap-3 rounded-xl border p-3.5 text-left transition-all duration-200 ${
            checks[1]
              ? "border-primary/30 bg-primary/5"
              : "border-border bg-secondary/30"
          }`}
        >
          <div className={`mt-0.5 w-4 h-4 rounded flex-shrink-0 border transition-all duration-200 flex items-center justify-center ${
            checks[1] ? "bg-primary border-primary" : "border-muted-foreground/30"
          }`}>
            {checks[1] && (
              <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="hsl(var(--primary-foreground))" strokeWidth="3" strokeLinecap="round">
                <path d="M3 8.5l3.5 3.5L13 5" />
              </svg>
            )}
          </div>
          <span className="text-xs text-foreground/80 leading-relaxed">
            Acepto que después de 48h la cuenta continúa activa en nivel estándar.
          </span>
        </button>
      </div>

      <button
        onClick={onConfirm}
        disabled={!allChecked}
        className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
          allChecked
            ? "bg-primary text-primary-foreground active:scale-[0.98] glow-primary"
            : "bg-muted text-muted-foreground cursor-not-allowed"
        }`}
      >
        Confirmar y activar
      </button>
    </div>
  );
};

export default Index;
