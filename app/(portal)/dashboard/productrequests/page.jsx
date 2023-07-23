'use client'
import Card from "@components/Card";
import PageHeader from "@components/dashboard/PageHeader";
import useFetch from "@hooks/useFetch";
import ProductRequestList from "@components/dashboard/panels/ProductRequestList";

const ProductRequests = () => {
  const { data: productRequests, loading: productRequestsLoading, error: productRequestsError, refetch: productRequestsRefetch } = useFetch('/api/dashboard/productrequests');
  return (<>
    <PageHeader text="Product Requests" />
    <Card>
      <ProductRequestList data={productRequests} loading={productRequestsLoading} error={productRequestsError} />
    </Card>
  </>
  )
}

export default ProductRequests