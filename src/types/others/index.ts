

type PaginationProps = {
    totalPages?: number | undefined
    paramName?: string
    disabled?: boolean
    page_sizes?: number[]
    pageSizeParamName?: string
    changePageSize?: boolean
    PageSize?: number
}


type MonthCalProps = {
    selectedMonth?: Date
    onMonthSelect?: (date: Date) => void
    onYearForward?: () => void
    onYearBackward?: () => void
    callbacks?: {
        yearLabel?: (year: number) => string
        monthLabel?: (month: Month) => string
    }
    variant?: {
        calendar?: {
            main?: ButtonVariant
            selected?: ButtonVariant
        }
        chevrons?: ButtonVariant
    }
    minDate?: Date
    maxDate?: Date
    disabledDates?: Date[]
    disabled?: boolean
}

type ButtonVariant =
    | "default"
    | "outline"
    | "ghost"
    | "link"
    | "destructive"
    | "secondary"
    | null
    | undefined
type Month = {
    number: number
    name: string
}




type ListResponse<T> = {
    pages: number
    count: number
    results: T[]
}



type Employee = {
    id: string
    employeeId: string
    fullName: string
    role: string
    schedule: Record<string, boolean>
}



type PlanItem = {
    outline: string
    type: number
    user_document_id: number
    order: number
    id: number
}

type FormValuesGenerate = {
    title: string
    language: string
    outline_count: number

    student: string
    teacher: string
    university: string

    plan_mode: "ai" | "manual"
    plans: PlanItem[]
}


type Profile = {
    id: number
    telegram_user_id: number
    is_active: boolean
    first_name: string
    last_name: string
    email: string
    phone: string
    wallet: number
}

type DocumentItem = {
    uuid: string
    title: string
    amount: number
    created_at: string
    page_count: number | null
    type: string
    service: number
    language: string
    image: string
    desc: string

}