import React from "react";
import {getTranslations} from "next-intl/server";

import GiftCards from "@/app/[locale]/(user-profile)/account/my-gift-cards/components/GiftCards";
import PersonalAreaFrame from "@/app/[locale]/(user-profile)/components/PersonalAreaFrame";


export default async function MyGiftCardsPage({params: {locale}}: {
    params: { locale: string };
}) {
    const t = await getTranslations('MyGiftCards')

    return (
        <PersonalAreaFrame title={t('page_title')}>
            <GiftCards/>
        </PersonalAreaFrame>
    )
}