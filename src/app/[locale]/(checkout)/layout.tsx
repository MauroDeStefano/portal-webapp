import React from "react";

import 'normalize.css'
import '@/assets/styles/styles.scss'
import '@/assets/styles/tailwind.css'

export {metadata, viewport} from "@/app/config/global-meta";

interface Props {
    children: React.ReactNode;
    params: { locale: string };
}

export default function Layout({children, params: {locale}}: Props) {
    return (
        <>
            {children}
        </>
    )
}
