import { signOut, useSession } from "next-auth/react"
import { Dropdown, DropdownItem } from "./Dropdown";
import CustomImage from "./CustomImage";

const UserBox = () => {
    const { data: session } = useSession();
    if (!session) return;

    const onHandleLogout = () => {
        signOut();
    }

    return (
        <div className="w-[38.25px] md:w-[200px] flex justify-end items-center">
            {session &&
                <Dropdown toggleContent={<UserBoxContent name={session.user.name} />} toggleButtonDefaultStyle={false} hasIcon={false}>
                    <DropdownItem href="/" icon="fa-home" text="Site" />
                    <DropdownItem href="#" icon="fa-user" text="Profile" />
                    <DropdownItem href="#" icon="fa-sign-out-alt" text="Logout" handleClick={onHandleLogout} />
                </Dropdown>
            }
        </div>
    )
}

interface UserBoxContentProps {
    imgSrc?: string,
    name: string,
}

const UserBoxContent = ({ imgSrc = '', name }: UserBoxContentProps) => {

    const nameArray = name.split(' ');
    const initials = nameArray[0].substring(0, 1) + (nameArray[nameArray.length - 1] ? nameArray[nameArray.length - 1].substring(0, 1) : '');

    return <>
        {imgSrc ? <CustomImage src={imgSrc} /> : <span className="bg-gray-200 border-2 border-gray-300 rounded-full p-2 md:mr-2 uppercase">{initials}</span>}<span className="hidden truncate md:inline">{name}</span>
    </>
}

export default UserBox