import {LocationAddress} from "./locationAddress";

export interface ShippingAddress {
    id: number;
    title: string;
    fullName: string;
    address1: string;
    isDefault: boolean;
    longitude: string;
    latitude: string;

    country: string;
    county: string;
    town?: string;
    suburb?: string;
    state: string;
    postcode: string;
    neighbourhood: string;
}
