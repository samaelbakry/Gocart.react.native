export type CartItem = {
  _id?: string;
  [key: string]: any;
}

export type Order ={
  _id: string;
  id: number;
  createdAt: string;
  updatedAt: string;
  totalOrderPrice: number;
  shippingPrice: number;
  taxPrice: number;
  paymentMethodType: "cash" | "card";
  isPaid: boolean;
  isDelivered: boolean;
  paidAt?: string;
  shippingAddress: {
    city: string;
    details: string;
    phone: string;
    postalCode?: string;
  };
  cartItems: CartItem[];
  user: {
    _id: string;
    name: string;
    email: string;
    phone: string;
  };
}