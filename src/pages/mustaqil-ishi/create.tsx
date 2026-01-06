import FormInput from "@/components/form/input"
import { FormSelect } from "@/components/form/select"
import FormTextarea from "@/components/form/textarea"
import { Button } from "@/components/ui/button"
import { TEMPLATES_GENERATE } from "@/constants/api-endpoints"
import { usePost } from "@/hooks/usePost"
import { FileText, Plus, Sparkles, Trash2 } from "lucide-react"
import { useRef, useState } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import LoadingScreen from "../slide/loading-screen"

type PlanItem = {
    title: string
}

type FormValues = {
    title: string
    language: string
    page_count: number

    student_name: string
    teacher_name: string
    university: string

    plan_mode: "ai" | "manual"
    plans: PlanItem[]
}

const MustaqilIshiMain = () => {
    const [loadingProgress, setLoadingProgress] = useState(0)
    const intervalRef = useRef<any>(null)

    const form = useForm<FormValues>({
        defaultValues: {
            language: "uz",
            page_count: 10,
            plan_mode: "ai",
            plans: [{ title: "" }],
        },
    })

    const { control, handleSubmit, watch, reset } = form

    const planMode = watch("plan_mode")

    const { fields, append, remove } = useFieldArray({
        control,
        name: "plans",
    })

    const { mutate, isPending } = usePost({
        onSuccess: (data) => {
            if (!data?.uuid) return
            reset()
        },
    })

    const animateProgress = (start: number, end: number, duration: number) => {
        if (intervalRef.current) clearInterval(intervalRef.current)
        const step = (end - start) / (duration / 20)
        let current = start

        intervalRef.current = setInterval(() => {
            current += step
            if (current >= end) {
                current = end
                clearInterval(intervalRef.current)
            }
            setLoadingProgress(Math.round(current))
        }, 20)
    }

    const onSubmit = (values: FormValues) => {
        animateProgress(0, 40, 2000)
        mutate(TEMPLATES_GENERATE, values)
    }

    return (
        <>
            <LoadingScreen isVisible={isPending} progress={loadingProgress} />

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* HERO */}
                <div className="text-center py-10">
                    <h1 className="text-3xl md:text-5xl font-bold">
                        AI bilan{" "}
                        <span className="text-primary">Mustaqil ish</span>
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        AI yoki qo‘lda reja tuzib professional ish yarating
                    </p>
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
                        placeholder="Mustaqil ish mavzusi"
                    />
                </section>

                {/* TA'LIM MUASSASASI */}
                <section className="bg-card/80 backdrop-blur-sm rounded-2xl p-4 md:p-8 border border-border ">
                    <h2 className="font-bold text-lg mb-4">
                        Ta'lim ma'lumotlari
                    </h2>

                    <div className="grid md:grid-cols-3 gap-3">
                        <FormInput
                            methods={form}
                            name="student_name"
                            label="Talaba FIO"
                        />
                        <FormInput
                            methods={form}
                            name="teacher_name"
                            label="O‘qituvchi FIO"
                        />
                        <FormInput
                            methods={form}
                            name="university"
                            label="Universitet"
                        />
                    </div>
                </section>

                {/* REJALAR */}
                <section className="bg-card/80 backdrop-blur-sm rounded-2xl p-4 md:p-8 border border-border  space-y-4">
                    <h2 className="font-bold text-lg">Reja bo‘limi</h2>

                    <FormSelect
                        control={control}
                        name="plan_mode"
                        placeholder="Reja turi"
                        options={[
                            { value: "ai", label: "AI orqali yaratish" },
                            { value: "manual", label: "Qo‘lda yozish" },
                        ]}
                        valueKey="value"
                        labelKey="label"
                    />

                    {/* MANUAL PLAN INPUTS */}
                    {planMode === "manual" &&
                        fields.map((field, index) => (
                            <div
                                key={field.id}
                                className="flex gap-2 items-center"
                            >
                                <FormInput
                                    methods={form}
                                    name={`plans.${index}.title`}
                                    placeholder={`Reja ${index + 1}`}
                                />

                                {planMode === "manual" && (
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        onClick={() => remove(index)}
                                    >
                                        <Trash2 className="w-4 h-4 text-red-500" />
                                    </Button>
                                )}
                            </div>
                        ))}

                    {planMode === "manual" && (
                        <Button
                            type="button"
                            onClick={() => append({ title: "" })}
                            className="flex gap-2 w-full"
                        >
                            <Plus className="w-4 h-4" />
                            Reja qo‘shish
                        </Button>
                    )}

                    {planMode === "ai" && (
                        <p className="text-sm text-muted-foreground">
                            Rejalar AI tomonidan avtomatik yaratiladi, qo‘lda
                            o‘zgartirib bo‘lmaydi.
                        </p>
                    )}
                </section>

                {/* SUBMIT */}
                <div className="flex justify-center w-full">
                    <Button
                        type="submit"
                        loading={isPending}
                        className="px-10 py-6 text-lg font-semibold w-full sm:w-max"
                    >
                        <Sparkles className="w-5 h-5 mr-2" />
                        Mustaqil ish yaratish
                    </Button>
                </div>
            </form>
        </>
    )
}

export default MustaqilIshiMain
