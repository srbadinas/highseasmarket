'use client';

import { SessionProvider } from "next-auth/react";
import { PropsWithChildren } from "react";

interface ProviderProps extends PropsWithChildren {
}

const Provider = ({ children }: ProviderProps) => {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}

export default Provider