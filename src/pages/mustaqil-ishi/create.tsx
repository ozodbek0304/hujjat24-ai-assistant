import FormInput from "@/components/form/input"
import { FormSelect } from "@/components/form/select"
import FormTextarea from "@/components/form/textarea"
import { Button } from "@/components/ui/button"
import { GENERATE_CONTENT, GENERATE_OUTLINE } from "@/constants/api-endpoints"
import { usePost } from "@/hooks/usePost"
import { languageOptions } from "@/lib/utils"
import {
    ArrowLeft,
    ArrowRight,
    Check,
    FileText,
    Plus,
    Sparkles,
    Trash2,
} from "lucide-react"
import { useRef, useState } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import LoadingScreen from "../slide/loading-screen"

const loadingSteps = [
    { icon: FileText, text: "Reja tahlil qilinmoqda..." },
    { icon: Sparkles, text: "AI yordamida kontent yaratilmoqda..." },
    { icon: Check, text: "Mustaqil ish tayyorlanmoqda..." },
]

const MustaqilIshiMain = () => {
    const [loadingProgress, setLoadingProgress] = useState(0)
    const [step, setStep] = useState(1)
    const intervalRef = useRef<any>(null)

    const form = useForm<FormValuesGenerate>({
        defaultValues: {
            language: "uz",
            outline_count: 5,
            plans: [
                {
                    outline: "",
                    type: 20,
                    user_document_id: 64,
                    order: 1,
                    id: Date.now(),
                },
            ],
        },
    })

    const { control, handleSubmit, getValues } = form
    const { fields, append, remove, replace } = useFieldArray({
        control,
        name: "plans",
    })

    const { mutate: generateOutline, isPending: isGenerating } = usePost({
        onSuccess: (data: { uuid: string; data: PlanItem[] }) => {
            if (data?.data && data?.data.length > 0) {
                const formattedPlans = data?.data?.map((item, index) => ({
                    outline: item.outline || "",
                    type: item.type || 20,
                    order: index + 1,
                    id: item.id || index + 1,
                    user_document_id: item.user_document_id || 64,
                }))
                replace(formattedPlans)
                setStep(2)
            }
            setLoadingProgress(0)
        },
    })

    const { mutate: generateContent, isPending: isContenting } = usePost({
        onSuccess: () => {},
    })

    const savePlanSequentially = async (plans: PlanItem[]) => {
        for (let i = 0; i < plans.length; i++) {
            await new Promise<void>((resolve, reject) => {
                generateContent(
                    GENERATE_CONTENT,
                    { outline_id: plans[i].id },
                    {
                        onSuccess: () => resolve(),
                        onError: (err) => reject(err),
                    },
                )
            })
        }
    }

    const animateProgress = (start: number, end: number, duration: number) => {
        if (intervalRef.current) clearInterval(intervalRef.current)
        const stepCount = duration / 20
        const step = (end - start) / stepCount
        let current = start
        intervalRef.current = setInterval(() => {
            current += step
            if ((step > 0 && current >= end) || (step < 0 && current <= end)) {
                current = end
                clearInterval(intervalRef.current)
            }
            setLoadingProgress(Math.round(current))
        }, 20)
    }

    // Step1 submit
    const handleStep1Submit = (values: FormValuesGenerate) => {
        if (fields[0]?.outline) {
            setStep(2)
        } else {
            animateProgress(0, 40, 2000)
            generateOutline(GENERATE_OUTLINE, values)
        }
    }

    const handleStep2Submit = async () => {
        const plans = getValues("plans")
        animateProgress(0, 100, plans.length * 1000)
        await savePlanSequentially(plans)
        // downloadPlans(plans)
    }

    const nextStep = handleSubmit(handleStep1Submit)
    const prevStep = () => setStep((prev) => prev - 1)

    return (
        <>
            <LoadingScreen
                loadingSteps={loadingSteps}
                isVisible={isGenerating || isContenting}
                progress={loadingProgress}
            />

            <form className="space-y-6">
                {/* HERO */}
                <div className="text-center py-10">
                    <h1 className="text-3xl md:text-5xl font-bold">
                        AI bilan{" "}
                        <span className="text-primary">Mustaqil ish</span>
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        AI yoki qo'lda reja tuzib professional ish yarating
                    </p>
                </div>

                {step === 1 && (
                    <>
                        <div>
                            <div className="md:w-1/2 grid grid-cols-2 gap-3  mb-3">
                                <FormSelect
                                    required
                                    control={control}
                                    name="language"
                                    placeholder="Tilni tanlang"
                                    options={languageOptions}
                                    valueKey="value"
                                    labelKey="label"
                                    className="dark:bg-card bg-muted"
                                />

                                <FormSelect
                                    required
                                    control={control}
                                    name="outline_count"
                                    placeholder="Rejalar soni"
                                    options={Array.from({ length: 7 }).map(
                                        (_, index) => ({
                                            value: index + 1,
                                            label: `${index + 1}  reja`,
                                        }),
                                    )}
                                    valueKey="value"
                                    labelKey="label"
                                    className="dark:bg-card bg-muted"
                                />
                            </div>

                            {/* ASOSIY MA'LUMOT */}
                            <section className="bg-card/80 backdrop-blur-sm rounded-2xl p-4 md:p-8 border border-border ">
                                <h2 className="font-bold text-lg mb-4 flex gap-2 items-center">
                                    <FileText className="w-5 h-5" />
                                    Asosiy ma'lumotlar *
                                </h2>

                                <FormTextarea
                                    required
                                    methods={form}
                                    name="title"
                                    placeholder="Masalan: Sun'iy intellekt va uning ta'lim sohasidagi ahamiyati"
                                    className="h-[120px] sm:h-max text-base resize-none bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:ring-primary/20"
                                />
                            </section>
                        </div>

                        {/* TA'LIM MUASSASASI */}
                        <section className="bg-card/80 backdrop-blur-sm rounded-2xl p-4 md:p-8 border border-border ">
                            <h2 className="font-bold text-lg mb-4">
                                Ta'lim ma'lumotlari
                            </h2>

                            <div className="grid md:grid-cols-3 gap-3">
                                <FormInput
                                    methods={form}
                                    name="student"
                                    label="Talaba FIO"
                                />
                                <FormInput
                                    methods={form}
                                    name="teacher"
                                    label="O'qituvchi FIO"
                                />
                                <FormInput
                                    methods={form}
                                    name="university"
                                    label="Universitet"
                                />
                            </div>
                        </section>

                        <div className="flex justify-end">
                            <Button
                                type="button"
                                onClick={nextStep}
                                className="flex gap-2"
                            >
                                Davom etish <ArrowRight className="w-4 h-4" />
                            </Button>
                        </div>
                    </>
                )}

                {/* REJALAR */}
                {step === 2 && (
                    <>
                        <section className="bg-card/80 backdrop-blur-sm rounded-2xl p-4 md:p-8 border border-border">
                            <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
                                Reja bo'limi
                            </h2>

                            <div className="mt-4 space-y-2">
                                {fields.map((field, index) => (
                                    <div
                                        key={field.id}
                                        className="flex gap-2 items-center"
                                    >
                                        <FormInput
                                            methods={form}
                                            name={`plans.${index}.outline`}
                                            placeholder={`Reja ${index + 1}`}
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size={"sm"}
                                            onClick={() => remove(index)}
                                        >
                                            <Trash2 className="w-4 h-4 text-red-500" />
                                        </Button>
                                    </div>
                                ))}

                                <Button
                                    type="button"
                                    onClick={() =>
                                        append({
                                            outline: "",
                                            type: 20,
                                            user_document_id: 64,
                                            order: fields.length + 1,
                                            id: Date.now(),
                                        })
                                    }
                                    className="flex gap-2 w-full"
                                >
                                    <Plus className="w-4 h-4" /> Reja qo'shish
                                </Button>
                            </div>
                        </section>

                        <div className="flex justify-between mt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={prevStep}
                                className="flex gap-2"
                            >
                                <ArrowLeft className="w-4 h-4" /> Orqaga
                            </Button>

                            <Button
                                type="button"
                                loading={isGenerating || isContenting}
                                onClick={handleStep2Submit}
                                className="flex gap-2"
                            >
                                <Sparkles className="w-5 h-5" /> Mustaqil ish
                                yaratish
                            </Button>
                        </div>
                    </>
                )}
            </form>
        </>
    )
}

export default MustaqilIshiMain
