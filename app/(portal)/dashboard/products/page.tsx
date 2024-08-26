'use client';

import { ReactNode, useEffect, useState } from "react";
import Badge from "@/components/Badge";
import Button from "@/components/Button";
import Card from "@/components/Card";
import PageHeader from "@/components/dashboard/PageHeader";
import LabelDateTime from "@/components/LabelDateTime";
import { Dropdown, DropdownItem } from "@/components/Dropdown";
import LabelCurrency from "@/components/LabelCurrency";
import Modal from "@/components/Modal";
import ProductForm from "@/components/forms/ProductForm";
import InputCheckbox from "@/components/InputCheckbox";
import { Table, TableBody, TableHead } from "@/components/dashboard/Table";
import { useSession } from "next-auth/react";
import { useProductStore } from "@/stores/productStore";
import { PlusCircle } from "@phosphor-icons/react";
import DeleteProduct from "@/components/modals/DeleteProduct";

const Products = () => {
    const { data: session } = useSession();

    const products = useProductStore((state) => state.products);
    const loading = useProductStore((state) => state.loading);
    const error = useProductStore((state) => state.error);
    const fetchProducts = useProductStore((state) => state.fetchProducts);

    const [showAddModal, setShowAddModal] = useState<boolean>(false);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [deleteModal, setDeleteModal] = useState<ReactNode | null>(null);

    useEffect(() => {
        if (!session) return;
        fetchProducts(session.user.token);
    }, [session]);

    if (!session) return;

    const onHandleToggleDeleteModal = (id: number) => {
        setDeleteModal(<DeleteProduct id={id} toggleModal={setShowDeleteModal} />)
        setShowDeleteModal(prev => !prev);
    }

    return (
        <>
            <PageHeader text="Products" />
            <Card>
                <div className="w-full flex justify-end">
                    <Button type="button" className="btn btn-success" onClick={() => setShowAddModal(prev => !prev)}><PlusCircle size={18} />Add Product</Button>
                </div>
                <Table>
                    <TableHead>
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
                    </TableHead>
                    <TableBody loading={loading} errorMessage={error} >
                        {
                            products.length > 0 ? products.map(item => {
                                return (
                                    <tr key={`product-${item.id}`}>
                                        <td><InputCheckbox /></td>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td><LabelCurrency value={item.price} /></td>
                                        <td>
                                            <Badge style={item.is_published ? "success" : "danger"} text={item.is_published ? "Yes" : "No"} />
                                        </td>
                                        <td><LabelDateTime value={item.created_date} /></td>
                                        <td><LabelDateTime value={item.last_updated_date} /></td>
                                        <td>
                                            <Dropdown toggleContent="..." hasIcon={false}>
                                                <DropdownItem href={"/dashboard/products/" + item.id} icon="fa-edit" text="Details" />
                                                <DropdownItem icon="fa-trash-alt" text="Delete" handleClick={() => onHandleToggleDeleteModal(item.id)} />
                                            </Dropdown>
                                        </td>
                                    </tr>
                                )
                            }) : ''
                        }
                    </TableBody>
                </Table>
            </Card>
            <Modal show={showAddModal} setShow={setShowAddModal} title="Add Product" content={<ProductForm editable={false} toggleModal={setShowAddModal} />} />
            <Modal show={showDeleteModal} setShow={setShowDeleteModal} title="Delete Product" content={deleteModal} />
        </>
    )
}

export default Products