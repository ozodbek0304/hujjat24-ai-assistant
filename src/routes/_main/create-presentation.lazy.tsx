import FeaturesGrid from "@/pages/category/features-grid"
import { createLazyFileRoute } from "@tanstack/react-router"

export const Route = createLazyFileRoute("/_main/create-presentation")({
    component: FeaturesGrid,
})
