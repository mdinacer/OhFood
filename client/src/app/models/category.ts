import {ProductLite} from "./product";

export interface Category {
    id: number;
    name: string;
    pictureUrl?: string;
    publicId?: string;
}

export interface CategoryFull {
    id: number;
    name: string;
    pictureUrl?: string;
    products: ProductLite[]
}