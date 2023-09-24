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
import { useSearchParams } from "next/navigation";
import InputSelect from "@components/InputSelect";
import Alert from "@components/Alert";

const Listings = () => {
    const searchParams = useSearchParams();

    const { data: categories, loading: categoriesLoading, error: categoriesError } = useFetch("/api/public/categories");
    const [selectedCategory, setSelectedCategory] = useState('');
    const [sortField, setSortField] = useState('created_at');
    const [sortDirection, setSortDirection] = useState('desc');
    const [listings, setListings] = useState([]);
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        onHandleFilterChange();
    }, [searchParams, selectedCategory, sortDirection]);

    const onHandleFilterChange = () => {
        setProcessing(true);
        fetch('/api/public/listings', {
            method: 'post',
            body: JSON.stringify({
                keywords: searchParams.get('q'),
                category: selectedCategory,
                sortField: sortField,
                sortDirection: sortDirection,
                limit: 15,
            })
        }).then(res => {
            if (!res.ok) {
                throw new Error(res.statusText);
            };

            return res.json();
        }).then(data => {
            setListings(data);
        }).catch(err => {
            console.log(err)
        }).finally(() => {
            setProcessing(false);
        });
    }

    return (
        <Container className="!p-4">
            <SectionHeader text="Listings" />
            <div className="flex items-center mb-6">
                {
                    categoriesLoading ? <Loader className="!mx-0" /> : <>
                        <span className="block text-base mr-4">Category:</span>
                        {
                            categories && <InputSelect value={selectedCategory} className="!w-auto" defaultOptionText="All" handleChange={(e) => setSelectedCategory(e.target.value)}>
                                {
                                    categories.map(item => {
                                        return <option key={generateUniqueId(item.id)} value={item.slug}>{item.category}</option>
                                    })
                                }
                            </InputSelect>
                        }
                    </>
                }
            </div>
            <div className="flex justify-between mb-6">
                <Button type="button" onClick={() => setSortDirection(prev => prev == 'desc' ? 'asc' : 'desc')}>
                    <i className={`fas fa-sort-amount-${sortDirection == 'asc' ? "up-alt" : "down-alt"} mr-2`} aria-hidden="true"></i> Sorted by Date
                </Button>
                <Link href="/listings/listingrequest" className="btn btn-default">Listing Request</Link>
            </div>
            <div className="mb-6 sm:flex sm:flex-wrap">
                {
                    processing ? <Loader /> : listings ? listings.map(item => {
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
                    }) : <Alert type="info" message="No records found." />
                }
            </div>
        </Container>
    )
}

export default Listings