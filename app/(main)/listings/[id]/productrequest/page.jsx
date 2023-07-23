'use client'

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import Button from "@components/Button"
import Container from "@components/Container"
import InputCheckbox from "@components/InputCheckbox"
import InputLabel from "@components/InputLabel"
import InputText from "@components/InputText"
import SectionHeader from "@components/SectionHeader"
import useFetch from "@hooks/useFetch"
import fieldChange from "@utils/fieldChange"
import Loader from "@components/Loader"
import InputCurrency from "@components/InputCurrency"
import Alert from "@components/Alert"
import SweetAlert from "@lib/SweetAlert"
import { useRouter } from "next/navigation"


const ProductRequest = ({ params }) => {
    const { id: slug } = params;
    const { data: product, loading: productLoading, error: productError } = useFetch('/api/dashboard/products/getBySlug/' + slug);
    const { data: session } = useSession();
    const router = useRouter();

    const [productRequest, setProductRequest] = useState({
        'requested_to_user_id': '',
        'requested_by_user_id': '',
        'product_id': '',
        'status_id': '',
        'product_name': '',
        'product_price': 0,
        'company': '',
        'quantity': 1,
        'price_per_unit': 0,
        'same_address': false,
        'shipping_address': '',
        'city': '',
        'state': '',
        'zip_code': '',
    });

    const [pageProcessing, setPageProcessing] = useState(true);
    const [processing, setProcessing] = useState(false);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        if (session && product) {
            setProductRequest(prevProductRequest => (
                {
                    ...prevProductRequest,
                    requested_to_user_id: product.created_by_user_id,
                    requested_by_user_id: session?.user?.id,
                    product_id: product.id,
                    status_id: 1,
                    product_name: product.product_name,
                    product_price: product.product_price,
                    company: session?.user?.company,
                    quantity: 1,
                    price_per_unit: product.product_price,
                    shipping_address: session?.user?.address,
                    city: session?.user?.city,
                    state: session?.user?.state,
                    zip_code: session?.user?.zip_code,
                }
            ));

            setPageProcessing(false);
        }

        return () => {
            setProductRequest({});
        }
    }, [session, product]);

    const onHandleChange = (e) => {
        fieldChange(e, productRequest, setProductRequest);
    }

    const onHandleSameAddressChange = (e) => {
        fieldChange(e, productRequest, setProductRequest);

        if (e.target.checked) {
            setProductRequest(prevProductRequest => (
                {
                    ...prevProductRequest,
                    shipping_address: session?.user?.address,
                    city: session?.user?.city,
                    state: session?.user?.state,
                    zip_code: session?.user?.zip_code,
                }
            ));
        }
    }

    const onHandleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);
        try {
            const data = {
                ...productRequest,
            }

            delete data.same_address;

            const res = await fetch('/api/dashboard/productrequests', {
                method: 'post',
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                throw new Error('Something went wrong. Please try again later.');
            }

            SweetAlert({
                title: "Success!",
                text: "Product has been requested.",
                icon: "success",
                confirmButtonText: "Continue",
            }).then((result) => {
                if (result.isConfirmed) {
                    router.push('/dashboard/productrequests');
                }
            });

        } catch (error) {
            setMessage({
                type: 'error',
                content: error.message,
            });
        } finally {
            setProcessing(false);
        }
    }

    return (
        <Container className="p-4">
            <SectionHeader text="Request a product" />
            <div className="w-[80%] mx-auto">
                <p className="mb-8 text-center">
                    Thank you for selecting our product! Please provide the necessary details below to proceed with your request. We appreciate your interest and look forward to assisting you further.
                </p>
                {
                    pageProcessing ? <Loader /> : <form method="POST" onSubmit={(e) => onHandleSubmit(e)}>
                        {
                            message ? <Alert type={message.type} message={message.content} /> : ''
                        }
                        <div className="mb-4">
                            <InputLabel forInput="company" required>Company</InputLabel>
                            <InputText name="company" value={productRequest.company} required processing={processing} handleChange={onHandleChange} />
                        </div>
                        <div className="flex gap-4 mb-4">
                            <div className="w-[50%]">
                                <InputLabel forInput="quantity" required>Quantity of the product</InputLabel>
                                <InputText name="quantity" value={productRequest.quantity} required processing={processing} handleChange={onHandleChange} />
                            </div>
                            <div className="w-[50%]">
                                <InputLabel forInput="price_per_unit" required>Price per unit</InputLabel>
                                <InputCurrency name="price_per_unit" value={productRequest.price_per_unit} required processing={processing} handleChange={onHandleChange} />
                            </div>
                        </div>
                        <div className="mb-4">
                            <InputCheckbox name="same_address" value={productRequest.same_address} forInput="same_address" label="Same address?" handleChange={onHandleSameAddressChange} />
                        </div>
                        <div className="mb-4">
                            <InputLabel forInput="shipping_address" required>Shipping Address</InputLabel>
                            <InputText name="shipping_address" value={productRequest.shipping_address} required disabled={productRequest.same_address ? true : false} processing={processing} handleChange={onHandleChange} />
                        </div>
                        <div className="flex gap-4 mb-4">
                            <div className="w-[33.3%]">
                                <InputLabel forInput="city" required>City</InputLabel>
                                <InputText name="city" value={productRequest.city} required disabled={productRequest.same_address ? true : false} processing={processing} handleChange={onHandleChange} />
                            </div>
                            <div className="w-[33.3%]">
                                <InputLabel forInput="state" required>State</InputLabel>
                                <InputText name="state" value={productRequest.state} required disabled={productRequest.same_address ? true : false} processing={processing} handleChange={onHandleChange} />
                            </div>
                            <div className="w-[33.3%]">
                                <InputLabel forInput="zip_code" required>Zip code</InputLabel>
                                <InputText name="zip_code" value={productRequest.zip_code} required disabled={productRequest.same_address ? true : false} processing={processing} handleChange={onHandleChange} />
                            </div>
                        </div>
                        <div className="text-end">
                            <Button processing={processing}>Submit</Button>
                        </div>
                    </form>
                }
            </div>
        </Container>
    )
}

export default ProductRequest