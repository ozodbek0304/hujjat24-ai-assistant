import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar } from "lucide-react"

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
            className="grid group grid-cols-3 rounded-sm overflow-hidden border-border/50 bg-card hover:border-primary/30 card-hover cursor-pointer animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
        >
            <div className="relative aspect-square overflow-hidden ">
                <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            <CardContent className="p-3 col-span-2 flex flex-col justify-between gap-1">
                <div className="space-y-1">
                    <h3 className="font-medium text-foreground line-clamp-1 break-all group-hover:text-primary transition-colors">
                        {project.title}
                    </h3>
                    <p className=" sm:text-sm text-xs text-muted-foreground line-clamp-2 break-all">
                        {project.description}
                    </p>
                </div>

                <div className=" flex  justify-between text-xs text-muted-foreground">
                    <Badge variant={"default"}>
                        {categoryLabels[project.category]}
                    </Badge>
                    <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{project.date}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
