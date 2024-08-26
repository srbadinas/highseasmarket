import Link from "next/link"
import { ReactNode } from "react"

interface DashboardCountProps {
    icon: ReactNode,
    color?: string,
    count: number,
    text: string,
    href?: string,
}

const DashboardCount = ({
    icon,
    color = "bg-green-600",
    count,
    text,
    href = "#",
}: DashboardCountProps) => {
    return (
        <div className="w-full h-[120px] flex items-center rounded bg-white shadow border border-gray-300 px-4">
            <Link href={href} className="w-full h-full flex items-center hover:!brightness-100">
                <div
                    className={
                        "w-[80px] h-[80px] rounded-full flex justify-center items-center text-white text-3xl mr-4 " +
                        color
                    }
                >
                    {icon}
                </div>
                <div className="w-[calc(100%-80px)] flex flex-col justify-center">
                    <h1 className="text-xl font-bold">{count}</h1>
                    <h1 className="text-base sm:text-lg text-gray-500">{text}</h1>
                </div>
            </Link>
        </div>
    )
}

export default DashboardCount