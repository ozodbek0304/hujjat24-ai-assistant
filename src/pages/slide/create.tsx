import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Link } from "@tanstack/react-router"
import {
    ArrowLeft,
    BookOpen,
    FileText,
    Palette,
    Search,
    Sparkles,
} from "lucide-react"
import { useState } from "react"

const templates = [
    {
        id: 1,
        name: "Ilmiy tadqiqot",
        category: "Ta'lim",
        image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=300&fit=crop",
    },
    {
        id: 2,
        name: "Biznes tahlil",
        category: "Biznes",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
    },
    {
        id: 3,
        name: "Texnologiya",
        category: "Texnologiya",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop",
    },
    {
        id: 4,
        name: "Tibbiyot",
        category: "Ta'lim",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop",
    },
    {
        id: 5,
        name: "Iqtisodiyot",
        category: "Biznes",
        image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop",
    },
    {
        id: 6,
        name: "Ekologiya",
        category: "Ta'lim",
        image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
    },
]

const imageStyles = [
    {
        id: "realistic",
        name: "Realistik",
        icon: "📷",
        description: "Haqiqiy fotosuratlarga o'xshash",
    },
    {
        id: "illustration",
        name: "Illustratsiya",
        icon: "🎨",
        description: "Chiroyli chizilgan rasmlar",
    },
    {
        id: "3d",
        name: "3D Render",
        icon: "🎲",
        description: "Uch o'lchovli modellar",
    },
    {
        id: "abstract",
        name: "Abstrakt",
        icon: "✨",
        description: "Zamonaviy abstrakt dizayn",
    },
]

const categories = ["Hammasi", "Ta'lim", "Biznes", "Texnologiya"]

const SlideCreate = () => {
    const [topic, setTopic] = useState("")
    const [selectedTemplate, setSelectedTemplate] = useState<number | null>(
        null,
    )
    const [selectedStyle, setSelectedStyle] = useState<string | null>(null)
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("Hammasi")

    const filteredTemplates = templates.filter((t) => {
        const matchesSearch =
            t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.category.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesCategory =
            selectedCategory === "Hammasi" || t.category === selectedCategory
        return matchesSearch && matchesCategory
    })

    const canSubmit =
        topic.trim().length > 0 &&
        selectedTemplate !== null &&
        selectedStyle !== null

    return (
        <div className="min-h-screen bg-[#0a0b14] text-white">
            {/* Header */}
            <header className="border-b border-white/10 bg-[#0a0b14]/80 backdrop-blur-xl sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <Link
                        to="/"
                        className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span className="font-medium">Orqaga</span>
                    </Link>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold">TadqiqotAI</span>
                    </div>
                    <Button
                        variant="outline"
                        className="border-violet-500/50 text-violet-400 hover:bg-violet-500/10 hover:text-violet-300"
                    >
                        Pro versiya
                    </Button>
                </div>
            </header>

            {/* Hero */}
            <div className="text-center py-12 px-4">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    AI bilan{" "}
                    <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Tadqiqot
                    </span>{" "}
                    yarating
                </h1>
                <p className="text-white/60 text-lg max-w-xl mx-auto">
                    Professional ilmiy ishlaringizni sun'iy intellekt yordamida
                    tez va sifatli tayyorlang
                </p>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 pb-16 space-y-12">
                {/* Section 1: Mavzu */}
                <section className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-lg font-bold">
                            1
                        </div>
                        <div>
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <FileText className="w-5 h-5 text-violet-400" />
                                Mavzuni yozing
                            </h2>
                            <p className="text-white/50 text-sm">
                                Tadqiqot mavzusini batafsil yozing
                            </p>
                        </div>
                    </div>
                    <Textarea
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="Masalan: Sun'iy intellekt va uning ta'lim sohasidagi ahamiyati, zamonaviy texnologiyalarning rivojlanishi..."
                        className="min-h-[140px] text-base resize-none bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-violet-500/50 focus:ring-violet-500/20"
                    />
                </section>

                {/* Section 2: Shablon */}
                <section className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-lg font-bold">
                            2
                        </div>
                        <div>
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <BookOpen className="w-5 h-5 text-violet-400" />
                                Shablonni tanlang
                            </h2>
                            <p className="text-white/50 text-sm">
                                Tadqiqot uchun mos shablonni tanlang
                            </p>
                        </div>
                    </div>

                    {/* Search and Categories */}
                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                            <Input
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Shablon qidirish..."
                                className="pl-12 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-violet-500/50"
                            />
                        </div>
                        <div className="flex gap-2 flex-wrap">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                        selectedCategory === cat ?
                                            "bg-violet-500 text-white"
                                        :   "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
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
                                    selectedTemplate === template.id ?
                                        "border-violet-500 ring-2 ring-violet-500/30"
                                    :   "border-white/10 hover:border-white/30"
                                }`}
                            >
                                <img
                                    src={template.image}
                                    alt={template.name}
                                    className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
                                    <span className="text-xs text-violet-300 bg-violet-500/30 px-2 py-1 rounded-full backdrop-blur-sm">
                                        {template.category}
                                    </span>
                                    <h3 className="text-white font-semibold mt-2">
                                        {template.name}
                                    </h3>
                                </div>
                                {selectedTemplate === template.id && (
                                    <div className="absolute top-3 right-3 w-7 h-7 bg-violet-500 rounded-full flex items-center justify-center shadow-lg">
                                        <svg
                                            className="w-4 h-4 text-white"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                </section>

                {/* Section 3: Rasm uslubi */}
                <section className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-lg font-bold">
                            3
                        </div>
                        <div>
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <Palette className="w-5 h-5 text-violet-400" />
                                Rasm uslubini tanlang
                            </h2>
                            <p className="text-white/50 text-sm">
                                Tadqiqotdagi rasmlar qanday ko'rinishda bo'lsin?
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {imageStyles.map((style) => (
                            <button
                                key={style.id}
                                onClick={() => setSelectedStyle(style.id)}
                                className={`p-5 rounded-xl border-2 transition-all text-center ${
                                    selectedStyle === style.id ?
                                        "border-violet-500 bg-violet-500/10 ring-2 ring-violet-500/30"
                                    :   "border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10"
                                }`}
                            >
                                <div className="text-4xl mb-3">
                                    {style.icon}
                                </div>
                                <h3 className="font-semibold text-white">
                                    {style.name}
                                </h3>
                                <p className="text-xs text-white/50 mt-1">
                                    {style.description}
                                </p>
                            </button>
                        ))}
                    </div>
                </section>

                {/* Submit Button */}
                <div className="flex justify-center pt-4">
                    <Button
                        disabled={!canSubmit}
                        className="px-12 py-6 text-lg font-semibold bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-violet-500/25"
                    >
                        <Sparkles className="w-5 h-5 mr-2" />
                        Tadqiqot yaratish
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default SlideCreate
