import { useEffect, useState } from "react";

export const StatusBar = ({ sessionId }: { sessionId: string }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const i = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(i);
  }, []);

  const formatted = time.toLocaleTimeString("es-CL", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  return (
    <div className="flex items-center justify-between text-[11px] text-muted-foreground/60 font-mono mb-6">
      <span>SES:{sessionId}</span>
      <div className="flex items-center gap-1.5">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
        <span>{formatted}</span>
      </div>
    </div>
  );
};
