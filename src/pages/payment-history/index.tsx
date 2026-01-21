import EmptyBox from "@/components/custom/empty-box"
import { Badge } from "@/components/ui/badge"
import { PAYMENT } from "@/constants/api-endpoints"
import { useGet } from "@/hooks/useGet"
import { formatMoney } from "@/lib/format-money"
import { format } from "date-fns"
import { Wallet } from "lucide-react"


export const PaymentHistoryMain = () => {
    const { data: payments, isSuccess } = useGet<PaymentHistoryItem[]>(PAYMENT)

    if (!payments || payments.length === 0)
        return (
            <EmptyBox/>
        )

    return (
        <div className="space-y-3 max-w-2xl w-full">
            <div className="w-full flex items-center gap-2">
                <h1 className="text-lg">To'lovlar tarixi</h1>
                <Badge>{payments?.length}</Badge>
            </div>
            {isSuccess &&
                payments.map((payment) => (
                    <div
                        key={payment.id}
                        className="flex justify-between items-center p-3 bg-card rounded-xl shadow-card"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                                <Wallet className="w-5 h-5 text-primary" />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-medium text-foreground">
                                    {formatMoney(payment.amount)} so'm
                                </span>
                                <span className="text-xs text-muted-foreground">
                                    {format(
                                        payment.created_at,
                                        "yyyy-MM-dd HH:mm",
                                    )}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    )
}
