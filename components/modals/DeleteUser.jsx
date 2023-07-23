import { useState } from "react"
import Alert from "@components/Alert"
import Button from "@components/Button"
import SweetAlert from "@lib/SweetAlert";
import { useRouter } from "next/navigation";

const DeleteUser = ({ toggleModal, id, refetch }) => {
    const router = useRouter();
    const [message, setMessage] = useState(null);
    const [processing, setProcessing] = useState(false);

    const handleDelete = async (e) => {
        setProcessing(true);
        try {
            const res = await fetch('/api/dashboard/users/' + id, {
                method: 'delete'
            });

            if (!res.ok) {
                throw new Error('Something went wrong. Please try again later.');
            }

            toggleModal(prev => !prev);

            if (refetch) {
                SweetAlert({
                    title: "Success!",
                    text: "User has been deleted.",
                    icon: "success",
                    confirmButtonText: "Ok",
                }).then((result) => {
                    if (result.isConfirmed) {
                        refetch();
                    }
                });

                return false;
            }

            SweetAlert({
                title: "Success!",
                text: "User has been deleted.",
                icon: "success",
                confirmButtonText: "Ok",
            }).then((result) => {
                if (result.isConfirmed) {
                    router.push('/dashboard/users');
                }
            });
        } catch (err) {
            setMessage({
                type: 'error',
                content: err.message,
            });
        } finally {
            setProcessing(false);
        }
    }

    return (
        <>
            {
                message ? <Alert type={message.type} message={message.content} /> : ''
            }
            <Alert type="error" message="Are yu sure you want to delete this user?" />
            <div className="flex justify-end gap-x-2 mt-4">
                <Button type="button" className="btn-transparent" onClick={() => toggleModal(prev => !prev)}>Cancel</Button>
                <Button type="button" className="btn-danger" processing={processing} onClick={(e) => handleDelete(e)}>Delete</Button>
            </div>
        </>
    )
}

export default DeleteUser