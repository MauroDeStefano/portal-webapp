'use client';

import React, {createContext, ReactNode, useContext, useEffect, useState} from "react";

const ClientOnlyContext = createContext({});

export const usePreloaderContext = () => {
    const ctx = useContext(ClientOnlyContext);

    if (!ctx) {
        throw new Error('usePreloaderContext must be used within a PreloaderContextProvider');
    }

    return ctx;
}

export const ClientOnlyContextProvider = ({
                                              children,
                                              fallback = null
                                          }: {
    children: ReactNode,
    fallback?: ReactNode
}) => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true)
    }, []);

    return (
        <ClientOnlyContext.Provider value={{}}>
            {!isClient ? fallback : children}
        </ClientOnlyContext.Provider>
    );
};