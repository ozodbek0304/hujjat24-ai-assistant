import ParamInput from "@/components/as-params/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { TEMPLATE_CATEGORY } from "@/constants/api-endpoints"
import { useGet } from "@/hooks/useGet"
import { cn } from "@/lib/utils"
import { useNavigate, useSearch } from "@tanstack/react-router"
import { Check, Search } from "lucide-react"

interface DocumentType {
    id: string
    name: string
    description: string
    image: string
    category: string
    gradient: string
}

const documentTypes: DocumentType[] = [
    {
        id: "kurs-ishi",
        name: "Kurs ishi",
        description: "To'liq kurs ishi hujjati",
        image: "/card.jpeg",
        category: "Ta'lim",
        gradient: "from-violet-500 to-purple-600",
    },
    {
        id: "referat",
        name: "Referat",
        description: "Ilmiy referat yozish",
        image: "/card3.jpeg",
        category: "Ta'lim",
        gradient: "from-blue-500 to-cyan-500",
    },
    {
        id: "insho",
        name: "Insho",
        description: "Kreativ insho yaratish",
        image: "/card2.jpeg",
        category: "Kreativ",
        gradient: "from-pink-500 to-rose-500",
    },
    {
        id: "hisobot",
        name: "Hisobot",
        description: "Amaliyot hisoboti",
        image: "/card4.jpeg",
        category: "Biznes",
        gradient: "from-amber-500 to-orange-500",
    },
]

const DocumentTypeSelector = () => {
    const { data: templateCategories } =
        useGet<TemplateCategory[]>(TEMPLATE_CATEGORY)

    const search: any = useSearch({ from: "/_main" })
    const { template_id, category_id } = search
    const navigate = useNavigate()

    return (
        <div className="space-y-6 animate-slide-up">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-pink-600 border border-primary/20 flex items-center justify-center text-primary-foreground font-bold text-sm">
                    2
                </div>
                <h2 className="text-2xl font-bold text-foreground">
                    Shablonni tanlang
                </h2>
                <span className="px-2.5 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium border border-accent/20">
                    {documentTypes.length} ta
                </span>
            </div>

            {/* Search */}
            <div className="relative w-1/2">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <ParamInput
                    searchKey="template_search"
                    fullWidth
                    placeholder="Shablon qidirish..."
                    className="pl-12 h-12 bg-secondary/50 border-border/50 rounded-xl"
                />
            </div>

            {/* Category tabs */}
            <div className="flex flex-wrap gap-2">
                {templateCategories?.map((category) => {
                    return (
                        <Button
                            key={category.id}
                            onClick={() =>
                                navigate({
                                    search: {
                                        ...search,
                                        category_id: category,
                                    },
                                })
                            }
                            className={cn(
                                "px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300",
                                category_id === category ?
                                    "bg-gradient-to-r from-primary to-pink-500 text-primary-foreground shadow-lg shadow-primary/20"
                                :   "bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary border border-border/50",
                            )}
                        >
                            {category.name}
                            <span className="ml-1.5 ">
                                ({category.templates_count})
                            </span>
                        </Button>
                    )
                })}
            </div>

            {/* Document type cards */}
            <div
                className={cn(
                    "grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4",
                )}
            >
                {documentTypes.map((type, index) => (
                    <Card
                        key={type.id}
                        onClick={() =>
                            navigate({
                                search: { ...search, template_id: type.id },
                            })
                        }
                        className={cn(
                            "relative text-left  transition-all duration-300 group hover-lift  rounded-md p-0.5",
                        )}
                        style={{ animationDelay: `${index * 0.05}s` }}
                    >
                        {/* Gradient border on hover/selected */}
                        <div
                            className={cn(
                                "absolute inset-0 rounded-2xl transition-opacity duration-300",
                                template_id === type.id ?
                                    "opacity-100"
                                :   "opacity-0 group-hover:opacity-100",
                            )}
                        >
                            <div
                                className={cn(
                                    "absolute inset-0 rounded-2xl bg-gradient-to-br p-[1px]",
                                    type.gradient,
                                )}
                            >
                                <div className="w-full h-full rounded-2xl bg-card" />
                            </div>
                        </div>

                        {/* Card background */}
                        <div
                            className={cn(
                                "absolute inset-[1px] rounded-2xl transition-colors duration-300",
                                template_id === type.id ?
                                    "bg-card"
                                :   "bg-card/80 group-hover:bg-card",
                            )}
                        />

                        {/* Content */}
                        <div className={cn("relative z-10 ")}>
                            <div>
                                <img
                                    src={type.image}
                                    alt="img"
                                    className="rounded-t-md "
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="font-bold text-foreground mb-1">
                                    {type.name}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    {type.description}
                                </p>
                            </div>
                            {template_id === type.id && (
                                <div className="absolute top-3 right-3 p-1  bg-primary rounded-full">
                                    <Check size={18} />
                                </div>
                            )}
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default DocumentTypeSelector
