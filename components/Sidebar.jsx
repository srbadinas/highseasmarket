import { usePathname } from "next/navigation";
import ApplicationLogo from "./ApplicationLogo";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Loader from "./Loader";

const Sidebar = ({ show }) => {
    const pathname = usePathname();
    const { data: session } = useSession();
    return (
        <nav className={"ml-[-100px] w-[100px] fixed flex-col h-screen bg-sidebar shadow-md z-[9997] transition-all delay-0 duration-500 ease-in-out md:ml-[0px] " + (show ? " !ml-[0px]" : "")}>
            <div className="w-full h-[60px] flex flex-col items-center justify-center border-b border-white/[15%] xl:px-5">
                <ApplicationLogo className="!text-white !text-xs" />
            </div>
            <div className="py-4">
                <ul>
                    {
                        session && <SidebarMenu pathname={pathname} userRoleId={session?.user.user_role_id} />
                    }
                </ul>
            </div>
        </nav>
    )
}

const SidebarLink = ({ href = "#", active = false, icon, text }) => {
    return (
        <li className="px-2 xl:px-3 mb-1">
            <Link
                href={href}
                className={"flex flex-col items-center w-full rounded py-2 transition text-gray-400 hover:bg-white/[30%] hover:text-gray-100"
                    + (active ? " !bg-white/[30%] !text-gray-100" : "")}
            >
                <i className={
                    "fas " +
                    icon +
                    " w-[40px] text-center text-2xl"
                } ></i>
                <span className="text-xs text-center">
                    {text}
                </span>
            </Link>
        </li>
    );
};

const SidebarMenu = ({ pathname, userRoleId }) => {
    switch (userRoleId) {
        case 1:
            return <>
                <SidebarLink
                    href='/dashboard'
                    active={pathname == '/dashboard' ? true : false}
                    icon="fa-tachometer-alt"
                    text="Dashboard"
                />
                <AdminMenu pathname={pathname} />
            </>
        case 2:
            return <>
                <SidebarLink
                    href='/dashboard'
                    active={pathname == '/dashboard' ? true : false}
                    icon="fa-tachometer-alt"
                    text="Dashboard"
                />
                <SellerMenu pathname={pathname} />
            </>
        case 3:
            return <>
                <SidebarLink
                    href='/dashboard'
                    active={pathname == '/dashboard' ? true : false}
                    icon="fa-tachometer-alt"
                    text="Dashboard"
                />
                <BuyerMenu pathname={pathname} />
            </>
    }
}

const AdminMenu = ({ pathname }) => {
    return <>
        <SidebarLink
            href='/dashboard/products'
            active={pathname.includes('/dashboard/products') ? true : false}
            icon="fa-box"
            text="Products"
        />
        <SidebarLink
            href='/dashboard/listingrequests'
            active={pathname.includes('/dashboard/listingrequests') ? true : false}
            icon="fa-file-alt"
            text="Listing Requests"
        />
        <SidebarLink
            href='/dashboard/productrequests'
            active={pathname.includes('/dashboard/productrequests') ? true : false}
            icon="fa-file-contract"
            text="Product Requests"
        />
        <SidebarLink
            href='/dashboard/users'
            active={pathname.includes('/dashboard/users') ? true : false}
            icon="fa-users"
            text="Users"
        />
        <SidebarLink
            href="/dashboard/config"
            active={pathname.includes('/dashboard/config') ? true : false}
            icon="fa-cogs"
            text="Config"
        />
    </>
}

const SellerMenu = ({ pathname }) => {
    return <>
        <SidebarLink
            href='/dashboard/products'
            active={pathname.includes('/dashboard/products') ? true : false}
            icon="fa-box"
            text="Products"
        />
        <SidebarLink
            href='/dashboard/listingrequests'
            active={pathname.includes('/dashboard/listingrequests') ? true : false}
            icon="fa-file-alt"
            text="Listing Requests"
        />
        <SidebarLink
            href='/dashboard/productrequests'
            active={pathname.includes('/dashboard/productrequests') ? true : false}
            icon="fa-file-contract"
            text="Product Requests"
        />
    </>
}

const BuyerMenu = ({ pathname }) => {
    return <>
        <SidebarLink
            href='/dashboard/listingrequests'
            active={pathname.includes('/dashboard/listingrequests') ? true : false}
            icon="fa-file-alt"
            text="Listing Requests"
        />
        <SidebarLink
            href='/dashboard/productrequests'
            active={pathname.includes('/dashboard/productrequests') ? true : false}
            icon="fa-file-contract"
            text="Product Requests"
        />
    </>
}

export default Sidebar