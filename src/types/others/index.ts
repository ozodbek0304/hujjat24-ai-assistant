

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


 
type Employee= {
  id: string
  employeeId: string
  fullName: string
  role: string
  schedule: Record<string, boolean>  
}


