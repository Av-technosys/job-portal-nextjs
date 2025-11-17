import { useGetPaymentDetails } from "@/services/useGetPaymentDetails";
import { useEffect, useState } from "react";

// ----------------------
// ✅ TypeScript Interfaces
// ----------------------
interface PaymentOrder {
  id: number;
  amount: number;
  amount_due: number;
  amount_paid: number;
  attempts: number;
  currency: string;
  gateway_order_id: string;
  receipt: string;
  status: string;
  notes: any[];
  offer_id: string | null;
  plan_type: string;
  created_date: string;
  updated_date: string;
  user: number;
}

interface PaginationInfo {
  total_count: number;
  total_pages: number;
  current_page: number;
}

interface PaymentResponse {
  total_amount: number;
  pagination: PaginationInfo;
  data: PaymentOrder[];
}

// ---------------------------------------------------

function AdminPaymentDetailsComponent() {
  const [page, setPage] = useState<number>(1);
  const PAGE_SIZE = 10;

  // Tell TS that your API returns PaymentResponse
  const paymentApi = useGetPaymentDetails(page, PAGE_SIZE) as {
    data?: PaymentResponse;
    isLoading: boolean;
    error: any;
  };

  const data = paymentApi.data;

  const orders: PaymentOrder[] = data?.data || [];
  const currentPage = data?.pagination?.current_page || 1;
  const totalPages = data?.pagination?.total_pages || 1;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Payment Details
      </h2>

      {/* Loading State */}
      {paymentApi.isLoading && (
        <p className="text-center text-gray-500 text-lg">Loading...</p>
      )}

      {/* Error State */}
      {paymentApi.error && (
        <p className="text-center text-red-600 text-lg">
          Failed to load payment details.
        </p>
      )}
     {/* Total Amount Box */}
    <div className="mb-6 p-4 bg-white rounded-lg shadow font-semibold text-gray-700 text-lg">
    Total Amount Collected: 
    <span className="ml-2 text-green-600">₹{data?.total_amount || 0}</span>
    </div>

      {/* Table Box */}
      {!paymentApi.isLoading && !paymentApi.error && (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full border">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">Amount</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Plan</th>
                <th className="px-4 py-2 border">User</th>
                <th className="px-4 py-2 border">Created At</th>
              </tr>
            </thead>

            <tbody className="text-gray-700">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{order.id}</td>
                  <td className="px-4 py-2 border">₹{order.amount}</td>
                  <td className="px-4 py-2 border">{order.status}</td>
                  <td className="px-4 py-2 border">{order.plan_type}</td>
                  <td className="px-4 py-2 border">{order.user}</td>
                  <td className="px-4 py-2 border">
                    {new Date(order.created_date).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={() => setPage((p) => p - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300"
        >
          Previous
        </button>

        <span className="text-lg font-semibold">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default AdminPaymentDetailsComponent;
