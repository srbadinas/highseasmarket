'use client'

import { useState } from "react";
import Card from "@components/Card";
import PageHeader from "@components/dashboard/PageHeader";
import LabelDateTime from "@components/LabelDateTime";
import LabelCurrency from "@components/LabelCurrency";
import useFetch from "@hooks/useFetch";
import generateUniqueId from "@utils/uniqueId";
import InputCheckbox from "@components/InputCheckbox";
import Dropdown from "@components/Dropdown";
import Table from "@components/dashboard/Table";
import Modal from "@components/Modal";
import ViewListingRequest from "@components/modals/ViewListingRequest";

const ListingRequests = () => {
  const { data: listingRequests, loading: listingRequestsLoading, error: listingRequestsError, refetch: listingRequestsRefetch } = useFetch('/api/dashboard/listingrequests');

  const [showViewModal, setShowViewModal] = useState(false);
  const [viewModal, setViewModal] = useState(null);

  const onHandleToggleViewModal = (e, id) => {
    setViewModal(<ViewListingRequest toggleModal={setShowViewModal} id={id} refetch={listingRequestsRefetch} />)
    setShowViewModal(prev => !prev);
  }

  return (<>
    <PageHeader text="Listing Requests" />
    <Card>
      <Table>
        <Table.Head>
          <tr>
            <th>
              <InputCheckbox />
            </th>
            <th>ID</th>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Date needed</th>
            <th>Created at</th>
            <th>Last updated at</th>
            <th></th>
          </tr>
        </Table.Head>
        <Table.Body loading={listingRequestsLoading} error={listingRequestsError}>
          {
            listingRequests && listingRequests.map(item => {
              return <tr key={generateUniqueId(item.id)}>
                <td><InputCheckbox /></td>
                <td>{item.id}</td>
                <td>{item.product_name}</td>
                <td><LabelCurrency>{item.product_price}</LabelCurrency></td>
                <td>{item.quantity}</td>
                <td><LabelDateTime datetime={item.needed_at} /></td>
                <td><LabelDateTime datetime={item.created_at} /></td>
                <td><LabelDateTime datetime={item.updated_at} /></td>
                <td>
                  <Dropdown toggleContent="..." hasIcon={false}>
                    <Dropdown.Item icon="fa-eye" text="View" handleClick={(e) => onHandleToggleViewModal(e, item.id)} />
                  </Dropdown>
                </td>
              </tr>
            })
          }
        </Table.Body>
      </Table>
    </Card>
    <Modal show={showViewModal} setShow={setShowViewModal} title="View Listing Request" content={viewModal} />
  </>
  )
}

export default ListingRequests