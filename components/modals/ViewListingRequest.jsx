import Alert from "@components/Alert";
import InputLabel from "@components/InputLabel"
import LabelCurrency from "@components/LabelCurrency";
import LabelDateTime from "@components/LabelDateTime";
import Loader from "@components/Loader";
import useFetch from "@hooks/useFetch"

const ViewListingRequest = ({ toggleModal, id, refetch }) => {
  const { data: listingRequest, loading: listingRequestLoading, error: listingRequestError } = useFetch('/api/dashboard/listingrequests/' + id);
  return (
    <>
      {
        listingRequestLoading ? <Loader /> :
          listingRequest ? <div className="w-full flex flex-wrap">
            <div className="w-full mb-4">
              <InputLabel className="font-semibold">Product name</InputLabel>
              <div className="pl-2">{listingRequest.product_name}</div>
            </div>
            <div className="w-full mb-4">
              <InputLabel className="font-semibold">Description</InputLabel>
              <div className="pl-2">{listingRequest.product_description}</div>
            </div>
            <div className="w-full flex flex-col gap-y-4 gap-x-4 mb-4 sm:flex-row sm:gap-y-0">
                <div className="w-[50%]">
                    <InputLabel className="font-semibold">Price willing to pay</InputLabel>
                    <div className="pl-2">
                        <LabelCurrency>{listingRequest.product_price}</LabelCurrency>
                    </div>
                </div>
                <div className="w-[50%]">
                    <InputLabel className="font-semibold">Quantity</InputLabel>
                    <div className="pl-2">{listingRequest.quantity}</div>
                </div>
            </div>
            <div className="w-full flex flex-col gap-y-4 gap-x-4 mb-4 sm:flex-row sm:gap-y-0">
                <div className="w-[50%]">
                    <InputLabel className="font-semibold">Date needed</InputLabel>
                    <div className="pl-2">
                        <LabelDateTime datetime={listingRequest.needed_at} />
                    </div>
                </div>
                <div className="w-[50%]">
                    <InputLabel className="font-semibold">Requested By</InputLabel>
                    <div className="pl-2">{listingRequest.requested_by_user ? listingRequest.requested_by_user : "Guest"}</div>
                </div>
            </div>
          </div> : <Alert type="error" message="Listing request not found" />
      }
    </>
  )
}

export default ViewListingRequest