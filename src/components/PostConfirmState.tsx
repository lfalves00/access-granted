import { useState, useEffect } from "react";
import { CheckCircle2 } from "lucide-react";

export const PostConfirmState = ({ onConfirm }: { onConfirm: () => void }) => {
  const [accepted, setAccepted] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Animated success badge */}
      <div className="relative animate-scale-in">
        <div className="absolute inset-0 rounded-full bg-success/20 animate-ping" style={{ animationDuration: "1.5s", animationIterationCount: "2" }} />
        <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center border border-success/20">
          <CheckCircle2 className="w-6 h-6 text-success" />
        </div>
      </div>

      <div className="text-center space-y-1.5 animate-fade-in">
        <h2 className="text-base font-semibold text-foreground">Configuración aplicada</h2>
        <p className="text-xs text-muted-foreground">Tu cuenta quedará con multiplicador <span className="text-primary font-semibold">5x</span> activo por <span className="font-semibold text-foreground">48h</span> desde el registro.</p>
      </div>

      {/* Checkbox */}
      <div className={`w-full transition-all duration-500 ease-out ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
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
            Entiendo que al crear mi cuenta ahora, el multiplicador 5x se vincula automáticamente por 48 horas.
          </span>
        </button>
      </div>

      <div className={`w-full transition-all duration-500 ease-out delay-100 ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
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
    </div>
  );
};
