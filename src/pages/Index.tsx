import { useState, useEffect, useCallback } from "react";
import { StatusBar } from "@/components/StatusBar";
import { IdleState } from "@/components/IdleState";
import { LoadingState } from "@/components/LoadingState";
import { SuccessState } from "@/components/SuccessState";

type AppState = "idle" | "loading" | "success";

const Index = () => {
  const [state, setState] = useState<AppState>("idle");
  const [sessionId] = useState(() => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    return Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  });

  const handleActivate = useCallback(() => {
    setState("loading");
  }, []);

  useEffect(() => {
    if (state === "loading") {
      const timer = setTimeout(() => setState("success"), 3200);
      return () => clearTimeout(timer);
    }
  }, [state]);

  return (
    <div className="flex flex-col min-h-[100dvh] bg-background px-5 py-4 max-w-[430px] mx-auto select-none">
      <StatusBar sessionId={sessionId} />
      <main className="flex-1 flex flex-col justify-center">
        {state === "idle" && <IdleState onActivate={handleActivate} />}
        {state === "loading" && <LoadingState />}
        {state === "success" && <SuccessState />}
      </main>
      <footer className="pb-2 pt-4">
        <div className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground/40">
          <svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1a7 7 0 100 14A7 7 0 008 1zm0 1.2a5.8 5.8 0 110 11.6A5.8 5.8 0 018 2.2zm0 1.8a1 1 0 00-1 1v3.6l-2.1 1.2a1 1 0 001 1.7l2.6-1.5A1 1 0 009 9V5a1 1 0 00-1-1z"/></svg>
          <span>Entorno seguro · v4.2.1</span>
        </div>
      </footer>
    </div>
  );
};

export default Index;
