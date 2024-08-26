import { ProductImageDto } from "./ProductImageDto"

export type ProductDto = {
    id: number,
    name: string,
    description: string,
    product_category_id: number,
    unit_id: number,
    is_published: boolean,
    created_date: Date,
    last_updated_date: Date,
    created_by_user_id: number,
    created_by_user: string,
    last_updated_by_user_id: number,
    last_updated_by_user: string,
    slug: string,
    price: number,
    stock: number,
    is_custom_unit: boolean,
    custom_unit: string,
    images: ProductImageDto[]
}