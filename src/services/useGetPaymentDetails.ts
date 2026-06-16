// services/useGetPaymentDetails.ts

import { apiConstantsURL } from "@/constants";
import { api } from "@/helper";
import { useQuery } from "@tanstack/react-query";

export const getPaymentDetails = async ({
  page,
  page_size,
  search,
  sort,
}: {
  page: number;
  page_size: number;
  search?: string;
  sort?: string[];
}) => {
  return api.get(apiConstantsURL.payment.paymentDetails, {
    params: { page, page_size, search, sort },
  });
};

export const useGetPaymentDetails = ({
  page,
  page_size,
  search,
  sort,
}: {
  page: number;
  page_size: number;
  search?: string;
  sort?: string[];
}) => {
  return useQuery({
    queryKey: ["paymentDetails", page, page_size, search, sort],
    queryFn: () => getPaymentDetails({ page, page_size, search, sort }),
  });
};
