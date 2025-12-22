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

export interface TelegramUser {
  id: number
  first_name?: string
  last_name?: string
  username?: string
  language_code?: string
}

export interface TelegramContactResult {
  success: boolean
  responseUnsafe?: {
    contact?: {
      user_id: number
      phone_number: string
      first_name?: string
      last_name?: string
    }
  }
}

export interface TelegramMainButton {
  text: string
  show: () => void
  hide: () => void
  onClick: (callback: () => void) => void
}

export interface TelegramWebAppType {
  initData: string
  initDataUnsafe?: {
    user?: TelegramUser
  }
  MainButton: TelegramMainButton
  expand: () => void
  requestContact: (callback: (result: TelegramContactResult) => void) => void
  showAlert: (text: string) => void
  enableClosingConfirmation?: () => void
  setHeaderColor?: (color: string) => void
  setBackgroundColor?: (color: string) => void
  ready?: () => void
  isClosingConfirmationEnabled:boolean
}



export interface TelegramWebAppType {
  initData: string
  initDataUnsafe?: {
    user?: TelegramUser
  }
  MainButton: TelegramMainButton
  expand: () => void
  requestContact: (callback: (result: TelegramContactResult) => void) => void
  showAlert: (text: string) => void
  enableClosingConfirmation?: () => void
  setHeaderColor?: (color: string) => void
  setBackgroundColor?: (color: string) => void
  ready?: () => void
}



export interface TelegramContactResult {
  phone_number?: string
  first_name?: string
  last_name?: string
}
