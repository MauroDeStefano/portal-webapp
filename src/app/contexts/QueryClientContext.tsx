'use client';

import {createContext, ReactNode} from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

type QueryClientContext = {}
const QueryClientContext = createContext<QueryClientContext | null>(null);

export const QueryClientContextProvider = ({
                                               children
                                           }: {
    children: ReactNode
}) => {
    const queryClient = new QueryClient()
    console.debug('⌛Fri.land Query Init');

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
};