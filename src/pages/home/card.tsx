import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Eye, Sparkles } from "lucide-react"

type Category =
    | "all"
    | "kurs"
    | "prezentatsiya"
    | "loyiha"
    | "tahlil"
    | "dizayn"

export interface Project {
    id: string
    title: string
    description: string
    category: Exclude<Category, "all">
    thumbnail: string
    date: string
    views: number
    aiTool: string
}

interface ProjectCardProps {
    project: Project
    index: number
}

const categoryLabels: Record<Exclude<Category, "all">, string> = {
    kurs: "Kurs ishi",
    prezentatsiya: "Prezentatsiya",
    loyiha: "Loyiha",
    tahlil: "Tahlil",
    dizayn: "Dizayn",
}

export const ProjectCard = ({ project, index }: ProjectCardProps) => {
    return (
        <Card
            className="group overflow-hidden border-border/50 bg-card hover:border-primary/30 card-hover cursor-pointer animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
        >
            <div className="relative aspect-[16/10] overflow-hidden">
                <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="absolute top-3 left-3">
                    <Badge variant={"default"}>
                        {categoryLabels[project.category]}
                    </Badge>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <div className="flex items-center gap-1.5 text-xs text-foreground/80">
                        <Sparkles className="h-3.5 w-3.5 text-primary" />
                        <span>{project.aiTool}</span>
                    </div>
                </div>
            </div>

            <CardContent className="p-4">
                <h3 className="font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                    {project.title}
                </h3>
                <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2">
                    {project.description}
                </p>

                <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{project.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Eye className="h-3.5 w-3.5" />
                        <span>{project.views}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
