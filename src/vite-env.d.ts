/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_DEFAULT_URL: string;
    readonly VITE_MOBILE_URL: string;
    readonly VITE_FAST_URL: string;
    readonly VITE_SOCKET_URL: string;
    readonly VITE_HASHED_URL: string;
    readonly VITE_GOOGLE_MAPS_API_KEY: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}



export {}

declare global {
  interface Window {
    Telegram?: {
      WebApp: TelegramWebAppType
    }
  }
}

export interface TelegramWebAppType {
  initData: string
  initDataUnsafe?: {
    user?: TelegramUser
  }
  MainButton: {
    text: string
    show: () => void
    hide: () => void
    onClick: (callback: () => void) => void
  }
  expand: () => void
  requestContact: (callback: (result: TelegramContactResult) => void) => void
  showAlert: (text: string) => void
}

export interface TelegramUser {
  id: number
  first_name: string
  last_name?: string
  username?: string
  phone_number?: string
}

export interface TelegramContactResult {
  phone_number?: string
  first_name?: string
  last_name?: string
}
