'use client'

import Alert from '@components/Alert';
import Button from '@components/Button';
import Container from '@components/Container'
import CustomImage from '@components/CustomImage';
import LabelCurrency from '@components/LabelCurrency';
import Loader from '@components/Loader';
import ProductGrid from '@components/ProductGrid';
import useFetch from '@hooks/useFetch';
import Link from 'next/link';

const ListingDetails = ({ params }) => {
    const { data: listingDetails, loading: listingDetailsLoading, error: listingDetailsError } = useFetch('/api/public/listings/' + params.id, { cache: 'no-store' });

    return (
        <Container className="!p-4">
            {listingDetailsLoading ? <Loader /> : listingDetailsError ? <Alert type="error" message={listingDetailsError} /> :
                <>
                    <div className="flex min-h-[80vh] flex-col mb-8 md:flex-row md:mb-0">
                        <div className="flex justify-center items-center w-full md:max-w-[330px] md:max-h-[350px] bg-gray-200 p-4 rounded mr-0 mb-4 md:mr-4 md:mb-0">
                            <CustomImage src={listingDetails?.product?.image_url} />
                        </div>
                        <div className="w-full md:w-[calc(100%-330px)]">
                            <h4 className="text-xl font-semibold mb-4">{listingDetails?.product?.product_name}</h4>
                            <h6 className="font-semibold truncate text-sm !text-3xl text-default-1 mb-6">
                                <LabelCurrency>{listingDetails?.product?.product_price}</LabelCurrency>
                            </h6>
                            <div className="mb-4">
                                <h4 className="text-xl mb-2 text-gray-600">Description</h4>
                                <p>
                                    {listingDetails?.product?.product_description}
                                </p>
                            </div>
                            <div className="flex gap-x-2">
                                <Link href={"/listings/" + params.id + "/productrequest"} className="btn btn-default">Request</Link>
                                <Button type="button" className="btn-outline-default">Chat</Button>
                            </div>
                        </div>
                    </div>
                    {
                        listingDetails?.productsFromMerchant?.length > 0 &&
                        <>
                            <div className="flex flex-col mb-8">
                                <h6 className="text-lg text-gray-600 font-semibold mb-4">More products from Merchant</h6>
                                <ProductGrid products={listingDetails?.productsFromMerchant} className="overflow-x-auto" />
                            </div>
                        </>
                    }
                    {
                        listingDetails?.similarProducts?.length > 0 &&
                        <>
                            <div className="flex flex-col">
                                <h6 className="text-lg text-gray-600 font-semibold mb-4">Similar Products</h6>
                                <ProductGrid products={listingDetails?.similarProducts} className="overflow-x-auto" />
                            </div>
                        </>
                    }
                </>

            }
        </Container>
    )
}

export default ListingDetails