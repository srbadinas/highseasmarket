'use client'

import Alert from "@components/Alert"
import Card from "@components/Card"
import Loader from "@components/Loader"
import PageHeader from "@components/dashboard/PageHeader"
import LicenseList from "@components/dashboard/panels/LicenseList"
import UserForm from "@components/forms/UserForm"
import useFetch from "@hooks/useFetch"
import { Tab, TabList, TabPanel, Tabs } from "react-tabs"

const EditUser = ({ params }) => {
    const { id } = params;
    const { data: user, loading: userLoading, error: userError, refetch: userRefetch } = useFetch('/api/dashboard/users/' + id);
    const { data: licenses, loading: licensesLoading, error: licensesError, refetch: licensesRefetch } = useFetch('/api/dashboard/licenses/getByUserId/' + id);

    return (
        <>
            <PageHeader text="Users" subHeader={['Edit']} />
            {
                userLoading ? <Loader /> : userError ? <Alert type="error" message="User not found" /> :
                    user &&
                    <div className="flex flex-col gap-4 lg:flex-row">
                        <Card className="w-full lg:w-[50%]">
                            <UserForm userData={user} isEdit={true} className="w-full" refetch={userRefetch} />
                        </Card>
                        <Card className="w-full lg:w-[50%]">
                            <Tabs>
                                <TabList>
                                    <Tab>Licenses</Tab>
                                    <Tab>Transactions</Tab>
                                </TabList>
                                <TabPanel>
                                    <LicenseList data={licenses} loading={licensesLoading} error={licensesError} />
                                </TabPanel>
                                <TabPanel>
                                </TabPanel>
                            </Tabs>
                        </Card>
                    </div>
            }
        </>
    )
}

export default EditUser