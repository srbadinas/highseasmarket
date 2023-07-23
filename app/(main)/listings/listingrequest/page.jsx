'use client'

import Alert from "@components/Alert"
import Button from "@components/Button"
import Container from "@components/Container"
import InputCurrency from "@components/InputCurrency"
import InputDateTime from "@components/InputDateTime"
import InputLabel from "@components/InputLabel"
import InputNumber from "@components/InputNumber"
import InputText from "@components/InputText"
import InputTextArea from "@components/InputTextArea"
import Loader from "@components/Loader"
import SectionHeader from "@components/SectionHeader"
import SweetAlert from "@lib/SweetAlert"
import fieldChange from "@utils/fieldChange"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"

const ListingRequest = () => {
    const { data: session, status: sessionStatus } = useSession();
    const router = useRouter();
    const [message, setMessage] = useState(null);
    const [listingRequest, setListingRequest] = useState({
        product_name: '',
        product_description: '',
        product_price: 0,
        quantity: 0,
        needed_at: '',
    });
    const [processing, setProcessing] = useState(false);

    const onHandleChange = (e) => {
        fieldChange(e, listingRequest, setListingRequest);
    }

    const onHandleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);
        try {
            const data = {
                ...listingRequest,
                requested_by_user_id: session?.user?.id
            }

            const res = await fetch('/api/public/listings/listingrequests', {
                method: 'post',
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                throw new Error('Something went wrong. Please try again later.');
            }

            SweetAlert({
                title: "Success!",
                text: "Listing has been requested.",
                icon: "success",
                confirmButtonText: "Continue",
            }).then((result) => {
                if (result.isConfirmed) {
                    if (session?.user) {
                        router.push('/dashboard/listingrequests');
                        return false;
                    }

                    router.push('/listings');
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
        <Container className="!p-4">
            <SectionHeader text="Listing Request" />
            <div className="w-[80%] mx-auto">
                <p className="mb-8 text-center">
                    We appreciate your interest in our products. The requested product is currently not listed on our page. Please fill out the Listing Request form below, and we will make every effort to add it to our inventory. Thank you for your understanding and cooperation.
                </p>
                {
                    sessionStatus != 'loading' ? <form method="POST" onSubmit={(e) => onHandleSubmit(e)}>
                        {
                            message ? <Alert type={message.type} message={message.content} /> : ''
                        }
                        <div className="mb-4">
                            <InputLabel forInput="product_name" required>Product name</InputLabel>
                            <InputText name="product_name" value={listingRequest.product_name} required processing={processing} handleChange={onHandleChange} />
                        </div>
                        <div className="mb-4">
                            <InputLabel forInput="product_description" required>Description</InputLabel>
                            <InputTextArea name="product_description" value={listingRequest.product_description} required processing={processing} handleChange={onHandleChange} />
                        </div>
                        <div className="flex gap-x-4 mb-4">
                            <div className="w-full mb-4 sm:w-[50%] sm:mb-0">
                                <InputLabel forInput="product_price" required>Price willing to pay</InputLabel>
                                <InputCurrency name="product_price" value={listingRequest.product_price} required processing={processing} handleChange={onHandleChange} />
                            </div>
                            <div className="w-full mb-4 sm:w-[50%] sm:mb-0">
                                <InputLabel forInput="quantity" required>Quantity</InputLabel>
                                <InputNumber name="quantity" value={listingRequest.quantity} required processing={processing} handleChange={onHandleChange} />
                            </div>
                        </div>
                        <div className="mb-4">
                            <InputLabel forInput="needed_at" required>Date needed</InputLabel>
                            <InputDateTime name="needed_at" value={listingRequest.needed_at} required processing={processing} handleChange={onHandleChange} />
                        </div>
                        <div className="text-end">
                            <Button processing={processing}>Submit</Button>
                        </div>
                    </form> : <Loader />
                }
            </div>
        </Container>
    )
}

export default ListingRequest