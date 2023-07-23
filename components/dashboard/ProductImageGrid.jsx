import Link from "next/link";
import CustomImage from "../CustomImage";
import generateUniqueId from "@utils/uniqueId";

const ProductGrid = ({ images }) => {
    return (
        <div className="flex flex-wrap mt-3 mb-4">
            {[...images].map((item) => {
                return (
                    <Link
                        key={generateUniqueId(item.id)}
                        href={"/assets/images/products/" + item.image_url}
                        className={
                            "w-[80px] h-[80px] rounded p-2 mr-2 border-2 transition overflow-hidden group hover:border-blue-500" +
                            (item.is_active
                                ? " border-blue-300"
                                : " border-gray-200")
                        }
                        target="_blank"
                    >
                        <CustomImage
                            src={item.image_url}
                            className="transition group-hover:scale-110"
                        />
                    </Link>
                );
            })}
        </div>
    )
}

export default ProductGrid