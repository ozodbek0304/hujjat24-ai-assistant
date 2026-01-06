import MustaqilIshiMain from "@/pages/mustaqil-ishi/create"
import { createLazyFileRoute } from "@tanstack/react-router"

export const Route = createLazyFileRoute("/_main/independent-work-create")({
    component: MustaqilIshiMain,
})
