import ConfimForm from "@/components/auth/confirm-form"
import TelegramWebApp from "@/components/auth/telegram-button"
import Modal from "@/components/custom/modal"
import Header from "@/components/header"
import BottomNav from "@/components/header/header-bottom"
import { PaymentMain } from "@/components/payments/payment"
import { PAYMENT } from "@/constants/api-endpoints"
import type { SEARCH_KEY } from "@/constants/default"
import { cn } from "@/lib/utils"
import { getAccessToken } from "@/services/axios-instance"
import {
    createFileRoute,
    Outlet,
    useLocation,
    useNavigate,
} from "@tanstack/react-router"
import { useEffect } from "react"

export const Route = createFileRoute("/_main")({
    component: MainLayout,
    validateSearch: (s: { [SEARCH_KEY]?: string }) => s,
})

function MainLayout() {
    const pathname = useLocation().pathname
    const navigate = useNavigate()
    const token = getAccessToken()

    useEffect(() => {
        if (!token) {
            navigate({ to: "/" })
        }
    }, [pathname])

    return (
        <div className="w-full h-full overflow-y-auto">
            <div
                className={cn(
                    "fixed top-0 right-0 z-30 transition-[width,height,padding] w-full",
                )}
            >
                <Header />
            </div>

            <main
                className={cn(
                    "mx-auto px-4 h-full overflow-y-auto  max-w-xl w-full  pt-20 pb-24 flex flex-col ",
                )}
            >
                <Outlet />
                <TelegramWebApp />
            </main>

            <BottomNav />
            <Modal modalKey="login-modal">
                <ConfimForm />
            </Modal>
            <Modal modalKey={PAYMENT}>
                <PaymentMain />
            </Modal>
        </div>
    )
}

export default MainLayout
