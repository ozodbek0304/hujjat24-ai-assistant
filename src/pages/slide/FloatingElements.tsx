import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

const FloatingElements = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const generated: Particle[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2,
    }));
    setParticles(generated);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Main gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-pink-500/15 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: "-1.5s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/10 rounded-full blur-[150px] animate-pulse-glow" style={{ animationDelay: "-3s" }} />

      {/* Floating geometric shapes */}
      <div className="absolute top-20 left-20 w-20 h-20 border border-primary/20 rounded-2xl animate-float rotate-12" />
      <div className="absolute top-40 right-32 w-16 h-16 border border-accent/20 rounded-full animate-float-delayed" />
      <div className="absolute bottom-32 left-1/4 w-24 h-24 border border-pink-500/20 rounded-3xl animate-float" style={{ animationDelay: "-2s" }} />
      <div className="absolute bottom-48 right-1/4 w-12 h-12 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl animate-float-delayed rotate-45" />

      {/* Orbiting element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-4 h-4 bg-primary/40 rounded-full animate-orbit blur-sm" />
      </div>

      {/* Star particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-foreground/40"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animation: `twinkle ${particle.duration}s ease-in-out infinite`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}

      {/* Grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(hsl(262, 83%, 58%) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(262, 83%, 58%) 1px, transparent 1px)`,
          backgroundSize: '100px 100px',
        }}
      />
    </div>
  );
};

export default FloatingElements;
