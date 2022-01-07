export interface ShippingAddress {
    id: number
    fullName: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    isDefault: boolean;
}