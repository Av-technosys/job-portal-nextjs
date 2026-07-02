import { apiConstantsURL } from "@/constants";
import { api } from "@/helper";
import { useQuery } from "@tanstack/react-query";

export interface PaymentPlan {
  id: number;
  name: string;
  price: number;
}

export const getPaymentPlans = async (): Promise<{
  data: PaymentPlan[];
  success: boolean;
}> => {
  return api.get(apiConstantsURL.payment.plans);
};

export const useGetPaymentPlans = () => {
  return useQuery({
    queryKey: ["paymentPlans"],
    queryFn: getPaymentPlans,
  });
};
