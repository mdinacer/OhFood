import {LocationAddress} from "./locationAddress";

export interface ShippingAddress extends LocationAddress {
    id: number;
    title: string;
    fullName: string;
    address1: string;
    isDefault: boolean;
    longitude: string;
    latitude: string;
}
