import LabelDateTime from "@/components/LabelDateTime"
import { useSession } from "next-auth/react";
import InputCheckbox from "@/components/InputCheckbox";
import Loader from "@/components/Loader";

const ProductRequestList = () => {
    return (
        // session ?
        //     <Table>
        //         <Table.Head>
        //             <tr>
        //                 {
        //                     !isPanel && <th>
        //                         <InputCheckbox />
        //                     </th>
        //                 }
        //                 <th>ID</th>
        //                 <th>Product</th>
        //                 <th>Requested By</th>
        //                 <th>Requested To</th>
        //                 <th>Requested at</th>
        //                 <th>Last updated at</th>
        //                 <th></th>
        //             </tr>
        //         </Table.Head>
        //         <Table.Body loading={loading} error={error}>
        //             {
        //                 data && data.length > 0 ? data.map(item => {
        //                     return <tr key={generateUniqueId(item.id)}>
        //                         {
        //                             !isPanel && <td><InputCheckbox /></td>
        //                         }
        //                         <td>{item.id}</td>
        //                         <td>{item.product_name}</td>
        //                         <td>
        //                             {session?.user?.id == item.requested_by_user_id ? "Me" : item.requested_by_user}
        //                         </td>
        //                         <td>
        //                             {session?.user?.id == item.requested_to_user_id ? "Me" : item.requested_to_user}
        //                         </td>
        //                         <td><LabelDateTime datetime={item.created_date} /></td>
        //                         <td><LabelDateTime datetime={item.updated_at} /></td>
        //                         <td>
        //                             <Dropdown toggleContent="..." hasIcon={false}>
        //                                 <Dropdown.Item href={"/dashboard/productrequests/" + item.id} icon="fa-eye" text="View" />
        //                             </Dropdown>
        //                         </td>
        //                     </tr>
        //                 }) : null
        //             }
        //         </Table.Body>
        //     </Table> : <Loader />
        <></>
    )
}

export default ProductRequestList