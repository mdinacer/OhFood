export interface ShippingAddress {
    fullName: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
}

export interface OrderItem {
    productId: number;
    name: string;
    pictureUrl: string;
    price: number;
    quantity: number;
}

export interface Order {
    id: number;
    buyerId: string;
    shippingAddress: ShippingAddress;
    orderDate: string;
    items: OrderItem[];
    subtotal: number;
    deliveryFee: number;
    status: string;
    total: number;
}

export interface OrderParams {
    orderBy: string,
    searchTerm?: string,
    status?: number,
    pageNumber: number,
    pageSize: number,
}

export enum OrderStatus {
    Pending,
    Confirmed,
    Delivered,
    Cancelled,
}