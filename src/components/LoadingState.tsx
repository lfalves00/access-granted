import { useEffect, useState } from "react";

const steps = [
  { label: "Conectando con servidor Bet7k...", duration: 900 },
  { label: "Validando sesión de usuario...", duration: 700 },
  { label: "Aplicando configuración WL...", duration: 800 },
  { label: "Actualizando permisos de cuenta...", duration: 800 },
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
      {/* Spinner with Bet7k identity */}
      <div className="relative w-16 h-16">
        <svg className="w-16 h-16 animate-spin" viewBox="0 0 64 64" style={{ animationDuration: "1.5s" }}>
          <circle
            cx="32" cy="32" r="28"
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="3"
          />
          <circle
            cx="32" cy="32" r="28"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="3"
            strokeDasharray="60 120"
            strokeLinecap="round"
          />
        </svg>
        {/* Bet7k server identity */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[10px] font-mono font-bold text-primary tracking-tight">B7K</span>
        </div>
      </div>

      {/* Progress */}
      <div className="w-full space-y-3">
        <div className="w-full h-1 rounded-full bg-secondary overflow-hidden">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-muted-foreground text-center font-mono min-h-[20px]">
          {currentStep < steps.length ? steps[currentStep].label : steps[steps.length - 1].label}
        </p>
      </div>

      {/* Step indicators */}
      <div className="w-full rounded-xl bg-secondary/50 border border-border p-4 space-y-2.5">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              i < currentStep ? "bg-primary" : i === currentStep ? "bg-primary animate-pulse" : "bg-muted-foreground/20"
            }`} />
            <span className={`text-xs transition-colors duration-300 ${
              i <= currentStep ? "text-foreground" : "text-muted-foreground/40"
            }`}>
              {step.label.replace("...", "")}
            </span>
            {i < currentStep && (
              <svg className="w-3.5 h-3.5 text-primary ml-auto" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M3 8.5l3.5 3.5L13 5" />
              </svg>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
