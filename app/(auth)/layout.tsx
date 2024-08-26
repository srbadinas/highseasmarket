
import ApplicationLogo from "@/components/ApplicationLogo"
import { PropsWithChildren } from "react"

interface AuthLayoutProps extends PropsWithChildren { }

const AuthLayout = ({ children }: AuthLayoutProps) => {
    return (
        <div className="fixed w-full h-full bg-cover bg-no-repeat bg-center overflow-y-auto" style={{ backgroundImage: 'url("/assets/images/bg-auth.jpg")' }}>
            <div className="bg-white/[70%] w-full min-h-screen flex flex-col justify-center items-center py-8">
                <div className="text-center mb-8">
                    <ApplicationLogo className="sm:text-5xl" />
                </div>
                {children}
            </div>
        </div>
    )
}

export default AuthLayout