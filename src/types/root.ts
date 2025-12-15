type SearchParams = {
    page?: number;
    id?: string
    date?: string
    month?: string
    search?: string
    tabs?: string
    page_size?: string
    page_tabs?: string
    start_date?: string
    end_date?: string
    category?: string
};


type TemplateCategory = {
    id: number
    name: string
    templates_count: number
}


type Templates = {
    id: number
    name: string
    slides_count: number
    size: number
    poster: string
    category: string
}



