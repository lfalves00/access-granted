import { CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";

const REGISTER_URL = "https://bet7k.com/register";

export const SuccessState = () => {
  const [phase, setPhase] = useState(0); // 0=icon, 1=cards, 2=cta

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 500);
    const t2 = setTimeout(() => setPhase(2), 900);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const expiry = new Date(Date.now() + 48 * 60 * 60 * 1000);
  const expiryStr = expiry.toLocaleDateString("es-CL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <div className="flex flex-col items-center gap-5">
      {/* Success icon with pulse ring */}
      <div className="relative animate-scale-in">
        <div className="absolute inset-0 rounded-full bg-success/20 animate-ping" style={{ animationDuration: "1.5s", animationIterationCount: "2" }} />
        <div className="relative w-14 h-14 rounded-full bg-success/10 flex items-center justify-center border border-success/20">
          <CheckCircle2 className="w-7 h-7 text-success" />
        </div>
      </div>

      <div className="text-center space-y-1 animate-fade-in">
        <h2 className="text-base font-semibold text-foreground">Configuración aplicada</h2>
        <p className="text-xs text-muted-foreground">
          Cuenta pre-configurada como Influencer.
        </p>
      </div>

      {/* Status cards */}
      <div className={`w-full space-y-3 transition-all duration-500 ease-out ${
        phase >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
      }`}>
        <div className="w-full rounded-xl bg-secondary/50 border border-primary/15 p-4 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Estado</span>
            <span className="text-xs font-medium text-success flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
              Activo
            </span>
          </div>
          <div className="h-px bg-border/50" />
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Nivel</span>
            <span className="text-xs font-semibold text-primary">Influencer · 5x</span>
          </div>
          <div className="h-px bg-border/50" />
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Duración</span>
            <span className="text-xs font-mono text-secondary-foreground">48h desde registro</span>
          </div>
          <div className="h-px bg-border/50" />
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Expira</span>
            <span className="text-xs font-mono text-secondary-foreground">{expiryStr}</span>
          </div>
          <div className="h-px bg-border/50" />
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Post-expiración</span>
            <span className="text-xs text-secondary-foreground">Nivel estándar · cuenta activa</span>
          </div>
        </div>

        {/* Summary badge */}
        <div className="w-full rounded-lg bg-primary/5 border border-primary/10 px-4 py-3">
          <p className="text-xs text-foreground/70 leading-relaxed">
            Multiplicador <span className="text-primary font-semibold">5x</span> activo por <span className="font-semibold text-foreground">48h</span>. Crea tu cuenta y deposita para vincular.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className={`w-full space-y-2 transition-all duration-500 ease-out ${
        phase >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      }`}>
        <a
          href={REGISTER_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3.5 rounded-xl bg-success text-success-foreground font-semibold text-sm text-center
                     active:scale-[0.98] transition-transform duration-100 glow-success block"
        >
          Crear cuenta configurada
        </a>
        <p className="text-[10px] text-muted-foreground/40 text-center">
          Redirige al entorno de registro seguro
        </p>
      </div>
    </div>
  );
};
