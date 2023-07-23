import Button from "./Button"
import UserBox from "./UserBox"

const Topbar = ({ showSidebar, handleSidebarToggle }) => {
    return (
        <div className="sticky flex w-full h-[60px] bg-white drop-shadow justify-between px-4 z-[9997]">
            <div className="w-full flex items-center">
                <Button
                    type="button"
                    className="!bg-transparent !text-gray-700 !border-0 !shadow-none md:hidden"
                    onClick={(e) => handleSidebarToggle(e)}
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

export default Topbar