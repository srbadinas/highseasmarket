'use client';

import Button from "@components/Button";
import Container from "@components/Container"
import LabelCurrency from "@components/LabelCurrency";
import SectionHeader from "@components/SectionHeader"
import { useEffect, useState } from "react";
import generateUniqueId from "@utils/uniqueId";
import CustomImage from "@components/CustomImage";
import useFetch from "@hooks/useFetch";
import Link from "next/link";
import Loader from "@components/Loader";
import { useRouter, useSearchParams } from "next/navigation";

const Listings = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [url, setUrl] = useState(null);
    const [sortDirection, setSortDirection] = useState();

    const { data: listings, loading: listingsLoading, error: listingsError } = useFetch(url);

    useEffect(() => {
        
    }, []);

    useEffect(() => {
        let searchText = searchParams.get('q') ? searchParams.get('q') : '';
        let sortBy = searchParams.get('sort') ? searchParams.get('sort') : 'created_at';
        let sortDirection = searchParams.get('sort_direction') ? searchParams.get('sort_direction') : 'desc';
        setSortDirection(sortDirection);

        setUrl(`/api/public/listings?q=${searchText}&is_publish=1&sort=${sortBy}&sort_direction=${sortDirection}&limit=15`, { cache: 'no-store' });
    }, [searchParams]);

    const onHandleSort = () => {
        let searchText = searchParams.get('q') ? searchParams.get('q') : '';
        let sortDirection = !searchParams.get('sort_direction') ? 'desc' : searchParams.get('sort_direction') == 'asc' ? 'desc' : 'asc';

        router.push('/listings?q=' + searchText + '&sort_direction=' + sortDirection)
    }

    return (
        <Container className="!p-4">
            <SectionHeader text="Listings" />
            <div className="flex justify-between mb-6">
                <Button type="button" onClick={() => onHandleSort()}>
                    <i className={`fas fa-sort-amount-${sortDirection == 'asc' ? "down-alt" : "up"} mr-2`} aria-hidden="true"></i> Sorted by Date
                </Button>

                <Link href="/listings/listingrequest" className="btn btn-default">Listing Request</Link>
            </div>
            <div className="mb-6 sm:flex sm:flex-wrap">
                {
                    listingsLoading ? <Loader className="!w-[80px]" /> : listings && listings.map(item => {
                        return <div key={generateUniqueId(item.id)} className="w-full p-0 mb-6 sm:p-2 lg:p-0  sm:w-[50%] lg:w-full">
                            <div className="rounded border border-gray-200 transition duration-300 hover:overflow-hidden hover:scale-105">
                                <Link href={"/listings/" + item.slug} className="w-full h-full flex flex-col justify-between min-h-[190px] lg:flex-row hover:brightness-100">
                                    <div className="w-full lg:w-[260px] flex justify-center items-center p-4 relative">
                                        <CustomImage src={item.image_url} />
                                    </div>
                                    <div className="flex flex-col lg:flex-row w-full lg:w-[calc(100%-260px)]">
                                        <div className="w-full lg:w-[calc(100%-210px)] p-4">
                                            <h4 className="truncate text-xl font-semibold mb-3">{item.product_name}</h4>
                                            <p className="text-sm">
                                                {item.product_description.length > 450 ? item.product_description.substring(0, 450) + '...' : item.product_description}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-between w-full lg:w-[210px] border-t lg:border-t-0 lg:border-l border-gray-200 p-4">
                                        <h6 className="font-semibold truncate text-sm !text-xl text-right mb-4 lg:mb-0 lg:text-left">
                                            <LabelCurrency>{item.product_price}</LabelCurrency>
                                            {item.unit ? <span className="text-xs font-normal text-gray-400"> per {item.unit}</span> : ""}
                                        </h6>
                                        <div className="flex flex-col text-xs font-normal">
                                            <h6 className="text-right mb-1 text-gray-400">
                                                {item.stock > 0 ? item.stock + ' available' : <span className="text-red-600">Out of stock</span>}
                                            </h6>
                                            <Button type="button" className="hover:brightness-100">Read More</Button>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    })
                }
            </div>
        </Container>
    )
}

export default Listings