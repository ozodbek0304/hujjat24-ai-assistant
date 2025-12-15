import { useState } from "react";
import { ArrowLeft, Search, Sparkles, FileText, Palette, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

const templates = [
  { id: 1, name: "Ilmiy tadqiqot", category: "Ta'lim", image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=300&fit=crop" },
  { id: 2, name: "Biznes tahlil", category: "Biznes", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop" },
  { id: 3, name: "Texnologiya", category: "Texnologiya", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop" },
  { id: 4, name: "Tibbiyot", category: "Ta'lim", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop" },
  { id: 5, name: "Iqtisodiyot", category: "Biznes", image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop" },
  { id: 6, name: "Ekologiya", category: "Ta'lim", image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop" },
];

const imageStyles = [
  { id: "realistic", name: "Realistik", icon: "📷", description: "Haqiqiy fotosuratlarga o'xshash" },
  { id: "illustration", name: "Illustratsiya", icon: "🎨", description: "Chiroyli chizilgan rasmlar" },
  { id: "3d", name: "3D Render", icon: "🎲", description: "Uch o'lchovli modellar" },
  { id: "abstract", name: "Abstrakt", icon: "✨", description: "Zamonaviy abstrakt dizayn" },
];

const categories = ["Hammasi", "Ta'lim", "Biznes", "Texnologiya"];

const TadqiqotCreate = () => {
  const [topic, setTopic] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Hammasi");

  const filteredTemplates = templates.filter((t) => {
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "Hammasi" || t.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const canSubmit = topic.trim().length > 0 && selectedTemplate !== null && selectedStyle !== null;

  return (
    <div className="min-h-screen bg-background text-foreground">


      {/* Hero */}
      <div className="text-center py-12 px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          AI bilan{" "}
          <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Tadqiqot
          </span>{" "}
          yarating
        </h1>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Professional ilmiy ishlaringizni sun'iy intellekt yordamida tez va sifatli tayyorlang
        </p>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-16 space-y-12">
        
        {/* Section 1: Mavzu */}
        <section className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-border shadow-lg">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-lg font-bold text-white">
              1
            </div>
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Mavzuni yozing
              </h2>
              <p className="text-muted-foreground text-sm">Tadqiqot mavzusini batafsil yozing</p>
            </div>
          </div>
          <Textarea
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Masalan: Sun'iy intellekt va uning ta'lim sohasidagi ahamiyati, zamonaviy texnologiyalarning rivojlanishi..."
            className="min-h-[140px] text-base resize-none bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:ring-primary/20"
          />
        </section>

        {/* Section 2: Shablon */}
        <section className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-border shadow-lg">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-lg font-bold text-white">
              2
            </div>
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                Shablonni tanlang
              </h2>
              <p className="text-muted-foreground text-sm">Tadqiqot uchun mos shablonni tanlang</p>
            </div>
          </div>
          
          {/* Search and Categories */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Shablon qidirish..."
                className="pl-12 bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground focus:border-primary/50"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === cat
                      ? "gradient-primary text-white"
                      : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Template Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {filteredTemplates.map((template) => (
              <button
                key={template.id}
                onClick={() => setSelectedTemplate(template.id)}
                className={`group relative overflow-hidden rounded-xl border-2 transition-all ${
                  selectedTemplate === template.id
                    ? "border-primary ring-2 ring-primary/30"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <img
                  src={template.image}
                  alt={template.name}
                  className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
                  <span className="text-xs text-primary-foreground bg-primary/80 px-2 py-1 rounded-full backdrop-blur-sm">
                    {template.category}
                  </span>
                  <h3 className="text-white font-semibold mt-2">{template.name}</h3>
                </div>
                {selectedTemplate === template.id && (
                  <div className="absolute top-3 right-3 w-7 h-7 gradient-primary rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
        </section>

        {/* Section 3: Rasm uslubi */}
        <section className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-border shadow-lg">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-lg font-bold text-white">
              3
            </div>
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Palette className="w-5 h-5 text-primary" />
                Rasm uslubini tanlang
              </h2>
              <p className="text-muted-foreground text-sm">Tadqiqotdagi rasmlar qanday ko'rinishda bo'lsin?</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {imageStyles.map((style) => (
              <button
                key={style.id}
                onClick={() => setSelectedStyle(style.id)}
                className={`p-5 rounded-xl border-2 transition-all text-center ${
                  selectedStyle === style.id
                    ? "border-primary bg-accent ring-2 ring-primary/30"
                    : "border-border bg-secondary/50 hover:border-primary/50 hover:bg-secondary"
                }`}
              >
                <div className="text-4xl mb-3">{style.icon}</div>
                <h3 className="font-semibold text-foreground">{style.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{style.description}</p>
              </button>
            ))}
          </div>
        </section>

        {/* Submit Button */}
        <div className="flex justify-center pt-4">
          <Button
            disabled={!canSubmit}
            className="px-12 py-6 text-lg font-semibold gradient-primary border-0 text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/25"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Tadqiqot yaratish
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TadqiqotCreate;
