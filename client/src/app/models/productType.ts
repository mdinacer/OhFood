import {ProductLite} from "./product";

export interface ProductType {
    id: number;
    name: string;
    pictureUrl?: string;
    publicId?: string;
}

export interface ProductTypeFull {
    id: number;
    name: string;
    pictureUrl?: string;
    products: ProductLite[]
}