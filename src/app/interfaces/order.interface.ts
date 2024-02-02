import { IProduct } from "./product.interface";

export interface IOrder {
    quantity: number,
    product: IProduct,
}

export interface IOrderData {
    date: string;
    order: IOrder;
}