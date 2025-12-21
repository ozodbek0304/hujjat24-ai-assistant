import { Sparkles } from "lucide-react"
import FeaturesGrid from "../category/features-grid"
import { Project, ProjectCard } from "./card"

const MainSection = () => {
    return (
        <div className="space-y-6">
            <FeaturesGrid />
            <section className=" overflow-hidden border-b border-border/50">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
                <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
                <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
            </section>

            <section className="container">
               <div className="flex justify-center">
                 <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-in">
                    <Sparkles className="h-4 w-4" />
                    <span>AI yordamida yaratilgan ishlar</span>
                </div>

               </div>
                {projects.length > 0 ?
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {projects.map((project, index) => (
                            <ProjectCard
                                key={project.id}
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

export default MainSection

const projects: Project[] = [
    {
        id: "1",
        title: "Sun'iy intellekt asoslari",
        description:
            "Sun'iy intellektning tarixi, turlari va kelajakdagi istiqbollari haqida keng qamrovli kurs ishi",
        category: "kurs",
        thumbnail:
            "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=60",
        date: "2024-12-15",
        views: 156,
        aiTool: "ChatGPT",
    },
    {
        id: "2",
        title: "Biznes strategiyasi prezentatsiyasi",
        description:
            "Kompaniya uchun 2025 yilgi strategik reja va maqsadlar to'plami",
        category: "prezentatsiya",
        thumbnail:
            "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop&q=60",
        date: "2024-12-10",
        views: 234,
        aiTool: "Gamma AI",
    },
    {
        id: "3",
        title: "E-commerce mobil ilovasi",
        description: "Online do'kon uchun zamonaviy UI/UX dizayn konsepti",
        category: "dizayn",
        thumbnail:
            "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop&q=60",
        date: "2024-12-08",
        views: 412,
        aiTool: "Midjourney",
    },
    {
        id: "4",
        title: "Bozor tahlili - IT sektor",
        description:
            "O'zbekistondagi IT bozorining 2024 yildagi holati va tendentsiyalari tahlili",
        category: "tahlil",
        thumbnail:
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60",
        date: "2024-12-05",
        views: 189,
        aiTool: "Claude AI",
    },
    {
        id: "5",
        title: "Startup inkubatori loyihasi",
        description:
            "Yoshlar uchun texnologik startup inkubator tashkil etish bo'yicha loyiha",
        category: "loyiha",
        thumbnail:
            "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&auto=format&fit=crop&q=60",
        date: "2024-12-01",
        views: 298,
        aiTool: "ChatGPT",
    },
    {
        id: "6",
        title: "Marketing kampaniyasi",
        description:
            "Raqamli marketing strategiyasi va ijtimoiy tarmoqlarda reklama rejasi",
        category: "prezentatsiya",
        thumbnail:
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60",
        date: "2024-11-28",
        views: 345,
        aiTool: "Gamma AI",
    },
    {
        id: "7",
        title: "Machine Learning asoslari",
        description:
            "Mashinaviy o'rganish algoritmlari va ularning amaliy qo'llanilishi",
        category: "kurs",
        thumbnail:
            "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&auto=format&fit=crop&q=60",
        date: "2024-11-25",
        views: 267,
        aiTool: "ChatGPT",
    },
    {
        id: "8",
        title: "Brend identifikatsiyasi",
        description:
            "Yangi brendni yaratish uchun logo, ranglar va vizual uslub qo'llanmasi",
        category: "dizayn",
        thumbnail:
            "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop&q=60",
        date: "2024-11-20",
        views: 523,
        aiTool: "DALL-E",
    },
]
