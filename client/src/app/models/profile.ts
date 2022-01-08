import { ShippingAddress } from "./shippingAddress";


export interface Profile {
    firstName: string;
    lastName: string;
    phone1: string;
    phone2: string;
    pictureUrl?: string;
    addresses: ShippingAddress[];
    creationDate: Date;
    lastLogin: Date;
}
