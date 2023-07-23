import { signOut, useSession } from "next-auth/react"
import Dropdown from "./Dropdown";
import CustomImage from "./CustomImage";

const UserBox = () => {
    const { data: session } = useSession();

    const onHandleLogout = (e) => {
        signOut();
    }

    return (
        <div className="w-[38.25px] md:w-[200px] flex justify-end items-center">
            {session &&
                <Dropdown toggleContent={<UserBoxContent firstname={session?.user?.firstname} lastname={session?.user?.lastname} />} toggleButtonDefaultStyle={false} hasIcon={false}>
                    <Dropdown.Item href="/" icon="fa-home" text="Site" />
                    <Dropdown.Item href="#" icon="fa-user" text="Profile" />
                    <Dropdown.Item href="#" icon="fa-sign-out-alt" text="Logout" handleClick={onHandleLogout} />
                </Dropdown>
            }
        </div>
    )
}

const UserBoxContent = ({imgSrc = '', firstname = '', lastname = ''}) => {
    return <>
        {imgSrc ? <CustomImage src={imgSrc} /> : <span className="bg-gray-200 border-2 border-gray-300 rounded-full p-2 md:mr-2 uppercase">{firstname.substring(0, 1) + lastname.substring(0, 1)}</span>}<span className="hidden truncate md:inline">{firstname} {lastname}</span>
    </>
}

export default UserBox