import React from "react";
import {getTranslations} from "next-intl/server";

import {Header3} from "@/app/components/SubHeader";

export default async function NotFoundPage({params: {locale}}: {
    params: { locale: string };
}) {
    const t = await getTranslations('Errors');
    return (
        <>
            <Header3>{t('pageNotFound.title')}<br/>{t('pageNotFound.content')}</Header3>
        </>
    )
}
