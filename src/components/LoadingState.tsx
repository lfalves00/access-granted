import { useEffect, useState } from "react";
import bet7kLogo from "@/assets/bet7k-logo.png";

const steps = [
  { label: "Conectando con servidor Bet7k...", duration: 1200 },
  { label: "Validando sesión de usuario...", duration: 1100 },
  { label: "Aplicando configuración WL...", duration: 1400 },
  { label: "Actualizando permisos de cuenta...", duration: 1200 },
  { label: "Sincronizando privilegios...", duration: 800 },
];

export const LoadingState = () => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const advance = (step: number) => {
      if (step < steps.length) {
        timeout = setTimeout(() => {
          setCurrentStep(step + 1);
          advance(step + 1);
        }, steps[step].duration);
      }
    };
    advance(0);
    return () => clearTimeout(timeout);
  }, []);

  const progress = Math.min((currentStep / steps.length) * 100, 100);

  return (
    <div className="flex flex-col items-center gap-8 animate-fade-in">
      {/* Spinner with Bet7k logo */}
      <div className="relative w-20 h-20">
        <svg className="w-20 h-20 animate-spin" viewBox="0 0 80 80" style={{ animationDuration: "1.8s" }}>
          <circle
            cx="40" cy="40" r="36"
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="2.5"
          />
          <circle
            cx="40" cy="40" r="36"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="2.5"
            strokeDasharray="70 160"
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 rounded-lg overflow-hidden bg-background border border-border/50 flex items-center justify-center">
            <img src={bet7kLogo} alt="" className="w-7 h-7 object-contain" />
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="w-full space-y-3">
        <div className="w-full h-1 rounded-full bg-secondary overflow-hidden">
          <div
            className="h-full rounded-full bg-primary transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-muted-foreground text-center font-mono min-h-[20px] transition-opacity duration-300">
          {currentStep < steps.length ? steps[currentStep].label : steps[steps.length - 1].label}
        </p>
      </div>

      {/* Step indicators */}
      <div className="w-full rounded-xl bg-secondary/50 border border-border p-4 space-y-2.5">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center gap-3 transition-all duration-300" style={{ opacity: i <= currentStep ? 1 : 0.3 }}>
            <div className={`w-2 h-2 rounded-full transition-all duration-500 ${
              i < currentStep ? "bg-primary scale-100" : i === currentStep ? "bg-primary animate-pulse" : "bg-muted-foreground/20"
            }`} />
            <span className={`text-xs transition-colors duration-300 ${
              i <= currentStep ? "text-foreground" : "text-muted-foreground/40"
            }`}>
              {step.label.replace("...", "")}
            </span>
            {i < currentStep && (
              <svg className="w-3.5 h-3.5 text-primary ml-auto animate-scale-in" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M3 8.5l3.5 3.5L13 5" />
              </svg>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
