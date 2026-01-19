"use client"

import { LogIn, User } from "lucide-react"
import { Button } from "../ui/button"

import { useModal } from "@/hooks/useModal"
import { useAuthStore } from "@/store/auth-store"
import { useNavigate } from "@tanstack/react-router"

export default function UserMenu() {
    const navigate = useNavigate()
    const { token } = useAuthStore()
    const { openModal } = useModal("login-modal")

    return (
        <div className="flex gap-2 min-w-1/2">
            {" "}
            <>
                {token ?
                    <Button
                        onClick={() => navigate({ to: "/profile" })}
                        type="button"
                        size="sm"
                        variant="gradient"
                    >
                        <User size={18} /> Profil
                    </Button>
                :   <Button
                        type="button"
                        size="sm"
                        variant="gradient"
                        className="text-white"
                        onClick={openModal}
                    >
                        <LogIn size={18} />
                        Kirish
                    </Button>
                }
            </>
        </div>
    )
}
