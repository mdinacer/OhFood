export interface BasketItem {
    productId: number;
    name: string;
    price: number;
    pictureUrl: string;
    category: string;
    quantity: number;

}

export interface NewBasketItem {
    productId: number;
    name: string;
    price: number;
    pictureUrl: string;
    category: string;
    quantity: number;
}

export interface Basket {
    id: number;
    buyerId: string;
    items: BasketItem[];
    paymentIntentId?: string,
    clientSecret?: string,
}