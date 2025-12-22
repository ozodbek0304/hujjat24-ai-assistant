"use client"
import { LayoutList, LogIn, LogOut, User } from "lucide-react"
import { Button } from "../ui/button"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useIsTelegram } from "@/hooks/useIsTelegram"
import { useModal } from "@/hooks/useModal"
import { useAuthStore } from "@/store/auth-store"
import { toast } from "sonner"
import ConfimForm from "../auth/confirm-form"
import Modal from "../custom/modal"

export default function UserMenu() {
    const isTelegram = useIsTelegram()
    const { token, clearToken } = useAuthStore()
    const { openModal } = useModal("login-modal")

    const functionLogOut = async () => {
        clearToken()
        toast.info("Muavffaqiyatli chiqdingiz!")
    }

    return (
        <div className="flex gap-2">
            {token ?
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button size={"sm"} type="button" variant={"gradient"}>
                            <User size={18} /> Profil
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuRadioItem
                            className="p-2 cursor-pointer  focus:outline-none focus:ring-0"
                            value="1"
                        >
                            <LayoutList size={17} className="mr-2" /> Yaratilgan
                            ishlarim
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem
                            onClick={functionLogOut}
                            className="p-2 cursor-pointer  focus:outline-none focus:ring-0"
                            value="2"
                        >
                            <LogOut size={17} className="mr-2" />
                            Chiqish
                        </DropdownMenuRadioItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            :   !isTelegram && (
                    <Button
                        type="button"
                        size={"sm"}
                        className="text-white"
                        onClick={openModal}
                        variant={"gradient"}
                    >
                        <LogIn size={18} />
                        Kirish
                    </Button>
                )
            }
            <Modal modalKey="login-modal">
                <ConfimForm />
            </Modal>
        </div>
    )
}
