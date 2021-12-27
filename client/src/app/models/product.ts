export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    pictureUrl: string;
    type: string;
    ingredients: string;
    inventory: number;
}

export interface ProductLite {

    name: string;
    description: string;
    price: number;
    ingredients: string;
}

export interface ProductParams {
    orderBy: string,
    searchTerm?: string,
    type?: number,
    pageNumber: number,
    pageSize: number,
}