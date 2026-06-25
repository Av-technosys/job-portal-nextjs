import { Dropdown, Typography } from "@/components";
import { useGetPaymentDetails } from "@/services/useGetPaymentDetails";
import { SelectChangeEvent } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import AdminListToolbar from "./AdminListToolbar";
import {
  TypographyFontColor,
  TypographyFontSize,
  TypographyFontWeight,
  TypographyVariantEnum,
} from "@/types";

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
  user_name: string;
  user_email: string;
  username: string;
}

interface PaginationInfo {
  total_count: number;
  total_pages: number;
  current_page: number;
}

interface PaymentResponse {
  total_amount: number;
  total_orders_count: number;
  paid_total_count: number;
  pagination: PaginationInfo;
  data: PaymentOrder[];
}

enum AdminCreatedDateSortEnum {
  CREATED_DATE_ASC = "created_date",
  CREATED_DATE_DESC = "-created_date",
}

const CREATED_DATE_SORT_DROPDOWN = {
  selectProps: {
    name: "sortby",
  },
  formControlProps: {
    sx: {
      minWidth: 150,
    },
  },
  inputLabelProps: {
    children: "Sort By ",
    shrink: true,
  },
  options: [
    {
      label: "Created at (ASC)",
      key: "created_date",
      value: AdminCreatedDateSortEnum.CREATED_DATE_ASC,
    },
    {
      label: "Created at (DESC)",
      key: "-created_date",
      value: AdminCreatedDateSortEnum.CREATED_DATE_DESC,
    },
  ],
};

const doesOrderMatchSearch = (order: PaymentOrder, searchString: string) => {
  if (!searchString) return true;

  const normalizedSearch = searchString.toLowerCase();
  return [
    order.id,
    order.gateway_order_id,
    order.receipt,
    order.status,
    order.plan_type,
    order.user_name,
    order.user_email,
    order.username,
  ]
    .filter(Boolean)
    .some((value) => String(value).toLowerCase().includes(normalizedSearch));
};

function AdminPaymentDetailsComponent() {
  const [page, setPage] = useState<number>(1);
  const [allOrders, setAllOrders] = useState<PaymentOrder[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [searchString, setSearchString] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedSort, setSelectedSort] = useState<AdminCreatedDateSortEnum[]>([
    AdminCreatedDateSortEnum.CREATED_DATE_DESC,
  ]);
  const PAGE_SIZE = 10;
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchString(searchValue);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [searchValue]);

  const paymentApi = useGetPaymentDetails({
    page,
    page_size: PAGE_SIZE,
    search: searchString,
    sort: selectedSort,
  }) as {
    data?: PaymentResponse;
    isLoading: boolean;
    error: any;
    isFetching: boolean;
  };

  const data = paymentApi.data;
  const currentPage = data?.pagination?.current_page || 1;
  const totalPages = data?.pagination?.total_pages || 1;
  const totalOrdersCount =
    data?.total_orders_count ?? data?.pagination?.total_count ?? 0;
  const successfulPaymentsCount = data?.paid_total_count ?? 0;

  // Merge new orders with existing ones
  useEffect(() => {
    if (data?.data) {
      setAllOrders(prev => {
        const existingIds = new Set(prev.map(order => order.id));
        const newOrders = data.data.filter(order => !existingIds.has(order.id));
        return [...prev, ...newOrders];
      });
      
      // Check if there are more pages to load
      if (currentPage >= totalPages) {
        setHasMore(false);
      }
    }
  }, [data, currentPage, totalPages]);

  // Reset when filters change
  useEffect(() => {
    setAllOrders([]);
    setPage(1);
    setHasMore(true);
  }, [searchString, selectedSort]);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !paymentApi.isFetching) {
          setPage(prev => prev + 1);
        }
      },
      { threshold: 1.0 }
    );

    const currentObserverTarget = observerTarget.current;

    if (currentObserverTarget) {
      observer.observe(currentObserverTarget);
    }

    return () => {
      if (currentObserverTarget) {
        observer.unobserve(currentObserverTarget);
      }
    };
  }, [hasMore, paymentApi.isFetching]);

  // Status badge color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
      case 'completed':
      case 'success':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'failed':
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleSortChange = (event: SelectChangeEvent<unknown>) => {
    const newSort = event.target.value;
    setSelectedSort([newSort] as AdminCreatedDateSortEnum[]);
  };

  const visibleOrders = allOrders
    .filter((order) => doesOrderMatchSearch(order, searchString))
    .sort((firstOrder, secondOrder) => {
      const firstTime = new Date(firstOrder.created_date || "").getTime();
      const secondTime = new Date(secondOrder.created_date || "").getTime();
      const safeFirstTime = Number.isFinite(firstTime) ? firstTime : 0;
      const safeSecondTime = Number.isFinite(secondTime) ? secondTime : 0;

      return selectedSort[0] === AdminCreatedDateSortEnum.CREATED_DATE_DESC
        ? safeSecondTime - safeFirstTime
        : safeFirstTime - safeSecondTime;
    });

  return (
    <div className="p-6 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Payment Details
        </h2>
        <p className="text-gray-600">
          Manage and view all payment transactions
        </p>
      </div>

      <AdminListToolbar
        countContent={
          <Typography
            typographyProps={{
              children: totalOrdersCount,
              variant: TypographyVariantEnum.H5,
            }}
          />
        }
        titleContent={
          <Typography
            typographyProps={{
              children: "Total Orders",
              variant: TypographyVariantEnum.BODY2,
            }}
            
          />
        }
        searchValue={searchValue}
        searchPlaceholder="Search payment details"
        onSearchChange={setSearchValue}
        actions={
          <Dropdown
            {...CREATED_DATE_SORT_DROPDOWN}
            onChange={handleSortChange}
            value={selectedSort?.[0]}
          />
        }
      />

  {/* Total Amount Card */}
  <div className="mb-8 p-6 bg-white rounded-xl shadow-lg border border-gray-100">
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-1">
          Total Amount Collected
        </h3>
        <p className="text-sm text-gray-500">All successful transactions</p>
      </div>

      <div className="text-3xl font-bold text-green-600">
        {formatCurrency(data?.total_amount ?? 0)}
      </div>
    </div>
  </div>

  {/* Stats Cards */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
    <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
      <div className="text-2xl font-bold text-blue-600">
        {totalOrdersCount}
      </div>
      <div className="text-sm text-gray-600">Total Orders</div>
    </div>

    <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
      <div className="text-2xl font-bold text-green-600">
        {successfulPaymentsCount}
      </div>
      <div className="text-sm text-gray-600">Successful Payments</div>
    </div>

    <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
      <div className="text-2xl font-bold text-gray-600">
        {data?.pagination?.total_count ?? 0}
      </div>
      <div className="text-sm text-gray-600">Total Records</div>
    </div>
  </div>

  {/* Table Container */}
  <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
    {paymentApi.isLoading && allOrders.length === 0 && (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    )}

    {paymentApi.error && (
      <div className="text-center py-12">
        <div className="text-red-500 text-6xl mb-4">⚠️</div>
        <p className="text-red-600 text-lg font-medium mb-2">
          Failed to load payment details
        </p>
        <p className="text-gray-600">Please try refreshing the page</p>
      </div>
    )}

    {!paymentApi.error && (
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {["Order Details", "Amount", "Status", "User Info", "Date"].map(
                (heading) => (
                  <th
                    key={heading}
                    className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                  >
                    {heading}
                  </th>
                )
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {visibleOrders.map((order) => (
              <tr
                key={order.id}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">#{order.id}</div>
                  <div className="text-sm text-gray-500 mt-1">
                    {order.gateway_order_id}
                  </div>
                  <div className="text-sm text-blue-600 font-medium mt-1">
                    {order.plan_type}
                  </div>
                </td>

                <td className="px-6 py-4">
                  <div className="font-semibold text-gray-900">
                    {formatCurrency(order.amount)}
                  </div>

                  {order.amount_paid > 0 && (
                    <div className="text-sm text-green-600">
                      Paid: {formatCurrency(order.amount_paid)}
                    </div>
                  )}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>

                  {order.attempts > 0 && (
                    <div className="text-xs text-gray-500 mt-1">
                      Attempts: {order.attempts}
                    </div>
                  )}
                </td>

                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">
                    {order.user_name || "N/A"}
                  </div>
                  <div className="text-sm text-gray-600 break-all">
                    {order.user_email || "N/A"}
                  </div>
                </td>

                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">
                    {formatDate(order.created_date)}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}

    {paymentApi.isFetching && visibleOrders.length > 0 && (
      <div className="flex justify-center items-center py-6 border-t border-gray-200">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600" />
        <span className="ml-3 text-gray-600">Loading more orders...</span>
      </div>
    )}

    {!hasMore && visibleOrders.length > 0 && (
      <div className="text-center py-6 border-t border-gray-200">
        <p className="text-gray-500">No more orders to load</p>
      </div>
    )}

    <div ref={observerTarget} className="h-2" />
  </div>

  {visibleOrders.length > 0 && (
    <div className="mt-6 text-center text-gray-600">
      <p>
        Showing {visibleOrders.length} of{" "}
        {data?.pagination?.total_count ?? 0} orders
        {hasMore && " • Scroll to load more"}
      </p>
    </div>
  )}
</div>
  );
}

export default AdminPaymentDetailsComponent;




