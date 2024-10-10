import React from "react";

import {ClientOnlyContextProvider} from "@/app/contexts/ClientOnlyContext";
import Footer from "@/app/layout/Footer";
import Header from "@/app/layout/Header";
import MobileHeader from "@/app/layout/MobileHeader";

interface Props {
    children: React.ReactNode;
    params: { locale: string };
}

export default function PrimaryLayout({children, params: {locale}}: Props) {
    return (
        <>
            <ClientOnlyContextProvider>
                <Header/>
                <MobileHeader/>
            </ClientOnlyContextProvider>
            {children}
            <Footer/>
        </>
    );
};