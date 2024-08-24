export type TCustomer = {
    first_name: string;
    last_name: string;
    email: string;
    default_address: {
        city: string;
        country: string;
        address1: string;
        address2?: string;
        zip: string;
    };
    created_at: Date;
}