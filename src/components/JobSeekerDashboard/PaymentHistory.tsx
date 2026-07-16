import { useGetPaymentDetails } from "@/services/useGetPaymentDetails";
import { CommonObjectType } from "@/types";

function formatCurrency(amount?: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  }).format(amount || 0);
}

function formatDate(dateString?: string) {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getStatusTheme(status?: string) {
  switch ((status || "").toLowerCase()) {
    case "paid":
    case "completed":
    case "success":
      return { bg: "bg-emerald-50", text: "text-emerald-600", dot: "bg-emerald-500" };
    case "pending":
    case "created":
      return { bg: "bg-amber-50", text: "text-amber-600", dot: "bg-amber-500" };
    case "failed":
    case "cancelled":
      return { bg: "bg-rose-50", text: "text-rose-600", dot: "bg-rose-500" };
    default:
      return { bg: "bg-slate-100", text: "text-slate-600", dot: "bg-slate-500" };
  }
}

function PaymentHistory() {
  const paymentApi = useGetPaymentDetails({
    page: 1,
    page_size: 100,
    sort: ["-created_date"],
  }) as {
    data?: {
      total_amount?: number;
      total_orders_count?: number;
      paid_total_count?: number;
      data?: CommonObjectType[];
    };
    isLoading: boolean;
    error: unknown;
  };

  const allPayments = paymentApi.data?.data || [];
  
  // Exclude payments that are just in "created" state (abandoned checkouts)
  const payments = allPayments.filter((p) => {
    const status = String(p.status || "").toLowerCase();
    return status !== "created";
  });

  return (
    <section className="mb-8 mt-12">
      {/* Premium Header */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="font-extrabold text-3xl md:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-indigo-900 to-blue-700 tracking-tight mb-2">
            Payment History
          </h2>
          <p className="text-slate-500 font-medium text-sm md:text-base">
            Overview of all your transactions
          </p>
        </div>
        
        {/* Stat Widgets */}
        <div className="flex gap-4">
          <div className="flex flex-col rounded-2xl bg-gradient-to-br from-white to-slate-50 px-6 py-3 border border-slate-200/60 shadow-[0_4px_12px_rgba(0,0,0,0.02)]">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Total Orders</span>
            <span className="text-xl font-extrabold text-slate-800">
              {allPayments.filter(p => ["paid", "completed", "success"].includes(String(p.status || "").toLowerCase())).length}
            </span>
          </div>
          <div className="flex flex-col rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50/50 px-6 py-3 border border-blue-100/60 shadow-[0_4px_12px_rgba(37,99,235,0.04)]">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-1">Total Spent</span>
            <span className="text-xl font-extrabold text-blue-700">{formatCurrency(paymentApi.data?.total_amount)}</span>
          </div>
        </div>
      </div>

      {paymentApi.isLoading && (
        <div className="py-12 text-center text-slate-400 font-medium">Loading your transactions...</div>
      )}

      {paymentApi.error && (
        <div className="rounded-2xl bg-red-50/50 border border-red-100 px-6 py-4 text-sm text-red-600 font-medium">
          Failed to load payment history.
        </div>
      )}

      {!paymentApi.isLoading && !paymentApi.error && payments.length === 0 && (
        <div className="rounded-3xl border border-slate-100 bg-slate-50/30 px-6 py-16 text-center text-slate-400 font-medium">
          No payments found yet.
        </div>
      )}

      {/* Sleek Transaction List */}
      {!paymentApi.isLoading && !paymentApi.error && payments.length > 0 && (
        <div className="flex flex-col gap-3">
          {payments.map((payment) => {
            const statusTheme = getStatusTheme(String(payment.status || ""));
            return (
            <div 
              key={String(payment.id)}
              className="group flex flex-col md:flex-row md:items-center justify-between p-5 rounded-2xl bg-white border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_24px_rgba(37,99,235,0.06)] hover:border-blue-100 transition-all duration-300 hover:-translate-y-0.5"
            >
              <div className="flex items-center gap-4 mb-4 md:mb-0">
                <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-lg mb-0.5">{String(payment.plan_type || "Premium Plan")}</h3>
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                    <span>Order #{String(payment.gateway_order_id || payment.receipt || "N/A")}</span>
                    <span>•</span>
                    <span>{formatDate(String(payment.created_date || ""))}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-6 md:w-auto w-full pl-16 md:pl-0">
                <span className={`inline-flex items-center gap-1.5 rounded-full ${statusTheme.bg} px-3 py-1 text-xs font-bold ${statusTheme.text} uppercase tracking-wide`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${statusTheme.dot}`}></span>
                  {String(payment.status || "N/A")}
                </span>
                <span className="font-extrabold text-xl text-slate-800">
                  {formatCurrency(Number(payment.amount || 0))}
                </span>
              </div>
            </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default PaymentHistory;
