import { Badge } from "@/components/ui/badge"
import { PAYMENT } from "@/constants/api-endpoints"
import { useGet } from "@/hooks/useGet"
import { formatMoney } from "@/lib/format-money"
import { format } from "date-fns"
import { Wallet } from "lucide-react"

const paymentHistory: PaymentHistoryItem[] = [
  { id: 1, amount: 5000, created_at: "2026-01-10T08:15:00Z", description: "Electricity bill" },
  { id: 2, amount: 12000, created_at: "2026-01-11T10:30:00Z", description: "Internet subscription" },
  { id: 3, amount: 7500, created_at: "2026-01-12T14:45:00Z", description: "Groceries" },
  { id: 4, amount: 2000, created_at: "2026-01-13T09:00:00Z" },
  { id: 5, amount: 15000, created_at: "2026-01-14T18:20:00Z", description: "Rent payment" },
  { id: 6, amount: 3000, created_at: "2026-01-15T12:00:00Z", description: "Coffee shop" },
  { id: 7, amount: 4500, created_at: "2026-01-16T16:10:00Z", description: "Fuel" },
  { id: 8, amount: 6000, created_at: "2026-01-17T11:25:00Z" },
  { id: 9, amount: 8500, created_at: "2026-01-18T15:40:00Z", description: "Gym membership" },
  { id: 10, amount: 10000, created_at: "2026-01-19T19:55:00Z", description: "Online course" }
];


export const PaymentHistoryMain = () => {
    const { data: payments, isSuccess } = useGet<PaymentHistoryItem[]>(PAYMENT)

    // if (!payments || payments.length === 0)
    //     return (
    //         <div className="flex items-center justify-center h-[50vh]">
    //             To'lov tarixi mavjud emas.
    //         </div>
    //     )

    return (
        <div className="space-y-3 max-w-2xl w-full">
            <div className="w-full flex items-center gap-2">
                <h1 className="text-lg">To'lovlar tarixi</h1>
                <Badge>{paymentHistory?.length}</Badge>
            </div>
            {paymentHistory.map((payment) => (
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
                                        new Date(payment.created_at),
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


