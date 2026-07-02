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

function getStatusClass(status?: string) {
  switch ((status || "").toLowerCase()) {
    case "paid":
    case "completed":
    case "success":
      return "bg-green-100 text-green-800 border-green-200";
    case "pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "failed":
    case "cancelled":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
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

  const payments = paymentApi.data?.data || [];

  return (
    <section className="mb-8 rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Payment History</h2>
          <p className="text-sm text-gray-500">
            All payments made from your account
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-lg bg-gray-50 px-4 py-2">
            <div className="font-semibold text-gray-900">
              {paymentApi.data?.total_orders_count || 0}
            </div>
            <div className="text-gray-500">Orders</div>
          </div>
          <div className="rounded-lg bg-green-50 px-4 py-2">
            <div className="font-semibold text-green-700">
              {formatCurrency(paymentApi.data?.total_amount)}
            </div>
            <div className="text-gray-500">Paid Amount</div>
          </div>
        </div>
      </div>

      {paymentApi.isLoading && (
        <div className="py-8 text-center text-gray-500">Loading payments...</div>
      )}

      {paymentApi.error && (
        <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          Failed to load payment history.
        </div>
      )}

      {!paymentApi.isLoading && !paymentApi.error && payments.length === 0 && (
        <div className="rounded-lg bg-gray-50 px-4 py-8 text-center text-gray-500">
          No payments found yet.
        </div>
      )}

      {!paymentApi.isLoading && !paymentApi.error && payments.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {["Plan", "Amount", "Status", "Order ID", "Date"].map((heading) => (
                  <th
                    key={heading}
                    className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {payments.map((payment) => (
                <tr key={String(payment.id)}>
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {String(payment.plan_type || "N/A")}
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {formatCurrency(Number(payment.amount || 0))}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${getStatusClass(
                        String(payment.status || "")
                      )}`}
                    >
                      {String(payment.status || "N/A")}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {String(payment.gateway_order_id || payment.receipt || "N/A")}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {formatDate(String(payment.created_date || ""))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default PaymentHistory;
