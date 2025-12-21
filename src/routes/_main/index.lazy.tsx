import MainSection from "@/pages/home"
import { createLazyFileRoute } from "@tanstack/react-router"

export const Route = createLazyFileRoute("/_main/")({
    component: MainSection,
})
