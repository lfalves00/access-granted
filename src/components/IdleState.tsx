import { Settings2 } from "lucide-react";

export const IdleState = ({ onActivate }: { onActivate: () => void }) => {
  return (
    <div className="flex flex-col items-center gap-8 animate-fade-in">
      {/* Icon */}
      <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center border border-border">
        <Settings2 className="w-7 h-7 text-primary" />
      </div>

      {/* Info */}
      <div className="text-center space-y-2">
        <h1 className="text-lg font-semibold text-foreground">
          Módulo de acceso WL
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-[280px]">
          Configura tu cuenta con nivel de pago diferenciado antes del registro.
        </p>
      </div>

      {/* Status card */}
      <div className="w-full rounded-xl bg-secondary/50 border border-border p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Estado</span>
          <span className="text-xs font-medium text-warning flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-warning" />
            Cuenta no creada
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Nivel asignado</span>
          <span className="text-xs font-mono text-primary">Influencer</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Configuración</span>
          <span className="text-xs text-secondary-foreground">Esperando activación</span>
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={onActivate}
        className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm 
                   active:scale-[0.98] transition-transform duration-100 glow-primary"
      >
        Activar configuración
      </button>

      <p className="text-[11px] text-muted-foreground/50 text-center">
        Proceso automático · Sin datos requeridos
      </p>
    </div>
  );
};
