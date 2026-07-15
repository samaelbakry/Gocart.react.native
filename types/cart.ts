import { Brand, Category } from "./products";

export type CartProduct = {
  _id: string;
  count: number;
  price: number;
  product: {
    _id: string;
    title: string;
    imageCover: string;
    brand:Brand,
    category:Category
    price: number;
  };
};

export type Cart = {
  _id: string;
  cartOwner: string;
  products: CartProduct[];
  totalCartPrice: number;
  createdAt: string;
  updatedAt: string;
};