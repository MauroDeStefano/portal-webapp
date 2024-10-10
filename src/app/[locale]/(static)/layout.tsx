import React from "react";

import {ClientOnlyContextProvider} from "@/app/contexts/ClientOnlyContext";
import Footer from "@/app/layout/Footer";
import Header, {HeaderDummy} from "@/app/layout/Header";
import MobileHeader from "@/app/layout/MobileHeader";

interface Props {
    children: React.ReactNode;
    params: { locale: string };
}

export default function PrimaryLayout({children, params: {locale}}: Props) {
    return (
        <>
            <ClientOnlyContextProvider fallback={<>
                <HeaderDummy/>
            </>}>
                <Header/>
                <MobileHeader/>
            </ClientOnlyContextProvider>
            {children}
            <Footer/>
        </>
    );
};