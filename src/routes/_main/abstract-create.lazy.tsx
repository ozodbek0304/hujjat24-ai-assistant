import ReferatYaratishMain from "@/pages/referat/create"
import { createLazyFileRoute } from "@tanstack/react-router"

export const Route = createLazyFileRoute("/_main/abstract-create")({
    component: ReferatYaratishMain,
})
