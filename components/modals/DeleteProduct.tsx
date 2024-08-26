import Alert from "@/components/Alert";
import Button from "@/components/Button";
import { SweetAlert } from "@/lib/SweetAlert";
import { useProductStore } from "@/stores/productStore";
import { Message } from "@/types/Message";
import { getError } from "@/utils/getError";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";

interface DeleteProductProps {
    id: number,
    toggleModal: Dispatch<SetStateAction<boolean>>,
}

const DeleteProduct = ({ id, toggleModal }: DeleteProductProps) => {
    const { data: session } = useSession();
    const [processing, setProcessing] = useState(false);
    const fetchProducts = useProductStore((state) => state.fetchProducts);
    const [message, setMessage] = useState<Message | null>(null);

    if (!session) return;

    const handleDelete = (e: FormEvent) => {
        e.preventDefault();
        setProcessing(true);

        axios(`${process.env.NEXT_PUBLIC_BASE_URI}/api/products/` + id, {
            method: 'delete',
            headers: {
                Authorization: `Bearer ${session.user.token}`
            },
        })
            .then(res => {
                if (res.status !== 200) return;
                SweetAlert({
                    title: "Success!",
                    text: "Product has been deleted.",
                    icon: "success",
                    confirmButtonText: "Ok",
                }).then((result) => {
                    if (result.isConfirmed) {
                        fetchProducts(session.user.token);
                        toggleModal && toggleModal(prev => !prev);
                    }
                });
            })
            .catch((err: AxiosError) => {
                const errorMessage = getError(err);
                setMessage({
                    type: 'error',
                    content: errorMessage
                });
            })
            .finally(() => {
                setProcessing(false);
            });
    }

    return (
        <>
            {
                message ? <Alert type={message.type} message={message.content} /> : ''
            }
            <Alert type="error" message="Are yu sure you want to delete this product?" />
            <div className="flex justify-end gap-x-2 mt-4">
                <Button type="button" className="btn-transparent" onClick={() => toggleModal(prev => !prev)}>Cancel</Button>
                <Button type="button" className="btn-danger" processing={processing} onClick={handleDelete}>Delete</Button>
            </div>
        </>
    )
}

export default DeleteProduct