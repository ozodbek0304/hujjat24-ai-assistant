import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { useNavigate } from "@tanstack/react-router"
import { format } from "date-fns"
import { Banknote, Calendar, FileText, Languages } from "lucide-react"

interface ProjectCardProps {
    project: DocumentItem
    index: number
}

const categoryLabels: Record<number, string> = {
    1: "Taqdimot",
    2: "Mustaqil ishi",
    3: "Referat",
}

export const ProjectCard = ({ project, index }: ProjectCardProps) => {
    const navigate = useNavigate()

    return (
        <Card
            onClick={() => navigate({ to: `/projects/${project.uuid}` })}
            className="grid group grid-cols-3 rounded-sm overflow-hidden border-border/50 bg-card hover:border-primary/40 cursor-pointer animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
        >
            {/* Preview */}
            <div className="relative aspect-square overflow-hidden bg-muted flex items-center justify-center">
                {project?.image ?
                    <img
                        src={project?.image}
                        alt={project.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                            e.currentTarget.style.display = "none"
                        }}
                    />
                :   <FileText className="h-10 w-10 text-muted-foreground" />}

                {/* Type */}
                <Badge
                    variant="outline"
                    className="absolute bottom-2 right-2 text-[10px] bg-background/80"
                >
                    {project.type.toUpperCase()}
                </Badge>

                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Content */}
            <CardContent className="p-3 col-span-2 flex flex-col justify-between gap-2">
                <div className="space-y-1">
                    <h3 className="font-medium text-foreground line-clamp-1 break-all group-hover:text-primary transition-colors">
                        {project.title}
                    </h3>

                    <p className="text-xs text-muted-foreground line-clamp-2 break-all">
                        {project?.desc ?? ""}
                    </p>
                </div>

                <div className="flex flex-wrap justify-between items-center gap-2 text-xs text-muted-foreground">
                    <div className="flex items-center justify-between gap-2 w-full">
                        <Badge variant="secondary">
                            {categoryLabels[project.service] ?? "Noma'lum"}
                        </Badge>

                        <div className="flex items-center gap-1">
                            <Banknote className="h-3.5 w-3.5" />
                            <span>{project.amount.toLocaleString()} so'm</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between gap-2 w-full">
                        {/* Language */}
                        <Badge className=" text-[10px] flex items-center gap-1 uppercase ">
                            <Languages className="h-3 w-3" />
                            {project.language}
                        </Badge>

                        <div className="flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5" />
                            <span>
                                {format(
                                    new Date(project.created_at),
                                    "yyyy-MM-dd HH:mm",
                                )}
                            </span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
