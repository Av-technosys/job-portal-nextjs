export interface RazorpayOptions {
  key: string;
  name: string;
  order_id: string;
  prefill: {
    name: string;
  };
  handler: (response: RazorpayResponse) => void;
}

export interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export declare const Razorpay: {
  new (options: RazorpayOptions): { open: () => void };
};
