import { useGet } from "@/hooks/useGet"
import { Sparkles } from "lucide-react"
import { ProjectCard } from "../home/card"

const MyDocuments = () => {
    const { data: projects, isSuccess } = useGet<DocumentItem[]>("documents")

    return (
        <div>
            <section className="container ">
                <div className="flex justify-center  py-3">
                    <div className="flex items-center gap-2  text-xl font-medium  mb-4">
                        <Sparkles className=" h-6 w-6 text-primary" />
                        <span>AI yordamida yaratilgan ishlar</span>
                    </div>
                </div>
                {isSuccess && projects.length > 0 ?
                    <div className="space-y-2">
                        {projects.map((project, index) => (
                            <ProjectCard
                                key={index}
                                project={project}
                                index={index}
                            />
                        ))}
                    </div>
                :   <div className="py-20 text-center">
                        <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-muted mb-4">
                            <Sparkles className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-semibold text-foreground">
                            Ishlar topilmadi
                        </h3>
                        <p className="mt-2 text-muted-foreground">
                            Qidiruv so'rovingizga mos ishlar mavjud emas
                        </p>
                    </div>
                }
            </section>
        </div>
    )
}

export default MyDocuments
