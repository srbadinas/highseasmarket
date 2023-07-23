import generateUniqueId from "@utils/uniqueId"
import Link from "next/link"
import LabelCurrency from "./LabelCurrency"
import CustomImage from "./CustomImage"

const ProductGrid = ({ products, className = "" }) => {
    return (
        <div className={"flex " + className}>
            {products.map(item => {
                return <div key={generateUniqueId(item.id)} className="min-w-[250px] px-2 py-4 overflow-hidden xl:w-[20%]">
                    <ProductGridItem productItem={item} />
                </div>
            })}
        </div>
    )
}

const ProductGridItem = ({ productItem, path = "/listings/" }) => {
    return (
        <Link href={path + productItem.slug} className="block bg-white rounded transition duration-300 ease-in-out border border-gray-200 hover:shadow hover:scale-105 hover:brightness-100">
            <div className="h-[280px] bg-gray-200 flex justify-center items-center rounded-t p-4 relative">
                <CustomImage src={productItem.image_url} />
            </div>
            <div className="p-4">
                <h6 className="truncate font-medium text-sm">{productItem.product_name}</h6>
                <h6 className="font-semibold truncate text-sm">
                    <LabelCurrency>{productItem.product_price}</LabelCurrency>
                </h6>
            </div>
        </Link>
    )
}

export default ProductGrid