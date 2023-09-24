import Alert from "@components/Alert"
import Loader from "@components/Loader"
import Table from "../Table"
import generateUniqueId from "@utils/uniqueId"
import LabelDateTime from "@components/LabelDateTime"

const ProductViewList = ({ data, loading, error }) => {
    return (
        <>
            {
                loading ? <Loader /> : error ? <Alert type="error" message={error} /> : <Table>
                    <Table.Head>
                        <tr>
                            <th>User</th>
                            <th>IP</th>
                            <th className="!text-right">Viewed at</th>
                        </tr>
                    </Table.Head>
                    <Table.Body loading={loading} error={error}>
                        {
                            data && data.length > 0 ? data.map(item => {
                                return <tr key={generateUniqueId(item.id)}>
                                    <td>{item.fullname? item.fullname : 'Guest'}</td>
                                    <td>{item.ip_address}</td>
                                    <td><LabelDateTime datetime={item.created_at} /></td>
                                </tr>
                            }) : null
                        }
                    </Table.Body>
                </Table>
            }
        </>
    )
}

export default ProductViewList