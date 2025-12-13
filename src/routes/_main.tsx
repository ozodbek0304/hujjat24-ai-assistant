import type { SEARCH_KEY } from "@/constants/default"
import { cn } from "@/lib/utils"
import { createFileRoute, Outlet } from "@tanstack/react-router"

export const Route = createFileRoute("/_main")({
    component: MainLayout,
    validateSearch: (s: { [SEARCH_KEY]?: string }) => s,
})

function MainLayout() {
    return (
        <main className={cn("mx-auto p-4 container")}>
            <Outlet />
        </main>
    )
}

export default MainLayout
