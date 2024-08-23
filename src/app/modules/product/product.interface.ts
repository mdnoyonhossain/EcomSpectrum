export type TVariant = {
    variant_id: string;
    price: number;
    sku: string;
    inventory_quantity: number;
}

export type TProduct = {
    title: string;
    body_html: string;
    vendor: string;
    product_type: string;
    created_at?: Date;
    variants: TVariant[];
}
