import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { Check } from "lucide-react";

interface Style {
  id: string;
  name: string;
  description: string;
  gradient: string;
  pattern: string;
}

const styles: Style[] = [
  {
    id: "academic",
    name: "Akademik",
    description: "Rasmiy ilmiy uslub",
    gradient: "from-blue-600 via-blue-500 to-cyan-400",
    pattern:
      "radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)",
  },
  {
    id: "professional",
    name: "Professional",
    description: "Biznes uslubi",
    gradient: "from-slate-600 via-slate-500 to-zinc-400",
    pattern:
      "linear-gradient(135deg, rgba(100, 116, 139, 0.2) 0%, transparent 50%)",
  },
  {
    id: "creative",
    name: "Kreativ",
    description: "Erkin va ijodiy",
    gradient: "from-purple-600 via-pink-500 to-rose-400",
    pattern:
      "radial-gradient(circle at 70% 70%, rgba(168, 85, 247, 0.3) 0%, transparent 50%)",
  },
  {
    id: "simple",
    name: "Sodda",
    description: "Tushunish oson",
    gradient: "from-emerald-600 via-emerald-500 to-teal-400",
    pattern:
      "linear-gradient(45deg, rgba(16, 185, 129, 0.2) 0%, transparent 50%)",
  },
];


const StyleSelector = () => {

  const search:any=useSearch({from:"/_main"})
  const {image_id}=search
    const navigate=useNavigate()

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary/20 to-pink-500/20 border border-primary/20 flex items-center justify-center text-primary font-bold text-sm">
          3
        </div>
        <h2 className="text-2xl font-bold text-foreground">
          Rasm uslubini tanlang
        </h2>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {styles.map((style, index) => (
          <Button
            key={style.id}
             onClick={() => navigate({ search: { ...search, image_id:style.id } })}
            className={cn(
              "relative p-6 rounded-2xl text-left transition-all duration-500 overflow-hidden group hover-lift h-44",
              image_id === style.id
                ? "ring-2 ring-primary shadow-2xl shadow-primary/20"
                : "hover:shadow-xl"
            )}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Background gradient */}
            <div
              className={cn(
                "absolute inset-0 bg-gradient-to-br opacity-100 transition-opacity duration-500",
                style.gradient
              )}
            />

            {/* Pattern overlay */}
            <div
              className="absolute inset-0 opacity-50"
              style={{ background: style.pattern }}
            />

            {/* Dark overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-end">
              <h3 className="font-bold text-white text-lg mb-1">
                {style.name}
              </h3>
              <p className="text-sm text-white/80">{style.description}</p>
            </div>

            {/* Selected indicator */}
            {image_id === style.id && (
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-primary  flex items-center justify-center">
                <Check className="w-5 h-5 text-white" />
              </div>
            )}

            {/* Shimmer effect on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer" />
          </Button>
        ))}
      </div>
    </div>
  );
};

export default StyleSelector;
