import Alert from "@components/Alert";
import Button from "@components/Button";
import InputLabel from "@components/InputLabel";
import InputRadio from "@components/InputRadio";
import InputText from "@components/InputText";
import LabelDateTime from "@components/LabelDateTime";
import Loader from "@components/Loader";
import Modal from "@components/Modal";
import Switch from "@components/Switch";
import DeleteUser from "@components/modals/DeleteUser";
import useFetch from "@hooks/useFetch";
import SweetAlert from "@lib/SweetAlert";
import fieldChange from "@utils/fieldChange";
import { useEffect, useState } from "react"

const UserForm = ({ userData, isEdit = false, className = "", toggleModal, reloadUsers, refetch }) => {
    const [user, setUser] = useState({
        id: '',
        user_role_id: '',
        email: '',
        firstname: '',
        lastname: '',
        address: '',
        city: '',
        state: '',
        zip_code: '',
        company: '',
        is_active: false,
    });

    const [processing, setProcessing] = useState(false);
    const [message, setMessage] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const { data: userRoles, loading: userRolesLoading, error: userRolesError } = useFetch('/api/dashboard/userroles');

    useEffect(() => {
        if (isEdit) {
            setUser({ ...userData });
        };
    }, [])

    const onHandleChange = (e) => {
        fieldChange(e, user, setUser);
    }

    const onHandleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);

        try {
            let url = (!isEdit ? '/api/dashboard/users' : '/api/dashboard/users/' + user.id);

            const res = await fetch(url, {
                method: 'post',
                body: JSON.stringify({ ...user }),
            });

            if (!res.ok) {
                throw new Error('Something went wrong. Please try again later.');
            }

            if (isEdit) {
                SweetAlert({
                    title: "Success!",
                    text: "User has been updated.",
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
                text: "User has been added.",
                icon: "success",
                confirmButtonText: "Continue",
            }).then((result) => {
                if (result.isConfirmed) {
                    if (toggleModal) {
                        toggleModal(prev => !prev);
                    };
                    reloadUsers();
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
            <form className={className} method="POST" onSubmit={(e) => onHandleSubmit(e)}>
                {
                    message ? <Alert type={message.type} message={message.content} /> : ''
                }
                <div className="mb-4">
                    <InputLabel forInput="email" required>Email</InputLabel>
                    <InputText type="email" name="email" value={user.email} required processing={processing} handleChange={(e) => onHandleChange(e)} />
                </div>
                <div className="flex flex-col gap-x-0 sm:flex-row sm:gap-x-4 sm:mb-4">
                    <div className="w-full mb-4 sm:w-1/2 sm:mb-0">
                        <InputLabel forInput="firstname" required>Firstname</InputLabel>
                        <InputText name="firstname" value={user.firstname} required processing={processing} handleChange={(e) => onHandleChange(e)} />
                    </div>
                    <div className="w-full mb-4 sm:w-1/2 sm:mb-0">
                        <InputLabel forInput="lastname" required>Lastname</InputLabel>
                        <InputText name="lastname" value={user.lastname} required processing={processing} handleChange={(e) => onHandleChange(e)} />
                    </div>
                </div>
                <div className="mb-4">
                    <InputLabel forInput="address" required>Address</InputLabel>
                    <InputText name="address" value={user.address} required processing={processing} handleChange={(e) => onHandleChange(e)} />
                </div>
                <div className="flex flex-col gap-x-0 sm:flex-row sm:gap-x-4 sm:mb-4">
                    <div className="w-full mb-4 sm:w-[33.3%] sm:mb-0">
                        <InputLabel forInput="city" required>City</InputLabel>
                        <InputText name="city" value={user.city} required processing={processing} handleChange={(e) => onHandleChange(e)} />
                    </div>
                    <div className="w-full mb-4 sm:w-[33.3%] sm:mb-0">
                        <InputLabel forInput="state" required>State</InputLabel>
                        <InputText name="state" value={user.state} required processing={processing} handleChange={(e) => onHandleChange(e)} />
                    </div>
                    <div className="w-full mb-4 sm:w-[33.3%] sm:mb-0">
                        <InputLabel forInput="zip_code" required>Zip code</InputLabel>
                        <InputText name="zip_code" value={user.zip_code} required processing={processing} handleChange={(e) => onHandleChange(e)} />
                    </div>
                </div>
                <div className="mb-4">
                    <InputLabel forInput="company" required>Company</InputLabel>
                    <InputText name="company" value={user.company} required processing={processing} handleChange={(e) => onHandleChange(e)} />
                </div>
                <div className="mb-4">
                    <InputLabel forInput="user_role_id" className="mb-2" required>User Role</InputLabel>
                    {
                        userRolesLoading ? <Loader className="!mx-0" /> :
                            userRoles && <InputRadio name="user_role_id" value={user.user_role_id} options={
                                userRoles.map(item => {
                                    return { value: item.id, display: item.user_role }
                                })
                            } handleChange={(e) => onHandleChange(e)} />
                    }
                </div>
                <div className="mb-4">
                    <Switch name="is_active" value={user.is_active} text="Active" processing={processing} handleChange={(e) => onHandleChange(e)} />
                </div>
                {
                    isEdit &&
                    (
                        <>
                            <div className="mb-4">
                                <InputLabel>Created At</InputLabel>
                                <LabelDateTime datetime={user.created_at} />
                            </div>
                            <div className="mb-4">
                                <InputLabel>Updated At</InputLabel>
                                <LabelDateTime datetime={user.updated_at} />
                            </div>
                        </>
                    )
                }
                <div className="flex justify-end gap-x-2 mt-4">
                    {
                        toggleModal && <Button type="button" className="btn-transparent" onClick={() => toggleModal(prev => !prev)}>Cancel</Button>
                    }
                    {
                        isEdit &&
                        <Button type="button" className="btn-danger" processing={processing} onClick={() => setShowDeleteModal(prev => !prev)}>Delete</Button>
                    }
                    <Button className="btn-success" processing={processing}>{isEdit ? "Update" : "Submit"}</Button>
                </div>
            </form>
            {
                isEdit &&
                <Modal show={showDeleteModal} setShow={setShowDeleteModal} title="Delete User" content={<DeleteUser toggleModal={setShowDeleteModal} id={user.id} />} />
            }
        </>
    )
}

export default UserForm