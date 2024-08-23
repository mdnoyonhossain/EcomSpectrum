export type TAddress = {
    city: string;
    country: string;
    address1: string;
    address2?: string;
    zip: string;
}

export type TCustomer = {
    first_name: string;
    last_name: string;
    email: string;
    created_at?: Date;
    default_address: TAddress;
}  