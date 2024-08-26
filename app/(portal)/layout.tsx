'use client';

import Button from "@/components/Button";
import Sidebar from "@/components/Sidebar";
import UserBox from "@/components/UserBox";
import { useDashboardStore } from "@/stores/dashboardStore";
import { Dispatch, PropsWithChildren, SetStateAction, useEffect, useState } from "react";

interface PortalLayoutProps extends PropsWithChildren {

}

const PortalLayout = ({ children }: PortalLayoutProps) => {
    const [showSidebar, setShowSideBar] = useState(false);
    const initStore = useDashboardStore((state) => state.initStore);

    useEffect(() => {
        initStore();
    }, [])

    return (
        <div className="flex">
            <Sidebar show={showSidebar} />
            <div className={"w-full min-h-[100vh] md:w-[calc(100%-100px)] md:ml-[100px] bg-zinc-100 transition-all delay-0 duration-500" + (showSidebar
                ? " !w-[calc(100%-100px)] !ml-[100px]"
                : "")}>
                <Topbar showSidebar={showSidebar} handleSidebarToggle={setShowSideBar} />
                <main className="px-4 py-3">
                    {children}
                </main>
            </div>
        </div>
    )
}

interface TopbarProps {
    showSidebar: boolean,
    handleSidebarToggle: Dispatch<SetStateAction<boolean>>;
}

const Topbar = ({ showSidebar, handleSidebarToggle }: TopbarProps) => {
    return (
        <div className="sticky flex w-full h-[60px] bg-white drop-shadow justify-between px-4 z-[9997]">
            <div className="w-full flex items-center">
                <Button
                    type="button"
                    className="!bg-transparent !text-gray-700 !border-0 !shadow-none md:hidden"
                    onClick={() => handleSidebarToggle(prev => !prev)}
                >
                    <i
                        className={
                            "fas fa-bars transition delay-0 duration-500 ease-in-out " +
                            (showSidebar ? "rotate-90" : "")
                        }
                    ></i>
                </Button>
                <div className="w-[calc(100%-33.5px)] md:w-full flex justify-end items-center">
                    {/* <NotificationWidget /> */}
                </div>
            </div>
            <UserBox />
        </div>
    )
}

export default PortalLayout