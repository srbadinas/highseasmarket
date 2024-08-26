import { ClipboardEvent, Dispatch, FocusEvent, FormEvent, KeyboardEvent, SetStateAction, useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import Button from "../Button"
import InputCurrency from "../InputCurrency"
import InputLabel from "../InputLabel"
import InputNumber from "../InputNumber"
import InputText from "../InputText"
import InputTextArea from "../InputTextArea"
import Switch from "../Switch"
import Alert from "@/components/Alert"
import useFetch from "@/hooks/useFetch"
import InputSelect, { InputSelectOption } from "@/components/InputSelect"
import InputFileUpload from "@/components/InputFileUpload"
import { ProductImageGrid } from "@/components/dashboard/ProductImageGrid"
import LabelDateTime from "@/components/LabelDateTime"
import Link from "next/link"
import Modal from "@/components/Modal"
import DeleteProduct from "@/components/modals/DeleteProduct"
import { ProductDto } from "@/types/objects/ProductDto"
import axios, { AxiosError } from "axios"
import { getError } from "@/utils/getError"
import { SweetAlert } from "@/lib/SweetAlert"
import { describe } from "node:test"
import { parse } from "node:path"
import { useProductStore } from "@/stores/productStore"
import { ProductImageDto } from "@/types/objects/ProductImageDto"
import { Message } from "@/types/Message"
import { useDashboardStore } from "@/stores/dashboardStore"

interface ProductFormProps {
    product?: ProductDto,
    editable: boolean,
    className?: string,
    toggleModal?: Dispatch<SetStateAction<boolean>>,
}

const ProductForm = ({ product, editable, className = "", toggleModal }: ProductFormProps) => {
    const { data: session } = useSession();

    const fetchProducts = useProductStore((state) => state.fetchProducts);

    const [productId, setProductId] = useState<string>('');
    const [productName, setProductName] = useState<string>('');
    const [productDescription, setProductDescription] = useState<string>('');
    const [slug, setSlug] = useState<string>('');
    const [productCategoryId, setProductCategoryId] = useState<string>('');
    const [images, setImages] = useState<ProductImageDto[]>([]);
    const [isCustomUnit, setIsCustomUnit] = useState<boolean>(false);
    const [customUnit, setCustomUnit] = useState<string>('');
    const [unitId, setUnitId] = useState<string>('');
    const [stock, setStock] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [isPublished, setIsPublished] = useState<boolean>(false);

    const [processing, setProcessing] = useState(false);
    const [message, setMessage] = useState<Message | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const productCategories = useDashboardStore((state) => state.productCategories);
    const units = useDashboardStore((state) => state.units);

    if (!session) return;
       
    useEffect(() => {
        if (!product) return;
        setProductId(product.id as unknown as string);
        setProductName(product.name);
        setProductDescription(product.description);
        setSlug(product.slug);
        setProductCategoryId(product.product_category_id as unknown as string);
        setImages(product.images);
        setIsCustomUnit(product.is_custom_unit);
        setCustomUnit(product.custom_unit);
        setUnitId(product.unit_id as unknown as string);
        setStock(product.stock as unknown as string);
        setPrice(product.price as unknown as string);
        setIsPublished(product.is_published);
    }, [product]);

    const handleProductNameBlur = (evt: FocusEvent<HTMLInputElement>) => {
        setSlug(evt.target.value.toLowerCase().replace(/[~`!@#$%^&*()_+={}:;"'<,>.?/|\\\[\]\s]/g, "-"));
    };

    const handleKeyPress = (evt: KeyboardEvent) => {
        if (/[a-z0-9-]/i.test(evt.key) === false) {
            evt.preventDefault();
        }
    };

    const handlePaste = (evt: ClipboardEvent<HTMLInputElement>) => {
        evt.preventDefault();
    };

    const handleSubmit = (evt: FormEvent) => {
        evt.preventDefault();

        if (!editable && images.length == 0) {
            setMessage({
                type: 'error',
                content: 'Upload at least 1 image'
            });
            return false;
        }

        setProcessing(true);

        const productData: ProductDto = {
            name: productName,
            description: productDescription,
            slug: slug,
            product_category_id: parseInt(productCategoryId),
            unit_id: parseInt(unitId),
            is_published: isPublished,
            price: parseFloat(price),
            stock: parseInt(stock),
            is_custom_unit: isCustomUnit,
            custom_unit: customUnit,
        } as ProductDto;

        if (editable) {
            productData.last_updated_by_user_id = parseInt(session.user.id);
        } else {
            productData.created_by_user_id = parseInt(session.user.id);
            productData.images = images;
        }

        axios(editable ? `${process.env.NEXT_PUBLIC_BASE_URI}/api/products/` + productId : `${process.env.NEXT_PUBLIC_BASE_URI}/api/products`, {
            method: editable ? 'put' : 'post',
            headers: {
                Authorization: `Bearer ${session.user.token}`
            },
            data: productData
        })
            .then(res => {
                if (res.status !== 200) return;
                SweetAlert({
                    title: "Success!",
                    text: (editable ? "Product has been updated." : "Product has been added."),
                    icon: "success",
                    confirmButtonText: (editable ? "Ok" : "Continue"),
                }).then((result) => {
                    if (result.isConfirmed) {
                        fetchProducts(session.user.token);
                        toggleModal && toggleModal(prev => !prev);
                    }
                });
            })
            .catch((err: AxiosError) => {
                const errorMessage = getError(err);
                setMessage({
                    type: 'error',
                    content: errorMessage
                });
            })
            .finally(() => {
                setProcessing(false);
            });
    }

    return (
        <>
            <form className={className} method="POST" encType="multipart/form-data" onSubmit={(e) => handleSubmit(e)}>
                {
                    message ? <Alert type={message.type} message={message.content} /> : ''
                }
                <div className="mb-4">
                    <InputLabel forInput="product_name" required>Product name</InputLabel>
                    <InputText name="product_name" value={productName} required processing={processing} onValueChange={setProductName} onBlur={handleProductNameBlur} />
                </div>
                <div className="mb-4">
                    <InputLabel forInput="product_description" required>Description</InputLabel>
                    <InputTextArea name="product_description" value={productDescription} required processing={processing} onValueChange={setProductDescription} />
                </div>
                <div className="mb-4">
                    <InputLabel forInput="slug" required>Slug</InputLabel>
                    <InputText name="slug" value={slug} required processing={processing} onValueChange={setSlug} onKeyDown={handleKeyPress} onPaste={handlePaste} />
                </div>
                <div className="mb-4">
                    <InputLabel forInput="product_category_id" required>Category</InputLabel>
                    <InputSelect name="product_category_id" value={productCategoryId} options={productCategories.map((item) => ({ value: item.id.toString(), label: item.product_category } as InputSelectOption))} required processing={processing} onValueChange={setProductCategoryId} />
                </div>
                <div className="mb-4">
                    <InputLabel forInput="product_images" required>Images</InputLabel>
                    <ProductImageGrid productImages={images} processing={processing} />
                    <InputFileUpload name="image_upload" processing={processing} setProcessing={setProcessing} onValueChange={setImages} />
                </div>
                <div className="mb-4">
                    <Switch name="is_custom_unit" value={isCustomUnit as unknown as string} text="Custom unit?" processing={processing} checked={isCustomUnit as unknown as boolean} onValueChange={setIsCustomUnit} />
                </div>
                {
                    isCustomUnit ? <div className="mb-4">
                        <InputLabel forInput="custom_unit" required>Custom unit</InputLabel>
                        <InputText name="custom_unit" value={customUnit} required processing={processing} onValueChange={setCustomUnit} />
                    </div> : <div className="mb-4">
                        <InputLabel forInput="unit_id" required>Unit</InputLabel>
                        <InputSelect name="unit_id" value={unitId} options={units.map((item) => ({ value: item.id.toString(), label: item.unit } as InputSelectOption))} required processing={processing} onValueChange={setUnitId} />
                    </div>
                }
                <div className="flex flex-col gap-x-0 sm:flex-row sm:gap-x-4 sm:mb-4">
                    <div className="w-full mb-4 sm:w-1/2 sm:mb-0">
                        <InputLabel forInput="stock" required>Stock</InputLabel>
                        <InputNumber name="stock" value={stock} required processing={processing} onValueChange={setStock} />
                    </div>
                    <div className="w-full mb-4 sm:w-1/2 sm:mb-0">
                        <InputLabel forInput="price" required>Price</InputLabel>
                        <InputCurrency name="price" value={price} required processing={processing} onValueChange={setPrice} />
                    </div>
                </div>
                <div className="mb-4">
                    <Switch name="is_published" value={isPublished as unknown as string} text="Publish" processing={processing} checked={isPublished as unknown as boolean} onValueChange={setIsPublished} />
                </div>
                {
                    editable && product &&
                    (
                        <>
                            <div className="mb-4">
                                <InputLabel>Created At</InputLabel>
                                <LabelDateTime value={product.created_date} />
                            </div>
                            <div className="mb-4">
                                <InputLabel>Updated At</InputLabel>
                                <LabelDateTime value={product.last_updated_date} />
                            </div>
                            <div className="mb-4">
                                <InputLabel>Created By</InputLabel>
                                <Link href={"/dashboard/users/" + product.created_by_user_id} className="text-default-1" target="_blank">{product.created_by_user}</Link>
                            </div>
                        </>
                    )
                }
                <div className="flex justify-end gap-x-2 mt-4">
                    {
                        toggleModal && <Button type="button" className="btn-transparent" onClick={() => toggleModal(prev => !prev)}>Cancel</Button>
                    }
                    {/* {
                        editable && <Button type="button" className="btn-danger" processing={processing} onClick={() => setShowDeleteModal(prev => !prev)}>Delete</Button>
                    } */}
                    <Button className="btn-success" processing={processing}>{editable ? "Update" : "Submit"}</Button>
                </div>
            </form>
            {/* {
                editable &&
                <Modal show={showDeleteModal} setShow={setShowDeleteModal} title="Delete Product" content={<DeleteProduct toggleModal={setShowDeleteModal} id={product.id} />} />
            } */}
        </>
    )
}

export default ProductForm