import SlideCreate from "@/pages/slide/create"
import { createLazyFileRoute } from "@tanstack/react-router"

export const Route = createLazyFileRoute("/_main/create-presentation")({
    component: SlideCreate,
})
