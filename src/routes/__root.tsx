import { Toaster } from "@/components/ui/sonner"
import {
    Outlet,
    ScrollRestoration,
    createRootRoute,
    redirect,
} from "@tanstack/react-router"

import { ThemeProvider } from "@/layouts/theme"
import { ViewProvider } from "@/layouts/view"
import { ModalProvider } from "@/providers/modal-provider"
import { getAccessToken } from "@/services/axios-instance"

export const Route = createRootRoute({
    component: RootComponent,
    beforeLoad: () => {
        const token = getAccessToken()
        if (token) {
            throw redirect({
                to: "/",
            })
        }
    },
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
            <ThemeProvider defaultTheme="light" storageKey="theme">
                <ViewProvider>
                    <Outlet />
                </ViewProvider>
                <Toaster />
            </ThemeProvider>
            <ScrollRestoration getKey={(location) => location.pathname} />
        </ModalProvider>
    )
}
