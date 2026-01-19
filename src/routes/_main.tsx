import ConfimForm from "@/components/auth/confirm-form"
import TelegramWebApp from "@/components/auth/telegram-button"
import Modal from "@/components/custom/modal"
import Header from "@/components/header"
import BottomNav from "@/components/header/header-bottom"
import { PaymentMain } from "@/components/payments/payment"
import { PAYMENT } from "@/constants/api-endpoints"
import type { SEARCH_KEY } from "@/constants/default"
import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import { createFileRoute, Outlet } from "@tanstack/react-router"

export const Route = createFileRoute("/_main")({
    component: MainLayout,
    validateSearch: (s: { [SEARCH_KEY]?: string }) => s,
})

function MainLayout() {
    const isMobile = useIsMobile()
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
                    "mx-auto px-4 h-full overflow-y-auto  container  pt-20 pb-24 flex flex-col ",
                )}
            >
                <Outlet />
                <TelegramWebApp />
            </main>

            {isMobile && <BottomNav />}
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
