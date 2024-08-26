import Link from "next/link";
import CustomImage from "../CustomImage";
import Loader from "@/components/Loader";
import { ProductImageDto } from "@/types/objects/ProductImageDto";
import { MagnifyingGlass } from "@phosphor-icons/react";

interface ProductImageGridProps {
    productImages: ProductImageDto[],
    processing: boolean
}

export const ProductImageGrid = ({ productImages, processing = false }: ProductImageGridProps) => {
    return (
        <div className={"flex flex-wrap " + (productImages.length > 0 ? "mt-3 mb-4" : "")}>
            {
                productImages.map((item) => {
                    return (
                        <Link
                            key={`product-image-${item.id ? item.id : item.image_url}`}
                            href={item.image_url}
                            className={
                                "relative w-[80px] h-[80px] rounded p-2 mr-2 border-2 transition overflow-hidden group hover:!brightness-100 hover:border-blue-500" +
                                (item.is_active
                                    ? " border-blue-300"
                                    : " border-gray-200")
                            }
                            target="_blank"
                        >
                            <div className="absolute w-full h-full top-0 left-0 bg-[rgba(255,255,255,0.7)] flex justify-center items-center opacity-0 group-hover:opacity-100 z-[2] transition">
                                <MagnifyingGlass size={18} />
                            </div>
                            <CustomImage
                                src={item.image_url}
                                className="transition group-hover:scale-110 z-[1]"
                            />
                        </Link>
                    );
                })
            }
            {
                processing && <div className="w-[80px] h-[80px] flex justify-center items-center"><Loader className="mx-0" /></div>
            }
        </div>
    )
}
