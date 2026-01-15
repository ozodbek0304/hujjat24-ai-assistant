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
import { formatMoney } from "@/lib/format-money"
import { cn } from "@/lib/utils"
import { useNavigate } from "@tanstack/react-router"
import { CheckCircle, Phone } from "lucide-react"
import { useEffect, useState } from "react"
import { useForm, useWatch } from "react-hook-form"
import { toast } from "sonner"
import Image from "../custom/image"

const PAYMENT_OPTIONS = [
    { id: "5", name: "Karta orqali", icon: "/payment/uzcard_humo.png" },
    { id: "1", name: "Click", icon: "/payment/click.png" },
]

type CardForm = { card_number: string; expire: string; code: string }
type Response = {
    transaction_id?: number
    phone_number?: string
    holder_name?: string
    payment_url?: string
}
type DocumentProduct = {
    id: number
    price: number
}

export function DocumentPurchase({
    product,
    onSuccess,
}: {
    product: DocumentProduct
    onSuccess?: () => void
}) {
    const [method, setMethod] = useState("5")
    const [response, setResponse] = useState<Response | null>(null)
    const { closeModal } = useModal()
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
        const payload =
            method === "5" ?
                {
                    card_number: data.card_number,
                    expire: data.expire,
                    provider: 5,
                    product_id: product.id,
                }
            :   { provider: Number(method), product_id: product.id }

        mutate(PAYMENT, payload, {
            onSuccess: (res: Response) => {
                if (method === "5") {
                    setResponse((p) => ({ ...p, ...res }))
                    toast.success("Telefon raqamga SMS yuborildi 📩")
                } else if (res?.payment_url) {
                    navigate({ to: res.payment_url })
                    closeModal()
                    onSuccess?.()
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
                    toast.success("To'lov muvaffaqiyatli amalga oshirildi ✅")
                    closeModal()
                    setResponse(null)
                    onSuccess?.()
                },
            },
        )
    }

    const total = Number(product.price || 0)

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
                                    "border-blue-500 bg-blue-50"
                                :   "hover:border-blue-400",
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
                {/* Karta formasi */}
                {method === "5" && !response?.transaction_id && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <FormFormatNumberInput
                            format="#### #### #### ####"
                            required
                            control={form.control}
                            name="card_number"
                            label="Karta raqamingiz"
                            allowEmptyFormatting
                            mask="-"
                            wrapperClassName="sm:col-span-2"
                        />
                        <FormFormatNumberInput
                            format="##/##"
                            placeholder="MM/YY"
                            required
                            control={form.control}
                            name="expire"
                            label="Amal qilish muddati"
                            allowEmptyFormatting
                            mask={["M", "M", "Y", "Y"]}
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

            {/* Narxlar */}
            <div className="bg-gray-50 p-4 rounded-lg border">
                <div className="flex justify-between font-bold text-lg">
                    <span>Jami</span>
                    <span>{formatMoney(total)} so‘m</span>
                </div>
            </div>

            {/* Button */}
            {!response?.transaction_id ?
                <>
                    <div className="bg-green-500/10 border border-green-500/20 p-3 rounded-lg">
                        <div className="flex items-center gap-2 text-green-500">
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
                disabled={isPending}
                loading={isPending}
                className={cn(
                    "w-full bg-blue-500 hover:bg-blue-600 py-5 cursor-pointer",
                    response?.transaction_id &&
                        "bg-green-500 hover:bg-green-600",
                )}
            >
                {response?.transaction_id ? "Tasdiqlash" : "Davom etish"}
            </Button>
        </form>
    )
}
