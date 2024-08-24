export type TProduct = {
    title: string;
    body_html: string;
    vendor: string;
    product_type: string;
    variants: {
        variant_id: string;
        price: number;
        sku: string;
        inventory_quantity: number;
    }[];
    created_at: Date;
}