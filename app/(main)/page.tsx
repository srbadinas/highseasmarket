'use client'

import Alert from "@/components/Alert";
import Container from "@/components/Container";
import Loader from "@/components/Loader";
import ProductGrid from "@/components/ProductGrid";
import { usePublicStore } from "@/stores/publicStore";
import Link from "next/link";
import { useEffect } from "react";

const Home = () => {
  const newestProducts = usePublicStore((state) => state.newestProducts);
  const initStore = usePublicStore((state) => state.initStore);
  const error = usePublicStore((state) => state.error);
  const loading = usePublicStore((state) => state.loading);

  useEffect(() => {
    initStore();
  }, []);

  return (
    <div className="w-full min-h-[calc(100vh-163.6px)] relative bg-center bg-cover bg-no-repeat bg-fixed p-8" style={{ backgroundImage: 'url(/assets/images/banner-home.jpg)' }}>
      <div className="w-full h-full absolute top-0 left-0 bg-black/[50%]">
        <Container className="!p-4">
          <div className="mb-2">
            <Link href="/listings" className="btn btn-default justify-center !rounded-full w-[150px]">Listings</Link>
          </div>
          <div className="text-center mb-4">
            <h1 className="text-4xl text-default-1 brightness-200 font-bold">Newest Listings</h1>
          </div>
          <div className="w-[90%] mx-auto bg-black/[40%] rounded-md p-4">
            {
              loading ? <Loader className="text-white" /> : error ? <Alert type="error" message={error} /> : <ProductGrid products={newestProducts} className="overflow-x-auto" />
            }
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Home;
