'use client'

import Alert from "@components/Alert"
import Card from "@components/Card"
import Loader from "@components/Loader"
import PageHeader from "@components/dashboard/PageHeader"
import ChatBox from "@components/dashboard/panels/ChatBox"
import ProductRequestDetails from "@components/dashboard/panels/ProductRequestDetails"
import useFetch from "@hooks/useFetch"
import { useSession } from "next-auth/react"
import { Tab, TabList, TabPanel, Tabs } from "react-tabs"

const ViewProductRequest = ({ params }) => {
    const { id } = params;
    const { data: productRequest, loading: productRequestLoading, error: productRequestError } = useFetch('/api/dashboard/productrequests/' + id);
    const { data: chat, loading: chatLoading, error: chatError, refetch: chatRefetch } = useFetch('/api/dashboard/chat/getByProductRequestId/' + id);
    const { data: session } = useSession();

    return (
        <>
            <PageHeader text="Product Requests" subHeader={['View']} />
            <div className="flex flex-col gap-4 lg:flex-row">
                {productRequestLoading ? <Loader /> : productRequestError ? <Alert type="error" message="Product request not found" /> : <>
                    <Card className="w-full lg:w-[50%]">
                        <ProductRequestDetails productRequest={productRequest} />
                    </Card>
                    <Card className="w-full lg:w-[50%]">
                        <Tabs>
                            <TabList>
                                <Tab>Chat</Tab>
                            </TabList>
                            <TabPanel>
                                {
                                    !session && !chat ? <Loader /> :
                                        <ChatBox senderId={session.user.id} recipientId={productRequest.requested_to_user_id} chat={chat} refetch={chatRefetch} />
                                }
                            </TabPanel>
                        </Tabs>
                    </Card>
                </>}
            </div>
        </>
    )
}

export default ViewProductRequest