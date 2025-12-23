"use client"

import { LayoutList, LogIn, LogOut, User } from "lucide-react"
import { Button } from "../ui/button"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useTelegramUser } from "@/hooks/useIsTelegram"
import { useModal } from "@/hooks/useModal"
import { cn } from "@/lib/utils"
import { useAuthStore } from "@/store/auth-store"
import { toast } from "sonner"

import ConfimForm from "../auth/confirm-form"
import Modal from "../custom/modal"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

export default function UserMenu() {
    const telegramUser = useTelegramUser()
    const { token, clearToken } = useAuthStore()
    const { openModal } = useModal("login-modal")

    const functionLogOut = () => {
        clearToken()
        toast.info("Muvaffaqiyatli chiqdingiz!")
    }

    if (telegramUser.loading) return null

    return (
        <div className="flex gap-2 min-w-1/2">
            {telegramUser.isTelegram ?
                telegramUser.user_id ?
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild className="cursor-pointer">
                            <Avatar className={cn("h-10 w-10")}>
                                <AvatarImage
                                    src={telegramUser.photo_url}
                                    alt={telegramUser.first_name}
                                />
                                <AvatarFallback className="uppercase">
                                    {telegramUser.first_name?.slice(0, 2)}
                                </AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent
                            className="min-w-56"
                            align="end"
                            sideOffset={4}
                        >
                            <DropdownMenuLabel className="p-0 font-normal">
                                <div className="flex items-center gap-2 px-1 py-1.5 text-sm">
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage
                                            src={telegramUser.photo_url}
                                        />
                                        <AvatarFallback>
                                            {telegramUser.first_name?.slice(
                                                0,
                                                2,
                                            )}
                                        </AvatarFallback>
                                    </Avatar>

                                    <div className="grid flex-1 leading-tight">
                                        <span className="truncate font-medium">
                                            {telegramUser.first_name}
                                        </span>
                                        <span className="truncate text-xs text-muted-foreground">
                                            @{telegramUser.username}
                                        </span>
                                    </div>
                                </div>
                            </DropdownMenuLabel>
                        </DropdownMenuContent>
                    </DropdownMenu>
                :   null
            :   <>
                    {token ?
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button size="sm" variant="gradient">
                                    <User size={18} /> Profil
                                </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent>
                                <DropdownMenuRadioItem
                                    className="cursor-pointer p-2"
                                    value="1"
                                >
                                    <LayoutList size={17} className="mr-2" />
                                    Yaratilgan ishlarim
                                </DropdownMenuRadioItem>

                                <DropdownMenuRadioItem
                                    onClick={functionLogOut}
                                    className="cursor-pointer p-2"
                                    value="2"
                                >
                                    <LogOut size={17} className="mr-2" />
                                    Chiqish
                                </DropdownMenuRadioItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
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
            }

            <Modal modalKey="login-modal">
                <ConfimForm />
            </Modal>
        </div>
    )
}
