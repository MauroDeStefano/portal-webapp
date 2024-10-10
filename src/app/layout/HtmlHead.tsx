import React from "react";
import {getLocale} from "next-intl/server";

import {ZenDeskScriptEnqueue} from "@/app/layout/header/ZenDesk";

type Props = {
    children?: React.ReactNode
};
export default async function HtmlHead({children = null}: Props) {
    const locale = await getLocale()

    return (
        <head>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='anonymous'/>
            <link
                href="https://fonts.googleapis.com/css2?family=Cormorant&family=Overpass:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
                rel="stylesheet"/>

            <link rel="icon" href="/favicon.ico" sizes="any"/>
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>

            <ZenDeskScriptEnqueue locale={locale}/>

            {children}
        </head>
    );
};