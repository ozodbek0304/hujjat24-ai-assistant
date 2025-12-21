import ParamInput from "@/components/as-params/input"
import FormTextarea from "@/components/form/textarea"
import { Button } from "@/components/ui/button"
import {
    TEMPLATE_CATEGORY,
    TEMPLATES,
    TEMPLATES_DONWLOAD,
    TEMPLATES_GENERATE,
} from "@/constants/api-endpoints"
import { useGet } from "@/hooks/useGet"
import { usePost } from "@/hooks/usePost"
import { useNavigate, useSearch } from "@tanstack/react-router"
import { BookOpen, FileText, Palette, Sparkles } from "lucide-react"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import LoadingScreen from "./loading-screen"

const imageStyles = [
    {
        id: "photo",
        name: "Realistik",
        icon: "📷",
        description: "Haqiqiy fotosuratlarga o'xshash",
    },
    {
        id: "vector",
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

type FormValues = {
    title: string
    template: number
    language: string
    image_color: string
    image_content_type: string
}

const TadqiqotCreate = () => {
    const [loadingStep, setLoadingStep] = useState("")
    const [uuid, setUuid] = useState("")
    const [loadingProgress, setLoadingProgress] = useState(0)

    const search = useSearch({ from: "/_main/create-presentation" })
    const { category } = search
    const navigate = useNavigate()

    const { data: categories = [], isSuccess } =
        useGet<TemplateCategory[]>(TEMPLATE_CATEGORY)
    const { data: templates = [], isSuccess: isSuccessTemplate } = useGet<
        Templates[]
    >(TEMPLATES, { params: search })

    const { data: response = [] } = useGet<TemplateCategory[]>(
        `${TEMPLATES_DONWLOAD}/${uuid}`,
        { enabled: !!uuid },
    )

    const form = useForm<FormValues>()
    const { control, handleSubmit, watch } = form

    const { mutate, isPending } = usePost({
        onSuccess: (data) => {
            setUuid(data?.uuid)
            setLoadingProgress(100)
        },
        onError: () => {
            setLoadingProgress(0)
        },
    })

    const onSubmit = (values: FormValues) => {
        startLoadingSteps()
        mutate(TEMPLATES_GENERATE, values)
    }

    const startLoadingSteps = () => {
        const steps = [
            { progress: 25, step: "Mavzu tahlil qilinmoqda..." },
            { progress: 50, step: "AI kontent yaratmoqda..." },
            { progress: 75, step: "Rasmlar generatsiya qilinmoqda..." },
            { progress: 100, step: "Dizayn optimallashtirilmoqda..." },
        ]

        steps.forEach((item, index) => {
            setTimeout(
                () => {
                    setLoadingProgress(item.progress)
                    setLoadingStep(item.step)
                },
                (index + 1) * 1500,
            )
        })
    }

    return (
        <>
            <LoadingScreen
                isVisible={isPending}
                progress={loadingProgress}
                currentStep={loadingStep}
            />

            <form onSubmit={handleSubmit(onSubmit)} className="text-foreground">
                {/* Hero */}
                <div className="text-center py-12 ">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        AI bilan{" "}
                        <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                            Tadqiqot
                        </span>{" "}
                        yarating
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                        Professional ilmiy ishlaringizni sun'iy intellekt
                        yordamida tez va sifatli tayyorlang
                    </p>
                </div>

                {/* Main Content */}
                <div className="container mx-auto  pb-16 space-y-6 md:space-y-12">
                    {/* Section 1: Mavzu */}
                    <section className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-border ">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-lg font-bold text-white">
                                1
                            </div>
                            <div>
                                <h2 className="text-xl font-bold flex items-center gap-2">
                                    <FileText className="w-5 h-5 text-primary" />
                                    Mavzuni yozing
                                </h2>
                                <p className="text-muted-foreground text-sm">
                                    Tadqiqot mavzusini batafsil yozing
                                </p>
                            </div>
                        </div>
                        <FormTextarea
                            required
                            methods={form}
                            name="title"
                            placeholder="Masalan: Sun'iy intellekt va uning ta'lim sohasidagi ahamiyati, zamonaviy texnologiyalarning rivojlanishi..."
                            className=" text-base resize-none bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:ring-primary/20"
                        />
                    </section>

                    {/* Section 2: Shablon */}
                    <section className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-border ">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-lg font-bold text-white">
                                2
                            </div>
                            <div>
                                <h2 className="text-xl font-bold flex items-center gap-2">
                                    <BookOpen className="w-5 h-5 text-primary" />
                                    Shablonni tanlang
                                </h2>
                                <p className="text-muted-foreground text-sm">
                                    Tadqiqot uchun mos shablonni tanlang
                                </p>
                            </div>
                        </div>

                        {/* Search and Categories */}
                        <div className="flex flex-col  gap-4 mb-6">
                            <ParamInput
                                fullWidth
                                placeholder="Shablon qidirish..."
                                className="pl-12 bg-secondary/50 md:w-1/2 border-border text-foreground placeholder:text-muted-foreground focus:border-primary/50"
                            />
                            <div className="flex gap-2 flex-wrap">
                                {isSuccess &&
                                    [
                                        {
                                            id: 0,
                                            name: "Barchasi",
                                            templates_count:
                                                categories.length || 0,
                                        },
                                        ...categories,
                                    ].map((cat) => (
                                        <button
                                            type="button"
                                            key={cat.id}
                                            onClick={() =>
                                                navigate({
                                                    to: "/create-presentation",
                                                    search: {
                                                        ...search,
                                                        category: String(
                                                            cat.id,
                                                        ),
                                                    },
                                                })
                                            }
                                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                                (
                                                    Number(category || 0) ===
                                                    Number(cat.id)
                                                ) ?
                                                    "gradient-primary text-white"
                                                :   "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
                                            }`}
                                        >
                                            <span>{`${cat.name} (${cat.templates_count})`}</span>
                                        </button>
                                    ))}
                            </div>
                        </div>

                        <Controller
                            name="template"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {isSuccessTemplate &&
                                        templates?.map((template) => (
                                            <button
                                                type="button"
                                                key={template.id}
                                                onClick={() =>
                                                    field.onChange(template.id)
                                                }
                                                className={`group relative overflow-hidden rounded-xl border-2 transition-all ${
                                                    (
                                                        field.value ===
                                                        template.id
                                                    ) ?
                                                        "border-primary ring-2 ring-primary/50"
                                                    :   "border-border hover:border-primary/70"
                                                }`}
                                            >
                                                <img
                                                    src={template.poster}
                                                    alt={template.name}
                                                    className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                                <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
                                                    <span className="text-xs text-white bg-primary/90 px-2 py-1 rounded-full backdrop-blur-sm">
                                                        {template.category}
                                                    </span>
                                                    <h3 className="text-white font-semibold mt-2">
                                                        {template.name}
                                                    </h3>
                                                </div>
                                                {watch("template") ===
                                                    template.id && (
                                                    <div className="absolute top-3 right-3 w-7 h-7 gradient-primary rounded-full flex items-center justify-center ">
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
                            )}
                        />
                    </section>

                    {/* Section 3: Rasm uslubi */}
                    <section className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-border ">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-lg font-bold text-white">
                                3
                            </div>
                            <div>
                                <h2 className="text-xl font-bold flex items-center gap-2">
                                    <Palette className="w-5 h-5 text-primary" />
                                    Rasm uslubini tanlang
                                </h2>
                                <p className="text-muted-foreground text-sm">
                                    Tadqiqotdagi rasmlar qanday ko'rinishda
                                    bo'lsin?
                                </p>
                            </div>
                        </div>

                        <Controller
                            name="image_content_type"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {imageStyles.map((style) => (
                                        <button
                                            type="button"
                                            key={style.id}
                                            onClick={() =>
                                                field.onChange(style.id)
                                            }
                                            className={`p-5 rounded-xl border-2 transition-all text-center ${
                                                field.value === style.id ?
                                                    "border-primary bg-accent ring-2 ring-primary/30"
                                                :   "border-border bg-secondary/50 hover:border-primary/50 hover:bg-secondary"
                                            }`}
                                        >
                                            <div className="text-4xl mb-3">
                                                {style.icon}
                                            </div>
                                            <h3 className="font-semibold text-foreground">
                                                {style.name}
                                            </h3>
                                            <p className="text-xs text-muted-foreground mt-1">
                                                {style.description}
                                            </p>
                                        </button>
                                    ))}
                                </div>
                            )}
                        />
                    </section>

                    {/* Submit Button */}
                    <div className="flex justify-center pt-4">
                        <Button
                            type="submit"
                            loading={isPending}
                            className="px-12 py-6 text-lg font-semibold gradient-primary border-0 text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed  shadow-primary/25"
                        >
                            <Sparkles className="w-5 h-5 mr-2" />
                            Tadqiqot yaratish
                        </Button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default TadqiqotCreate
