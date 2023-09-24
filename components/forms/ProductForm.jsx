import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import Button from "../Button"
import InputCurrency from "../InputCurrency"
import InputLabel from "../InputLabel"
import InputNumber from "../InputNumber"
import InputText from "../InputText"
import InputTextArea from "../InputTextArea"
import Switch from "../Switch"
import Alert from "@components/Alert"
import useFetch from "@hooks/useFetch"
import InputSelect from "@components/InputSelect"
import generateUniqueId from "@utils/uniqueId"
import SweetAlert from "@lib/SweetAlert"
import InputFileUpload from "@components/InputFileUpload"
import ProductImageGrid from "@components/dashboard/ProductImageGrid"
import LabelDateTime from "@components/LabelDateTime"
import Link from "next/link"
import fieldChange from "@utils/fieldChange"
import Modal from "@components/Modal"
import DeleteProduct from "@components/modals/DeleteProduct"
import uploadFile from "@utils/uploadFile"
import Loader from "@components/Loader"

const ProductForm = ({ productData, isEdit = false, className = "", toggleModal, reloadProducts, refetch }) => {
    const { data: session } = useSession();
    const [product, setProduct] = useState({
        id: '',
        product_name: '',
        product_description: '',
        slug: '',
        category_id: '',
        product_images: [],
        uploaded_images: [],
        is_custom_unit: false,
        unit_id: '',
        custom_unit: '',
        stock: 0,
        product_price: 0,
        is_publish: false,
        created_by: '',
    });

    const [processing, setProcessing] = useState(false);
    const [message, setMessage] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const { data: categories, loading: categoriesLoading, error: categoriesError } = useFetch('/api/dashboard/categories');
    const { data: units, loading: unitsLoading, error: unitsError } = useFetch('/api/dashboard/units');

    useEffect(() => {
        if (isEdit) {
            setProduct({ ...productData, uploaded_images: [] });
        };
    }, [])

    const onHandleChange = (e) => {
        fieldChange(e, product, setProduct);
    }

    const onHandleImageUpload = async (e) => {
        setProcessing(true);
        const imageUrl = await uploadFile(e);
        const data = product;
        data.product_images.push({
            image_url: imageUrl,
        });
        data.uploaded_images.push({
            image_url: imageUrl,
        });
        setProduct({ ...data });
        e.target.value = null;
        setProcessing(false);
    }

    const onHandleProductNameBlur = (e) => {
        setProduct({
            ...product, slug: e.target.value
                .toLowerCase()
                .replace(/[~`!@#$%^&*()_+={}:;"'<,>.?/|\\\[\]\s]/g, "-")
        });
    };

    const onHandleKeyPress = (e) => {
        if (/[a-z0-9-]/i.test(e.key) === false) {
            e.preventDefault();
        }
    };

    const onHandlePaste = (e) => {
        e.preventDefault();
    };

    const onHandleSubmit = async (e) => {
        e.preventDefault();

        if (!isEdit && product.product_images.length == 0) {
            setMessage({
                type: 'error',
                content: 'Upload at least 1 image.',
            });
            return false;
        }

        setProcessing(true);

        try {
            let url = (!isEdit ? '/api/dashboard/products' : '/api/dashboard/products/' + product.id);
            let data = { ...product };
            data.created_by_user_id = session?.user?.id;

            const response = await fetch(url, {
                method: 'post',
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Something went wrong. Please try again later.');
            }

            SweetAlert({
                title: "Success!",
                text: (isEdit ? "Product has been updated." : "Product has been added."),
                icon: "success",
                confirmButtonText: (isEdit ? "Ok" : "Continue"),
            }).then((result) => {
                if (result.isConfirmed) {
                    if (isEdit) {
                        refetch();
                        return false;
                    }

                    if (toggleModal) {
                        toggleModal(prev => !prev);
                    };
                    reloadProducts();
                }
            });

        } catch (err) {
            setMessage({
                type: 'error',
                content: err.message,
            });
        } finally {
            setProcessing(false);
        }
    }

    return (
        <>
            <form className={className} method="POST" encType="multipart/form-data" onSubmit={(e) => onHandleSubmit(e)}>
                {
                    message ? <Alert type={message.type} message={message.content} /> : ''
                }
                <div className="mb-4">
                    <InputLabel forInput="product_name" required>Product name</InputLabel>
                    <InputText name="product_name" value={product.product_name} required processing={processing} handleChange={onHandleChange} handleBlur={onHandleProductNameBlur} />
                </div>
                <div className="mb-4">
                    <InputLabel forInput="product_description" required>Description</InputLabel>
                    <InputTextArea name="product_description" value={product.product_description} required processing={processing} handleChange={onHandleChange} />
                </div>
                <div className="mb-4">
                    <InputLabel forInput="slug" required>Slug</InputLabel>
                    <InputText name="slug" value={product.slug} required processing={processing} handleChange={onHandleChange} handleKeyDown={onHandleKeyPress} handlePaste={onHandlePaste} />
                </div>
                <div className="mb-4">
                    <InputLabel forInput="category_id" required>Category</InputLabel>
                    <InputSelect name="category_id" value={product.category_id} options={categories} optionLabel="category" required processing={processing} handleChange={onHandleChange} >
                        {
                            categories && categories.map(item => {
                                return <option key={generateUniqueId(item.id)} value={item.id}>{item.category}</option>
                            })
                        }
                    </InputSelect>
                </div>
                <div className="mb-4">
                    <InputLabel forInput="product_images" required>Images</InputLabel>
                    <ProductImageGrid images={product.product_images} uploadProcessing={processing} />
                    <InputFileUpload name="image_upload" processing={processing} handleChange={onHandleImageUpload} />
                </div>
                <div className="mb-4">
                    <Switch name="is_custom_unit" value={product.is_custom_unit} text="Custom unit?" processing={processing} handleChange={onHandleChange} />
                </div>
                {
                    product.is_custom_unit ? <div className="mb-4">
                        <InputLabel forInput="custom_unit" required>Custom unit</InputLabel>
                        <InputText name="custom_unit" value={product.custom_unit} required processing={processing} handleChange={onHandleChange} />
                    </div> : <div className="mb-4">
                        <InputLabel forInput="unit_id">Unit</InputLabel>
                        <InputSelect name="unit_id" value={product.unit_id} options={units} defaultOptionText="None" processing={processing} handleChange={onHandleChange} >
                            {
                                units && units.map(item => {
                                    return <option key={generateUniqueId(item.id)} value={item.id}>{item.unit}</option>
                                })
                            }
                        </InputSelect>
                    </div>
                }
                <div className="flex flex-col gap-x-0 sm:flex-row sm:gap-x-4 sm:mb-4">
                    <div className="w-full mb-4 sm:w-1/2 sm:mb-0">
                        <InputLabel forInput="stock" required>Stock</InputLabel>
                        <InputNumber name="stock" value={product.stock} required processing={processing} handleChange={onHandleChange} />
                    </div>
                    <div className="w-full mb-4 sm:w-1/2 sm:mb-0">
                        <InputLabel forInput="product_price" required>Price</InputLabel>
                        <InputCurrency name="product_price" value={product.product_price} required processing={processing} handleChange={onHandleChange} />
                    </div>
                </div>
                <div className="mb-4">
                    <Switch name="is_publish" value={product.is_publish} text="Publish" processing={processing} handleChange={onHandleChange} />
                </div>
                {
                    isEdit &&
                    (
                        <>
                            <div className="mb-4">
                                <InputLabel>Created At</InputLabel>
                                <LabelDateTime datetime={product.created_at} />
                            </div>
                            <div className="mb-4">
                                <InputLabel>Updated At</InputLabel>
                                <LabelDateTime datetime={product.updated_at} />
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
                    {
                        isEdit &&
                        <Button type="button" className="btn-danger" processing={processing} onClick={() => setShowDeleteModal(prev => !prev)}>Delete</Button>
                    }
                    <Button className="btn-success" processing={processing}>{isEdit ? "Update" : "Submit"}</Button>
                </div>
            </form>
            {
                isEdit &&
                <Modal show={showDeleteModal} setShow={setShowDeleteModal} title="Delete Product" content={<DeleteProduct toggleModal={setShowDeleteModal} id={product.id} />} />
            }
        </>
    )
}

export default ProductForm