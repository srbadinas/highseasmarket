import Dropdown from "@components/Dropdown"
import Table from "../Table"
import generateUniqueId from "@utils/uniqueId"

const LicenseList = ({ isPanel = false, data, loading, error }) => {
    return (
        <Table>
            <Table.Head>
                <tr>
                    <th>License</th>
                    <th></th>
                </tr>
            </Table.Head>
            <Table.Body loading={loading} error={error}>
                {
                    data && data.length > 0 ? data.map(item => {
                        return <tr key={generateUniqueId(item.id)}>
                            <td>{item.license}</td>
                            <td>
                                <Dropdown toggleContent="..." hasIcon={false}>
                                    <Dropdown.Item href="#" icon="fa-trash-alt" text="Delete" />
                                </Dropdown>
                            </td>
                        </tr>
                    }) : null
                }
            </Table.Body>
        </Table>
    )
}

export default LicenseList