"use client"

import { LogIn, User } from "lucide-react"
import { Button } from "../ui/button"

import { useModal } from "@/hooks/useModal"
import { useAuthStore } from "@/store/auth-store"

export default function UserMenu() {
    const { token } = useAuthStore()
    const { openModal } = useModal("login-modal")

    return (
        <div className="flex gap-2 min-w-1/2">
            {" "}
            <>
                {token ?
                    <Button size="sm" variant="gradient">
                        <User size={18} /> Profil
                    </Button>
                :   <Button
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
