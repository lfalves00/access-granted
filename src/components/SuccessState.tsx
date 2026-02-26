import { CheckCircle2 } from "lucide-react";

const REGISTER_URL = "https://bet7k.com/register";

export const SuccessState = () => {
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
    <div className="flex flex-col items-center gap-6 animate-scale-in">
      {/* Success icon */}
      <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center glow-success">
        <CheckCircle2 className="w-8 h-8 text-success" />
      </div>

      <div className="text-center space-y-1.5">
        <h2 className="text-lg font-semibold text-foreground">Configuración aplicada</h2>
        <p className="text-sm text-muted-foreground">
          Módulo WL-Influencer activo en tu sesión.
        </p>
      </div>

      {/* Status card */}
      <div className="w-full rounded-xl bg-secondary/50 border border-border-glow border-primary/20 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Estado</span>
          <span className="text-xs font-medium text-success flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-success" />
            Activo
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Ventana</span>
          <span className="text-xs font-mono text-secondary-foreground">48 horas</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Expira</span>
          <span className="text-xs font-mono text-secondary-foreground">{expiryStr}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Nivel de pago</span>
          <span className="text-xs font-medium text-primary">Aumentado</span>
        </div>
      </div>

      {/* Info */}
      <div className="w-full rounded-lg bg-muted/50 border border-border px-4 py-3">
        <p className="text-xs text-muted-foreground leading-relaxed">
          Crea tu cuenta y realiza tu primer depósito dentro de las próximas 48 horas para mantener el nivel de pago configurado.
        </p>
      </div>

      {/* CTA */}
      <a
        href={REGISTER_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full py-3.5 rounded-xl bg-success text-success-foreground font-semibold text-sm text-center
                   active:scale-[0.98] transition-transform duration-100 glow-success block"
      >
        Continuar al registro
      </a>

      <p className="text-[11px] text-muted-foreground/40 text-center">
        Serás redirigido al entorno de registro seguro
      </p>
    </div>
  );
};
