export type ListingProductDto = {
    id: number,
    name: string,
    description: string,
    product_category: string,
    unit: string,
    created_date: Date,
    slug: string,
    price: number,
    stock: number,
    is_custom_unit: boolean,
    custom_unit: string,
    image_url: string
}