import { useModal } from "@/hooks/useModal"
import { usePost } from "@/hooks/usePost"
import { useAuthStore } from "@/store/auth-store"
import { MessageCircle } from "lucide-react"
import React from "react"
import { useForm, useWatch } from "react-hook-form"
import { toast } from "sonner"
import FormInputOTP from "../form/input-otp"

type ConfimFields = {
    code: string
}

export default function ConfimForm() {
    const form = useForm<ConfimFields>()
    const { closeModal } = useModal("login-modal")
    const { setToken } = useAuthStore()

    const { mutate, isPending } = usePost({
        onSuccess: (data) => {
            if (data?.access_token) {
                setToken(data?.access_token)
            }
            closeModal()
            toast.success("Muavffaqiyatli kirdingiz!")
        },
    })

    const codeValue = useWatch({ control: form.control, name: "code" })

    function handleSubmit(vals: ConfimFields) {
        mutate("auth/login", vals)
    }

    React.useEffect(() => {
        if (codeValue?.length === 6) {
            form.handleSubmit(handleSubmit)()
        }
    }, [codeValue])

    return (
        <form
            className="flex flex-col items-center gap-4"
            onSubmit={form.handleSubmit(handleSubmit)}
        >
            <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-primary via-pink-500 to-primary rounded-full flex items-center justify-center mx-auto mb-2">
                    <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-1">
                    Kodni Kiriting
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                    <a
                        href="tg://resolve?domain=DocBazarBot"
                        rel="noopener noreferrer"
                        className="lowercase  font-semibold cursor-pointer text-primary"
                    >
                        @hujjat24_ai_bot
                    </a>{" "}
                    telegram botiga kiring va <br />
                    <span className="font-medium">2 daqiqalik</span> kodingizni
                    oling.
                </p>
            </div>

            <FormInputOTP disabled={isPending} methods={form} name="code" />
            <div className="w-full pt-4 border-t  ">
                <p className="text-center text-sm text-foreground">
                    Kod kelmadimi?{" "}
                    <a
                        href="tg://resolve?domain=DocBazarBot"
                        rel="noopener noreferrer"
                        className="lowercase   hover:underline font-medium cursor-pointer text-primary"
                    >
                        Botga o'ting
                    </a>{" "}
                </p>
            </div>
        </form>
    )
}
