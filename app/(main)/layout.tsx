import Navbar from "@/components/Navbar"
import { PropsWithChildren, useEffect } from "react"

const MainLayout = ({ children }: PropsWithChildren) => {    

    return (
        <>
            <Navbar />
            <main>
                {children}
            </main>
        </>
    )
}

export default MainLayout