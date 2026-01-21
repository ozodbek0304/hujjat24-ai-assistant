"use client"

import { FormFormatNumberInput } from "@/components/form/format-number-input"
import FormInputOTP from "@/components/form/input-otp"
import { Button } from "@/components/ui/button"
import {
    PAYMENT,
    PAYMENT_CARD_HOLDER_NAME,
    PAYMENT_VERIFY,
} from "@/constants/api-endpoints"
import { useModal } from "@/hooks/useModal"
import { usePost } from "@/hooks/usePost"
import { cn } from "@/lib/utils"
import { useNavigate } from "@tanstack/react-router"
import { CheckCircle, Phone } from "lucide-react"
import { useEffect, useState } from "react"
import { useForm, useWatch } from "react-hook-form"
import { toast } from "sonner"
import Image from "../custom/image"
import { FormNumberInput } from "../form/number-input"

const PAYMENT_OPTIONS = [
    { id: "5", name: "Karta orqali", icon: "/payment/uzcard_humo.png" },
    { id: "1", name: "Click", icon: "/payment/click.png" },
]

type CardForm = {
    card_number: string
    expire: string
    code: string
    amount: number
}
type Response = {
    transaction_id?: number
    phone_number?: string
    holder_name?: string
    payment_url?: string
}

export function PaymentMain() {
    const [method, setMethod] = useState("5")
    const [response, setResponse] = useState<Response | null>(null)
    const { closeModal } = useModal(PAYMENT)
    const navigate = useNavigate()
    const { mutate, isPending } = usePost()
    const form = useForm<CardForm>()

    const card = useWatch({ control: form.control, name: "card_number" })
    const expiry = useWatch({ control: form.control, name: "expire" })
    const code = useWatch({ control: form.control, name: "code" })

    const hasFullCard = (card?.length ?? 0) >= 16 && expiry?.length >= 4

    // Karta raqami kiritilganda holder_name olish
    useEffect(() => {
        if (hasFullCard) {
            mutate(
                PAYMENT_CARD_HOLDER_NAME,
                { card_number: card },
                {
                    onSuccess: (data: Response) => {
                        if (data?.holder_name)
                            setResponse({ holder_name: data.holder_name })
                    },
                },
            )
        }
    }, [hasFullCard])

    // To‘lov yuborish
    const onSubmit = (data: CardForm) => {
        const provider = Number(method)
        const payload: CardForm & { provider: number } = {
            ...data,
            provider,
        }

        mutate(PAYMENT, payload, {
            onSuccess: (res: Response) => {
                if (method === "5") {
                    setResponse((p) => ({ ...p, ...res }))
                    toast.success("Telefon raqamga SMS yuborildi 📩")
                } else if (res?.payment_url) {
                    navigate({ to: res.payment_url })
                    closeModal()
                }
            },
        })
    }

    const onSubmitVerify = () => {
        if (!response?.transaction_id) return
        mutate(
            PAYMENT_VERIFY,
            { code, uuid: response?.transaction_id },
            {
                onSuccess: () => {
                    toast.success("Balansingiz muvaffaqiyatli to'ldirildi ✅")
                    closeModal()
                    setResponse(null)
                },
            },
        )
    }

    return (
        <form
            onSubmit={form.handleSubmit(
                !response?.transaction_id ? onSubmit : onSubmitVerify,
            )}
            className="space-y-5"
        >
            {/* To‘lov usuli */}
            <div>
                <h3 className="font-semibold text-xl mb-2">To‘lov usuli</h3>
                <div className="flex gap-3 overflow-x-auto no-scrollbar-x">
                    {PAYMENT_OPTIONS.map((o) => (
                        <div
                            key={o.id}
                            onClick={() => {
                                setMethod(o.id)
                                setResponse(null)
                                form.reset()
                            }}
                            className={cn(
                                "flex justify-center items-center w-32 h-20 border rounded-lg cursor-pointer transition",
                                method === o.id ?
                                    "border-purple-500 bg-purple-50"
                                :   "hover:border-purple-400",
                            )}
                        >
                            <Image
                                src={o.icon}
                                alt={o.name}
                                width={100}
                                height={100}
                                className="object-contain"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {response?.transaction_id && (
                <>
                    <div className="p-4 rounded-lg border border-green-300 bg-green-50 space-y-1">
                        <p>
                            <strong>Karta egasi:</strong> {response.holder_name}
                        </p>
                        <p className="flex items-center gap-1">
                            <Phone className="h-4 w-4 text-green-500" />
                            <strong>{response.phone_number}</strong>
                        </p>
                        <p className="text-green-600 text-sm mt-1">
                            Telefon raqamga SMS yuborildi 📩
                        </p>
                    </div>
                </>
            )}

            <div className="space-y-2">
                {/* Summa */}
                <FormNumberInput
                    required
                    control={form.control}
                    name="amount"
                    label="Summa"
                />

                {/* Karta formasi */}
                {method === "5" && !response?.transaction_id && (
                    <div className="grid grid-cols-5 items-center gap-3">
                        <FormFormatNumberInput
                            format="#### #### #### ####"
                            required
                            control={form.control}
                            name="card_number"
                            label="Karta raqamingiz"
                            allowEmptyFormatting
                            mask="-"
                            wrapperClassName="col-span-3"
                        />
                        <FormFormatNumberInput
                            format="##/##"
                            placeholder="MM/YY"
                            required
                            control={form.control}
                            name="expire"
                            label="Muddati"
                            allowEmptyFormatting
                            mask={["M", "M", "Y", "Y"]}
                            wrapperClassName="col-span-2"
                        />
                    </div>
                )}

                {/* Holder name */}
                {response?.holder_name && !response?.transaction_id && (
                    <div className="p-3 rounded-lg border bg-gray-50 text-sm">
                        <strong>Karta egasi:</strong> {response.holder_name}
                    </div>
                )}
            </div>

            {/* Button */}
            {!response?.transaction_id ?
                <>
                    <div className="bg-purple-500/10 border border-purple-500/20 p-3 rounded-lg">
                        <div className="flex items-center gap-2 text-purple-500">
                            <CheckCircle className="h-4 w-4" />
                            <span className="text-sm font-semibold">
                                Firibgarlik himoyasi faol
                            </span>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">
                            Barcha to'lovlar bank darajasida xavfsizlik bilan
                            himoyalangan
                        </p>
                    </div>
                </>
            :   <FormInputOTP methods={form} name="code" disabled={isPending} />
            }

            <Button
                type="submit"
                variant={"gradient"}
                disabled={isPending}
                loading={isPending}
                className={cn(
                    "w-full  py-5 cursor-pointer",
                    response?.transaction_id &&
                        "bg-green-500 hover:bg-green-600",
                )}
            >
                {response?.transaction_id ? "Tasdiqlash" : "Davom etish"}
            </Button>
        </form>
    )
}
