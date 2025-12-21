import ParamInput from "@/components/as-params/input"
import ParamPagination from "@/components/as-params/pagination"
import Modal from "@/components/custom/modal"
import { FormSelect } from "@/components/form/select"
import FormTextarea from "@/components/form/textarea"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    TEMPLATE_CATEGORY,
    TEMPLATE_CATEGORY_VIEW,
    TEMPLATES,
    TEMPLATES_DONWLOAD,
    TEMPLATES_GENERATE,
} from "@/constants/api-endpoints"
import { useGet } from "@/hooks/useGet"
import { useModal } from "@/hooks/useModal"
import { usePost } from "@/hooks/usePost"
import { useWebSocket } from "@/hooks/useWebsocket"
import { downloadExcel } from "@/lib/download-excel"
import { useNavigate, useSearch } from "@tanstack/react-router"
import { BookOpen, Eye, FileText, Palette, Sparkles } from "lucide-react"
import { useEffect, useRef, useState } from "react"
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
        id: "psd",
        name: "Illustratsiya",
        icon: "🎨",
        description: "Chiroyli chizilgan rasmlar",
    },
    {
        id: "vector",
        name: "3D Render",
        icon: "🎲",
        description: "Uch o'lchovli modellar",
    },
    {
        id: "abstrakt",
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
    page_count: number
}

const WS_URL = "wss://api.ai.hujjat24.uz/ws/1"

const TadqiqotCreate = () => {
    const [uuid, setUuid] = useState<string | null>(null)
    const [templateItem, setTemplateItem] = useState<Templates | null>(null)
    const [loadingProgress, setLoadingProgress] = useState(0)
    const { openModal } = useModal("template-view")

    const intervalRef = useRef<any | null>(null)

    const search = useSearch({ from: "/_main/create-presentation" })
    const { category } = search
    const navigate = useNavigate()

    const { data: dataDownload } = useGet(`${TEMPLATES_DONWLOAD}/${uuid}`, {
        enabled: !!uuid,
        config: {
            responseType: "blob",
        },
    })

    const { data: categories = [], isSuccess } =
        useGet<TemplateCategory[]>(TEMPLATE_CATEGORY)
    const { data: templates, isSuccess: isSuccessTemplate } = useGet<
        ListResponse<Templates>
    >(TEMPLATES, {
        params: { ...search, size: 8 },
    })

    const { data: templatesView } = useGet<string[]>(
        `${TEMPLATE_CATEGORY_VIEW}/${templateItem?.id}`,
        {
            enabled: !!templateItem?.id,
        },
    )

    const form = useForm<FormValues>({
        defaultValues: { page_count: 10, language: "uz" },
    })

    const { control, handleSubmit, reset, watch } = form

    const { mutate, isPending } = usePost({
        onSuccess: (data) => {
            if (!data?.uuid) return
            setUuid(data.uuid)
            downloadExcel({ data: dataDownload, name: watch("title") })
            reset()
        },
    })

    const { data } = useWebSocket<{ status: number }>(WS_URL)

    const animateProgress = (start: number, end: number, duration: number) => {
        if (intervalRef.current) clearInterval(intervalRef.current)
        const diff = end - start
        const intervalTime = 20
        const steps = duration / intervalTime
        const increment = diff / steps
        let current = start

        intervalRef.current = setInterval(() => {
            current += increment
            if (
                (increment > 0 && current >= end) ||
                (increment < 0 && current <= end)
            ) {
                current = end
                clearInterval(intervalRef.current!)
            }
            setLoadingProgress(Math.round(current))
        }, intervalTime)
    }

    useEffect(() => {
        if (!data?.status) return

        if (data.status === 1) {
            animateProgress(loadingProgress, 80, 5000)
        } else if (data.status === 2) {
            animateProgress(loadingProgress, 100, 1000)
        }
    }, [data])

    const onSubmit = (values: FormValues) => {
        animateProgress(0, 40, 2000)
        mutate(TEMPLATES_GENERATE, values)
    }

    return (
        <>
            <LoadingScreen isVisible={isPending} progress={loadingProgress} />

            <form onSubmit={handleSubmit(onSubmit)} className="text-foreground">
                {/* Hero */}
                <div className="text-center py-12 ">
                    <h1 className="text-2xl md:text-5xl font-bold sm:mb-4 mb-2">
                        AI bilan{" "}
                        <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                            Taqdimot
                        </span>{" "}
                        yarating
                    </h1>
                    <p className="text-muted-foreground  text-sm sm:text-lg max-w-xl mx-auto">
                        Professional ilmiy ishlaringizni sun'iy intellekt
                        yordamida tez va sifatli tayyorlang
                    </p>
                </div>

                {/* Main Content */}
                <div className="container mx-auto   space-y-6 md:space-y-8">
                    <div className="space-y-3">
                        <div className="md:w-1/2 grid grid-cols-2 gap-3">
                            <FormSelect
                                required
                                control={control}
                                name="language"
                                placeholder="Tilni tanlang"
                                options={[
                                    {
                                        value: "uz",
                                        label: "Uzbek",
                                    },
                                    {
                                        value: "ru",
                                        label: "Russia",
                                    },
                                    {
                                        value: "en",
                                        label: "English",
                                    },
                                ]}
                                valueKey="value"
                                labelKey="label"
                                className="dark:bg-card bg-muted"
                            />

                            <FormSelect
                                required
                                control={control}
                                name="page_count"
                                placeholder="Sahifalar soni"
                                options={Array.from({ length: 20 }).map(
                                    (_, index) => ({
                                        value: index + 1,
                                        label: `${index + 1} sahifa`,
                                    }),
                                )}
                                valueKey="value"
                                labelKey="label"
                                className="dark:bg-card bg-muted"
                            />
                        </div>
                        {/* Section 1: Mavzu */}
                        <section className="bg-card/80 backdrop-blur-sm rounded-2xl p-3 md:p-8 border border-border ">
                            <div className="flex items-center gap-4 sm:mb-6 mb-3">
                                <div className="sm:w-10 sm:h-10 h-8 w-8 rounded-full gradient-primary flex items-center justify-center text-lg font-bold text-white">
                                    1
                                </div>
                                <div>
                                    <h2 className="text-xl sm:font-bold font-medium flex items-center gap-2">
                                        <FileText className="w-5 h-5 text-primary" />
                                        Mavzuni yozing
                                    </h2>
                                    <p className="text-muted-foreground sm:block hidden text-sm">
                                        Tadqiqot mavzusini batafsil yozing
                                    </p>
                                </div>
                            </div>
                            <FormTextarea
                                required
                                methods={form}
                                name="title"
                                placeholder="Masalan: Sun'iy intellekt va uning ta'lim sohasidagi ahamiyati"
                                className="h-[120px] sm:h-max text-base resize-none bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:ring-primary/20"
                            />
                        </section>
                    </div>

                    {/* Section 2: Shablon */}
                    <section className="bg-card/80 backdrop-blur-sm rounded-2xl p-3 md:p-8 border border-border ">
                        <div className="flex items-center gap-4 sm:mb-6 mb-3">
                            <div className="sm:w-10 sm:h-10 h-8 w-8 rounded-full gradient-primary flex items-center justify-center text-lg font-bold text-white">
                                2
                            </div>
                            <div>
                                <h2 className="text-xl  sm:font-bold font-medium flex items-center gap-2">
                                    <BookOpen className="w-5 h-5 text-primary" />
                                    Shablonni tanlang
                                </h2>
                                <p className="text-muted-foreground  sm:block hidden text-sm">
                                    Tadqiqot uchun mos shablonni tanlang
                                </p>
                            </div>
                        </div>

                        {/* Search and Categories */}
                        <div className="flex flex-col  gap-4 sm:mb-6 mb-3">
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
                                                templates?.count || 0,
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
                                            className={`px-4 py-2 rounded-full text-sm sm:font-medium transition-all ${
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

                        <>
                            <Controller
                                name="template"
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <div className="grid grid-cols-2 md:grid-cols-4 sm:gap-4 gap-2">
                                        {isSuccessTemplate &&
                                            templates?.results?.map(
                                                (template) => (
                                                    <button
                                                        type="button"
                                                        key={template.id}
                                                        onClick={() =>
                                                            field.onChange(
                                                                template.id,
                                                            )
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
                                                            src={
                                                                template.poster
                                                            }
                                                            alt={template.name}
                                                            className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                                        <div className="absolute bottom-0 left-0 right-0 sm:p-3 p-2 text-left">
                                                            <span className="sm:text-xs text-[10px] text-white bg-primary/90 px-2 py-1 rounded-full backdrop-blur-sm">
                                                                {
                                                                    template.category
                                                                }
                                                            </span>

                                                            <h3 className="text-white sm:font-semibold sm:mt-2 mt-1">
                                                                {template.name}
                                                            </h3>
                                                        </div>
                                                        <Button
                                                            size={"sm"}
                                                            type="button"
                                                            variant={"gradient"}
                                                            onClick={(e) => {
                                                                e.stopPropagation()
                                                                openModal()
                                                                setTemplateItem(
                                                                    template,
                                                                )
                                                            }}
                                                            className="absolute top-2 right-2 z-10 sm:!h-7 sm:!w-7 !w-6 !h-6 text-white"
                                                        >
                                                            <Eye className="sm:!w-4 sm:!h-4  !w-3.5 !h-3.5" />
                                                        </Button>
                                                    </button>
                                                ),
                                            )}
                                    </div>
                                )}
                            />

                            {isSuccessTemplate &&
                                Number(templates?.count) > 8 && (
                                    <div className="flex  mt-4 sm:mt-6 justify-center">
                                        <ParamPagination
                                            totalPages={templates?.pages}
                                            changePageSize={false}
                                        />
                                    </div>
                                )}
                        </>
                    </section>

                    {/* Section 3: Rasm uslubi */}
                    <section className="bg-card/80 backdrop-blur-sm rounded-2xl p-3 md:p-8 border border-border ">
                        <div className="flex items-center gap-4 sm:mb-6 mb-3">
                            <div className="sm:w-10 sm:h-10 h-8 w-8 rounded-full gradient-primary flex items-center justify-center text-lg font-bold text-white">
                                3
                            </div>
                            <div>
                                <h2 className="text-xl  sm:font-bold font-medium flex items-center gap-2">
                                    <Palette className="w-5 h-5 text-primary" />
                                    Rasm uslubini tanlang
                                </h2>
                                <p className="text-muted-foreground sm:block hidden text-sm">
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
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
                                    {imageStyles.map((style) => (
                                        <button
                                            type="button"
                                            key={style.id}
                                            onClick={() =>
                                                field.onChange(style.id)
                                            }
                                            className={`sm:p-5 p-3 rounded-xl border-2 transition-all text-center ${
                                                field.value === style.id ?
                                                    "border-primary bg-accent ring-2 ring-primary/30"
                                                :   "border-border bg-secondary/50 hover:border-primary/50 hover:bg-secondary"
                                            }`}
                                        >
                                            <div className="text-4xl mb-3">
                                                {style.icon}
                                            </div>
                                            <h3 className="sm:font-semibold font-medium text-foreground">
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
                    <div className="flex justify-center ">
                        <Button
                            type="submit"
                            loading={isPending}
                            className="px-12 py-6 w-full sm:w-max text-lg font-semibold gradient-primary border-0 text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed  shadow-primary/25"
                        >
                            <Sparkles className="w-5 h-5 mr-2" />
                            Tadqiqot yaratish
                        </Button>
                    </div>
                </div>
            </form>

            <Modal
                size="max-w-4xl"
                modalKey="template-view"
                title={templateItem?.name}
            >
                <ScrollArea className="max-h-[80vh] ">
                    {templatesView && templatesView?.length > 0 ?
                        templatesView?.map((item, index) => (
                            <div
                                key={index}
                                className="overflow-hidden rounded-lg mt-3"
                            >
                                <img
                                    src={item}
                                    alt={`Shablon-rasmi-${index}`}
                                    className="w-full aspect-[4/3] object-cover "
                                />
                            </div>
                        ))
                    :   <div className="w-full h-64 flex items-center justify-center text-muted-foreground border border-dashed rounded-lg">
                            Rasm mavjud emas
                        </div>
                    }
                </ScrollArea>
            </Modal>
        </>
    )
}

export default TadqiqotCreate
