import { usePathname } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { FunctionComponent, ReactNode } from "react";
import { Article, Gauge, Gear, Package, Storefront, Table, User } from "@phosphor-icons/react";
import { UserType } from "@/types/UserTypes";

interface SidebarLinkProps {
    href?: string,
    active: boolean,
    icon: ReactNode,
    text: string
}

const SidebarLink = ({ href = "#", active = false, icon, text }: SidebarLinkProps) => {
    return (
        <li className="px-2 xl:px-3 mb-1">
            <Link
                href={href}
                className={"flex flex-col items-center w-full rounded py-2 transition text-gray-400 hover:bg-white/[30%] hover:text-gray-100"
                    + (active ? " !bg-white/[30%] !text-gray-100" : "")}
            >
                {icon}
                <span className="text-xs text-center">
                    {text}
                </span>
            </Link>
        </li>
    );
};

interface SidebarProps {
    show: boolean
}

const SIDEBAR_USER_TYPES_MAPPING: Record<UserType, FunctionComponent<{ pathname: string }>> = {
    Admin: ({ pathname }) => (
        <>
            <SidebarLink
                href='/dashboard/products'
                active={pathname.includes('/dashboard/products') ? true : false}
                icon={<Package size={24} />}
                text="Products"
            />
            {/* <SidebarLink
                href='/dashboard/listingrequests'
                active={pathname.includes('/dashboard/listingrequests') ? true : false}
                icon={<Table size={24} />}
                text="Listing Requests"
            />
            <SidebarLink
                href='/dashboard/productrequests'
                active={pathname.includes('/dashboard/productrequests') ? true : false}
                icon={<Article size={24} />}
                text="Product Requests"
            />
            <SidebarLink
                href='/dashboard/users'
                active={pathname.includes('/dashboard/users') ? true : false}
                icon={<User size={24} />}
                text="Users"
            />
            <SidebarLink
                href="/dashboard/config"
                active={pathname.includes('/dashboard/config') ? true : false}
                icon={<Gear size={24} />}
                text="Config"
            /> */}
        </>
    ),
    Seller: ({ pathname }) => (
        <>
            <SidebarLink
                href='/dashboard/products'
                active={pathname.includes('/dashboard/products') ? true : false}
                icon={<Package size={24} />}
                text="Products"
            />
            {/* <SidebarLink
                href='/dashboard/listingrequests'
                active={pathname.includes('/dashboard/listingrequests') ? true : false}
                icon={<Table size={24} />}
                text="Listing Requests"
            />
            <SidebarLink
                href='/dashboard/productrequests'
                active={pathname.includes('/dashboard/productrequests') ? true : false}
                icon={<Article size={24} />}
                text="Product Requests"
            /> */}
        </>
    ),
    Buyer: ({ pathname }) => (
        <>
            {/* <SidebarLink
                href='/dashboard/listingrequests'
                active={pathname.includes('/dashboard/listingrequests') ? true : false}
                icon={<Table size={24} />}
                text="Listing Requests"
            />
            <SidebarLink
                href='/dashboard/productrequests'
                active={pathname.includes('/dashboard/productrequests') ? true : false}
                icon={<Article size={24} />}
                text="Product Requests"
            /> */}
        </>
    )
}

const Logo = () => {
    return <Link href='/dashboard' className="text-white"><Storefront size={32} /></Link>
}

const Sidebar = ({ show }: SidebarProps) => {
    const pathname = usePathname();
    const { data: session } = useSession();
    if (!session) return;

    const SidebarMenu = SIDEBAR_USER_TYPES_MAPPING[session.user.role as UserType];

    return (
        <nav className={"ml-[-100px] w-[100px] fixed flex-col h-screen bg-sidebar shadow-md z-[9997] transition-all delay-0 duration-500 ease-in-out md:ml-[0px] " + (show ? " !ml-[0px]" : "")}>
            <div className="w-full h-[60px] flex flex-col items-center justify-center border-b border-white/[15%] xl:px-5">
                <Logo />
            </div>
            <div className="py-4">
                <ul>
                    <SidebarLink
                        href='/dashboard'
                        active={pathname == '/dashboard' ? true : false}
                        icon={<Gauge size={24} />}
                        text="Dashboard"
                    />
                    <SidebarMenu pathname={pathname} />
                </ul>
            </div>
        </nav>
    )
}

export default Sidebar