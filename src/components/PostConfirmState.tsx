import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

export const PostConfirmState = ({ onConfirm }: { onConfirm: () => void }) => {
  const [accepted, setAccepted] = useState(false);

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Success indicator */}
      <div className="relative animate-scale-in">
        <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center border border-success/20">
          <CheckCircle2 className="w-6 h-6 text-success" />
        </div>
      </div>

      <div className="text-center space-y-1.5">
        <h2 className="text-base font-semibold text-foreground">Configuración lista</h2>
        <p className="text-xs text-muted-foreground">Revisa el resumen antes de continuar.</p>
      </div>

      {/* Summary card */}
      <div className="w-full rounded-xl bg-secondary/50 border border-border p-4 space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Nivel asignado</span>
          <span className="text-xs font-semibold text-primary">Influencer · 5x</span>
        </div>
        <div className="h-px bg-border/50" />
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Duración</span>
          <span className="text-xs font-mono text-secondary-foreground">48 horas</span>
        </div>
        <div className="h-px bg-border/50" />
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Post-expiración</span>
          <span className="text-xs text-secondary-foreground">Nivel estándar</span>
        </div>
      </div>

      {/* Acceptance checkbox */}
      <button
        type="button"
        onClick={() => setAccepted((v) => !v)}
        className={`w-full flex items-start gap-3 rounded-xl border p-3.5 text-left transition-all duration-200 ${
          accepted
            ? "border-success/30 bg-success/5"
            : "border-border bg-secondary/30"
        }`}
      >
        <div className={`mt-0.5 w-4 h-4 rounded flex-shrink-0 border transition-all duration-200 flex items-center justify-center ${
          accepted ? "bg-success border-success" : "border-muted-foreground/30"
        }`}>
          {accepted && (
            <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="hsl(var(--success-foreground))" strokeWidth="3" strokeLinecap="round">
              <path d="M3 8.5l3.5 3.5L13 5" />
            </svg>
          )}
        </div>
        <span className="text-xs text-foreground/80 leading-relaxed">
          Confirmo que la configuración fue aplicada y deseo continuar al registro.
        </span>
      </button>

      <button
        onClick={onConfirm}
        disabled={!accepted}
        className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
          accepted
            ? "bg-success text-success-foreground active:scale-[0.98] glow-success"
            : "bg-muted text-muted-foreground cursor-not-allowed"
        }`}
      >
        Continuar
      </button>
    </div>
  );
};
