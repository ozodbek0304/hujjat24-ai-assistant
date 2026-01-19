import { PaymentHistoryMain } from "@/pages/payment-history"
import { createLazyFileRoute } from "@tanstack/react-router"

export const Route = createLazyFileRoute("/_main/payments-history")({
    component: PaymentHistoryMain,
})
