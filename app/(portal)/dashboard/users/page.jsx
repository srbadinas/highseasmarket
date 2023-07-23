'use client'

import { useState } from "react"
import Button from "@components/Button"
import Card from "@components/Card"
import InputCheckbox from "@components/InputCheckbox"
import PageHeader from "@components/dashboard/PageHeader"
import generateUniqueId from "@utils/uniqueId"
import Dropdown from "@components/Dropdown"
import useFetch from "@hooks/useFetch"
import LabelDateTime from "@components/LabelDateTime"
import Badge from "@components/Badge"
import UserForm from "@components/forms/UserForm"
import Modal from "@components/Modal"
import Table from "@components/dashboard/Table"
import DeleteUser from "@components/modals/DeleteUser"

const Users = () => {
    const { data: users, loading: usersLoading, error: usersError, refetch: usersRefetch } = useFetch('/api/dashboard/users');
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(null);

    const onHandleToggleDeleteModal = (e, id) => {
        setDeleteModal(<DeleteUser toggleModal={setShowDeleteModal} id={id} refetch={usersRefetch} />)
        setShowDeleteModal(prev => !prev);
    }

    return (
        <>
            <PageHeader text="Users" />
            <Card>
                <div className="w-full text-right mb-4">
                    <Button type="button" className="btn btn-success" onClick={() => setShowAddModal(prev => !prev)}><i className="fas fa-plus-circle mr-2"></i>Add User</Button>
                </div>
                <Table className="dashboard-table">
                    <Table.Head>
                        <tr>
                            <th>
                                <InputCheckbox />
                            </th>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Email</th>
                            <th>Active</th>
                            <th>Created at</th>
                            <th>Last updated at</th>
                            <th></th>
                        </tr>
                    </Table.Head>
                    <Table.Body loading={usersLoading} error={usersError} >
                        {
                            users && users.map(item => {
                                return <tr key={generateUniqueId(item.id)}>
                                    <td><InputCheckbox /></td>
                                    <td>{item.id}</td>
                                    <td>{item.firstname} {item.lastname}</td>
                                    <td>{item.user_role}</td>
                                    <td>{item.email}</td>
                                    <td>
                                        <Badge style={item.is_active ? "success" : "danger"} text={item.is_active ? "Yes" : "No"} />
                                    </td>
                                    <td><LabelDateTime datetime={item.created_at} /></td>
                                    <td><LabelDateTime datetime={item.updated_at} /></td>
                                    <td>
                                        <Dropdown toggleContent="..." hasIcon={false}>
                                            <Dropdown.Item href={"/dashboard/users/" + item.id} icon="fa-edit" text="Edit" />
                                            <Dropdown.Item icon="fa-trash-alt" text="Delete" handleClick={(e) => onHandleToggleDeleteModal(e, item.id)} />
                                        </Dropdown>
                                    </td>
                                </tr>
                            })
                        }
                    </Table.Body>
                </Table>
            </Card>

            <Modal show={showAddModal} setShow={setShowAddModal} title="Add User" content={<UserForm toggleModal={setShowAddModal} reloadUsers={usersRefetch} />} />
            <Modal show={showDeleteModal} setShow={setShowDeleteModal} title="Delete User" content={deleteModal} />

        </>
    )
}

export default Users