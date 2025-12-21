import TadqiqotCreate from "@/pages/slide/create"
import { createLazyFileRoute } from "@tanstack/react-router"

export const Route = createLazyFileRoute("/_main/create-presentation-generate")(
    {
        component: TadqiqotCreate,
    },
)
