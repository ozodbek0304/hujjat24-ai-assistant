import Profile from "@/pages/profile"
import { createLazyFileRoute } from "@tanstack/react-router"

export const Route = createLazyFileRoute("/_main/profile")({
    component: Profile,
})
