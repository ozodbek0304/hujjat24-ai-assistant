import { Sparkles, Brain, Cpu } from "lucide-react";

const LoadingState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 space-y-8 animate-fade-in">
      {/* Animated logo */}
      <div className="relative">
        {/* Outer ring */}
        <div className="absolute inset-0 w-32 h-32 rounded-full border-2 border-primary/20 animate-spin-slow" />

        {/* Middle ring */}
        <div
          className="absolute inset-2 w-28 h-28 rounded-full border-2 border-dashed border-pink-500/30 animate-spin-slow"
          style={{ animationDirection: "reverse", animationDuration: "15s" }}
        />

        {/* Inner glow */}
        <div className="absolute inset-4 w-24 h-24 rounded-full bg-gradient-to-br from-primary/30 to-pink-500/30 blur-xl animate-pulse" />

        {/* Center icon */}
        <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-primary to-pink-500 flex items-center justify-center">
          <Brain className="w-12 h-12 text-primary-foreground animate-pulse" />
        </div>

        {/* Orbiting elements */}
        <div
          className="absolute inset-0 animate-orbit"
          style={{ animationDuration: "8s" }}
        >
          <div className="w-4 h-4 rounded-full bg-accent shadow-lg shadow-accent/50" />
        </div>
        <div
          className="absolute inset-0 animate-orbit"
          style={{ animationDuration: "12s", animationDelay: "-4s" }}
        >
          <div className="w-3 h-3 rounded-full bg-primary shadow-lg shadow-primary/50" />
        </div>
      </div>

      {/* Text */}
      <div className="text-center space-y-3">
        <h3 className="text-2xl font-bold gradient-text">
          AI hujjat yaratmoqda...
        </h3>
        <p className="text-muted-foreground max-w-md">
          Sun'iy intellekt sizning mavzuingiz bo'yicha professional hujjat
          tayyorlamoqda
        </p>
      </div>

      {/* Progress indicators */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border/50">
          <Cpu className="w-4 h-4 text-primary animate-pulse" />
          <span className="text-sm text-muted-foreground">
            Tahlil qilinmoqda
          </span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border/50">
          <Sparkles className="w-4 h-4 text-accent animate-pulse" />
          <span className="text-sm text-muted-foreground">Yozilmoqda</span>
        </div>
      </div>

      {/* Animated dots */}
      <div className="flex gap-2">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-pink-500"
            style={{
              animation: "bounce 1s ease-in-out infinite",
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default LoadingState;
