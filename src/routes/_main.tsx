import TelegramWebApp from "@/components/auth/telegram-button"
import Header from "@/components/header"
import type { SEARCH_KEY } from "@/constants/default"
import { cn } from "@/lib/utils"
import { createFileRoute, Outlet } from "@tanstack/react-router"

export const Route = createFileRoute("/_main")({
    component: MainLayout,
    validateSearch: (s: { [SEARCH_KEY]?: string }) => s,
})

function MainLayout() {
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
                    "mx-auto p-4 h-full overflow-y-auto  container  pt-20 flex flex-col pb-4 sm:pb-10",
                )}
            >
                <Outlet />
                <TelegramWebApp />
            </main>
        </div>
    )
}

export default MainLayout
