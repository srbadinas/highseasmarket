'use client';

import { useState } from "react";
import Badge from "@components/Badge";
import Button from "@components/Button";
import Card from "@components/Card";
import PageHeader from "@components/dashboard/PageHeader";
import LabelDateTime from "@components/LabelDateTime";
import Dropdown from "@components/Dropdown";
import LabelCurrency from "@components/LabelCurrency";
import Modal from "@components/Modal";
import ProductForm from "@components/forms/ProductForm";
import useFetch from "@hooks/useFetch";
import generateUniqueId from "@utils/uniqueId";
import InputCheckbox from "@components/InputCheckbox";
import Table from "@components/dashboard/Table";
import DeleteProduct from "@components/modals/DeleteProduct";

const Products = () => {
    const { data: products, loading: productsLoading, error: productsError, refetch: productsRefetch } = useFetch('/api/dashboard/products');
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(null);

    const onHandleToggleDeleteModal = (e, id) => {
        setDeleteModal(<DeleteProduct toggleModal={setShowDeleteModal} id={id} refetch={productsRefetch} />)
        setShowDeleteModal(prev => !prev);
    }
    return (
        <>
            <PageHeader text="Products" />
            <Card>
                <div className="w-full text-right mb-4">
                    <Button type="button" className="btn btn-success" onClick={() => setShowAddModal(prev => !prev)}><i className="fas fa-plus-circle mr-2"></i>Add Product</Button>
                </div>
                <Table>
                    <Table.Head>
                        <tr>
                            <th>
                                <InputCheckbox />
                            </th>
                            <th>ID</th>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Publish</th>
                            <th>Created at</th>
                            <th>Last updated at</th>
                            <th></th>
                        </tr>
                    </Table.Head>
                    <Table.Body loading={productsLoading} error={productsError} >
                        {
                            products && products.map(item => {
                                return <tr key={generateUniqueId(item.id)}>
                                    <td><InputCheckbox /></td>
                                    <td>{item.id}</td>
                                    <td>{item.product_name}</td>
                                    <td><LabelCurrency>{item.product_price}</LabelCurrency></td>
                                    <td>
                                        <Badge style={item.is_publish ? "success" : "danger"} text={item.is_publish ? "Yes" : "No"} />
                                    </td>
                                    <td><LabelDateTime datetime={item.created_at} /></td>
                                    <td><LabelDateTime datetime={item.updated_at} /></td>
                                    <td>
                                        <Dropdown toggleContent="..." hasIcon={false}>
                                            <Dropdown.Item href={"/dashboard/products/" + item.id} icon="fa-edit" text="Details" />
                                            <Dropdown.Item icon="fa-trash-alt" text="Delete" handleClick={(e) => onHandleToggleDeleteModal(e, item.id)} />
                                        </Dropdown>
                                    </td>
                                </tr>
                            })
                        }
                    </Table.Body>
                </Table>
            </Card>
            <Modal show={showAddModal} setShow={setShowAddModal} title="Add Product" content={<ProductForm toggleModal={setShowAddModal} reloadProducts={productsRefetch} />} />
            <Modal show={showDeleteModal} setShow={setShowDeleteModal} title="Delete Product" content={deleteModal} />
        </>
    )
}

export default Products