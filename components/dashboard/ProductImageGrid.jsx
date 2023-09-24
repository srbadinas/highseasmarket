import Link from "next/link";
import CustomImage from "../CustomImage";
import generateUniqueId from "@utils/uniqueId";
import Loader from "@components/Loader";

const ProductGrid = ({ images = [], uploadProcessing = false }) => {
    return (
        <div className={"flex flex-wrap " + (images.length > 0 ? "mt-3 mb-4" : "")}>
            {[...images].map((item) => {
                return (
                    <Link
                        key={generateUniqueId(item.id)}
                        href={item.image_url}
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
            {
                uploadProcessing && <div className="w-[80px] h-[80px] flex justify-center items-center"><Loader className="mx-0" /></div>
            }
        </div>
    )
}

export default ProductGrid