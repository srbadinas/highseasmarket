import InputLabel from "@components/InputLabel"
import LabelCurrency from "@components/LabelCurrency"
import LabelDateTime from "@components/LabelDateTime"

const ProductRequestDetails = ({ productRequest }) => {
    return (
        <div className="w-full flex flex-wrap">
            <div className="w-full mb-4">
                <InputLabel className="font-semibold">Product</InputLabel>
                <div className="pl-2">{productRequest.product_name}</div>
            </div>
            <div className="w-full flex flex-col gap-y-4 gap-x-4 mb-4 sm:flex-row sm:gap-y-0">
                <div className="w-[50%]">
                    <InputLabel className="font-semibold">Requested By</InputLabel>
                    <div className="pl-2">{productRequest.requested_by_user}</div>
                </div>
                <div className="w-[50%]">
                    <InputLabel className="font-semibold">Requested At</InputLabel>
                    <div className="pl-2">
                        <LabelDateTime datetime={productRequest.created_at} />
                    </div>
                </div>
            </div>
            <div className="w-full mb-4">
                <InputLabel className="font-semibold">Company</InputLabel>
                <div className="pl-2">{productRequest.company}</div>
            </div>
            <div className="w-full flex flex-col gap-y-4 gap-x-4 mb-4 sm:flex-row sm:gap-y-0">
                <div className="w-[50%]">
                    <InputLabel className="font-semibold">Quantity</InputLabel>
                    <div className="pl-2">{productRequest.quantity}</div>
                </div>
                <div className="w-[50%]">
                    <InputLabel className="font-semibold">Price per unit</InputLabel>
                    <div className="pl-2">
                        <LabelCurrency>{productRequest.price_per_unit}</LabelCurrency>
                    </div>
                </div>
            </div>
            <div className="w-full mb-4">
                <div className="w-[50%]">
                    <InputLabel className="font-semibold">Shipping Address</InputLabel>
                    <div className="pl-2">{productRequest.shipping_address}</div>
                </div>
            </div>
            <div className="w-full flex flex-col gap-y-4 gap-x-4 mb-4 sm:flex-row sm:gap-y-0">
                <div className="sm:w-[33.3%]">
                    <InputLabel className="font-semibold">City</InputLabel>
                    <div className="pl-2">{productRequest.city}</div>
                </div>
                <div className="sm:w-[33.3%]">
                    <InputLabel className="font-semibold">State</InputLabel>
                    <div className="pl-2">{productRequest.state}</div>
                </div>
                <div className="sm:w-[33.3%]">
                    <InputLabel className="font-semibold">Zip code</InputLabel>
                    <div className="pl-2">{productRequest.zip_code}</div>
                </div>
            </div>
        </div>
    )
}

export default ProductRequestDetails