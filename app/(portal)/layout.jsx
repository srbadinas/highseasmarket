'use client';

import Button from "@components/Button";
import Sidebar from "@components/Sidebar";
import Topbar from "@components/Topbar";
import { useState } from "react";

const PortalLayout = ({ children }) => {
    const [showSidebar, setShowSideBar] = useState(false);

    const onHandleSidebarToggle = (e) => {
        setShowSideBar(prev => !prev);
    }

    return (
        <div className="flex">
            <Sidebar show={showSidebar} />
            <div className={"w-full min-h-[100vh] md:w-[calc(100%-100px)] md:ml-[100px] bg-zinc-100 transition-all delay-0 duration-500" + (showSidebar
                ? " !w-[calc(100%-100px)] !ml-[100px]"
                : "")}>
                <Topbar showSidebar={showSidebar} handleSidebarToggle={onHandleSidebarToggle} />
                <main className="px-4 py-3">
                    {children}
                </main>
            </div>
        </div>
    )
}

export default PortalLayout