export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    pictureUrl: string;
    category: string;
    ingredients: string;
    inventory: number;
}

export interface ProductLite {
    id: number;
    name: string;
    description: string;
    price: number;
    ingredients: string;
}

export interface ProductParams {
    orderBy: string,
    searchTerm?: string,
    category?: number,
    pageNumber: number,
    pageSize: number,
}