// services/useGetPaymentDetails.ts

import { apiConstantsURL } from "@/constants";
import { api } from "@/helper";
import { useQuery } from "@tanstack/react-query";

export const getPaymentDetails = async (page: number, page_size: number) => {
  return api.get(apiConstantsURL.payment.paymentDetails, {
    params: { page, page_size },
  });
};

export const useGetPaymentDetails = (page: number, page_size: number) => {
  return useQuery({
    queryKey: ["paymentDetails", page, page_size], // VERY IMPORTANT
    queryFn: () => getPaymentDetails(page, page_size),
  });
};
