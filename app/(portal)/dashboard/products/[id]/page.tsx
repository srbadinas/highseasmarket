'use client'

import useFetch from "@/hooks/useFetch"
import Card from "@/components/Card";
import PageHeader from "@/components/dashboard/PageHeader";
import ProductForm from "@/components/forms/ProductForm";
import Loader from "@/components/Loader";
import Alert from "@/components/Alert";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import ProductRequestList from "@/components/dashboard/panels/ProductRequestList";
import ProductViewList from "@/components/dashboard/panels/ProductViewList";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { ProductDto } from "@/types/objects/ProductDto";
import { getError } from "@/utils/getError";
import { Message } from "@/types/Message";

interface EditProductProps {
  params: {
    id: string
  },
}

const EditProduct = ({ params }: EditProductProps) => {
  const { data: session } = useSession();
  const [product, setProduct] = useState<ProductDto | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<Message | null>(null);

  useEffect(() => {
    if (!session) return;
    const getProduct = () => {
      setLoading(true);
      axios(`${process.env.NEXT_PUBLIC_BASE_URI}/api/products/` + params.id, {
        headers: {
          'Authorization': `Bearer ${session.user.token}`
        }
      })
        .then(res => {
          if (res.status !== 200) return;
          const { data: product }: { data: ProductDto } = res.data;
          setProduct(product);
        })
        .catch((err: AxiosError) => {
          const errorMessage = getError(err);
          setMessage({
            type: 'error',
            content: errorMessage
        });
        })
        .finally(() => {
          setLoading(false);
        });
    };

    getProduct();
  }, [session]);


  return (
    <>
      <PageHeader text="Products" subHeader={["Details"]} />
      {
        loading ? <Loader /> : message ? <Alert type={message.type} message={message.content} /> :
          product &&
          <div className="flex flex-col gap-4 lg:flex-row">
            <Card className="w-full lg:w-[50%]">
              <ProductForm product={product} editable={true} className="w-full" />
            </Card>
            {/* <Card className="w-full lg:w-[50%]">
              <Tabs>
                <TabList>
                  <Tab>Requests</Tab>
                  <Tab>Invoices</Tab>
                  <Tab>Views ({productViews ? productViews?.length : '...'})</Tab>
                </TabList>
                <TabPanel>
                  <ProductRequestList isPanel={true} data={productRequests} loading={productRequestsLoading} error={productRequestsError} />
                </TabPanel>
                <TabPanel>
                  2
                </TabPanel>
                <TabPanel>
                  <ProductViewList data={productViews} loading={productViewsLoading} error={productViewsError} />
                </TabPanel>
              </Tabs>
            </Card> */}
          </div>
      }
    </>
  )
}

export default EditProduct