import { Toaster } from "@/components/ui/sonner"
import {
    Outlet,
    ScrollRestoration,
    createRootRoute,
} from "@tanstack/react-router"

import { ThemeProvider } from "@/layouts/theme"
import { ViewProvider } from "@/layouts/view"
import { ModalProvider } from "@/providers/modal-provider"

export const Route = createRootRoute({
    component: RootComponent,
    validateSearch: (search: SearchParams): SearchParams => {
        return {
            page: search?.page ?? undefined,
            page_size: search?.page_size ?? undefined,
        }
    },
})

function RootComponent() {
    return (
        <ModalProvider>
            <ThemeProvider defaultTheme="dark" storageKey="theme">
                <ViewProvider>
                    <Outlet />
                </ViewProvider>
                <Toaster />
            </ThemeProvider>
            <ScrollRestoration getKey={(location) => location.pathname} />
        </ModalProvider>
    )
}
