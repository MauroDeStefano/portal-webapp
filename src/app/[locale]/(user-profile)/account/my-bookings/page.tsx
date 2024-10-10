import React from "react";
import {getTranslations} from "next-intl/server";

import HelpBox from "@/app/[locale]/(user-profile)/account/my-bookings/components/HelpBox";
import OrderHistory from "@/app/[locale]/(user-profile)/account/my-bookings/components/OrderHistory";
import PersonalAreaFrame from "@/app/[locale]/(user-profile)/components/PersonalAreaFrame";

export default async function MyBookingsPage({params: {locale}}: {
    params: { locale: string };
}) {
    const t = await getTranslations('Account')


    return (
        <PersonalAreaFrame title={t('my_bookings')}>
            <OrderHistory/>
            <HelpBox/>
        </PersonalAreaFrame>
    )
}