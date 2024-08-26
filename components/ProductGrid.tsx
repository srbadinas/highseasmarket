import Link from "next/link"
import LabelCurrency from "./LabelCurrency"
import CustomImage from "./CustomImage"
import { ListingProductDto } from "@/types/objects/ListingProductDto"

interface ProductGridProps {
    products: ListingProductDto[]
    className?: string;
}

const ProductGrid = ({ products, className = "" }: ProductGridProps) => {
    return (
        <div className={"flex " + className}>
            {products.map(item => {
                return <div key={item.id} className="min-w-[250px] px-2 py-4 overflow-hidden xl:w-[20%]">
                    <ProductGridItem product={item} />
                </div>
            })}
        </div>
    )
}

interface ProductGridItemProps {
    product: ListingProductDto,
    path?: string,
}

const ProductGridItem = ({ product, path = "/listings/" }: ProductGridItemProps) => {
    return (
        <Link href={path + product.slug} className="block bg-white rounded transition duration-300 ease-in-out border border-gray-200 hover:shadow hover:scale-105 hover:brightness-100">
            <div className="h-[280px] bg-gray-200 flex justify-center items-center rounded-t p-4 relative">
                <CustomImage src={product.image_url} />
            </div>
            <div className="p-4">
                <h6 className="truncate font-medium text-sm">{product.name}</h6>
                <h6 className="font-semibold truncate text-sm">
                    <LabelCurrency value={product.price} />
                </h6>
            </div>
        </Link>
    )
}

export default ProductGrid