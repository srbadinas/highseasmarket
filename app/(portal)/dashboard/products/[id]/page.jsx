'use client'

import useFetch from "@hooks/useFetch"
import Card from "@components/Card";
import PageHeader from "@components/dashboard/PageHeader";
import ProductForm from "@components/forms/ProductForm";
import Loader from "@components/Loader";
import Alert from "@components/Alert";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import ProductRequestList from "@components/dashboard/panels/ProductRequestList";
import ProductViewList from "@components/dashboard/panels/ProductViewList";

const EditProduct = ({ params }) => {
  const { id } = params;
  const { data: product, loading: productLoading, error: productError, refetch: productRefetch } = useFetch('/api/dashboard/products/' + id);
  const { data: productRequests, loading: productRequestsLoading, error: productRequestsError, refetch: productRequestRefetch } = useFetch('/api/dashboard/productrequests/getByProductId/' + id);
  const { data: productViews, loading: productViewsLoading, error: productViewsError, refetch: productViewsRefetch } = useFetch('/api/dashboard/productviews/getByProductId/' + id);
  
  return (
    <>
      <PageHeader text="Products" subHeader="Details" />
      {
        productLoading ? <Loader /> : productError ? <Alert type="error" message="Product not found" /> :
          product &&
          <div className="flex flex-col gap-4 lg:flex-row">
            <Card className="w-full lg:w-[50%]">
              <ProductForm productData={product} isEdit={true} className="w-full" refetch={productRefetch} />
            </Card>
            <Card className="w-full lg:w-[50%]">
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
                  <ProductViewList data={productViews} loading={productViewsLoading} error={productViewsError}/>
                </TabPanel>
              </Tabs>
            </Card>
          </div>
      }
    </>
  )
}

export default EditProduct