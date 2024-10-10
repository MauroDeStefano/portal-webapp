import React from "react";
import {ConsentAwareWrapper, IubendaProvider} from "@mep-agency/next-iubenda";
import {cookies} from "next/headers";
import {getMessages} from "next-intl/server";

import AosInit from "@/app/components/AosInit";
import FacebookPixel from "@/app/components/Tracking/FacebookPixel";
import GoogleAnalyticsContainer from "@/app/components/Tracking/GoogleAnalyticsContainer";
import {iubendaBannerConfig} from "@/app/config/iubenda";
import {FrilandContextProvider} from "@/app/contexts/FrilandContext";
import {FrilandIntlContextProvider} from "@/app/contexts/FrilandIntlContext";
import {MobileNavHamburger} from "@/app/layout/header/MobileNavHamburger";
import HtmlHead from "@/app/layout/HtmlHead";
import {getAppliedGiftCard} from "@/app/serverActions/apply-gift-card";
import {getDateRange, getDateRangeWithGiftCard} from "@/app/utils/xhr/api";
import {getRegions} from "@/app/utils/xhr/api-calls/getRegions";
import {SESSION_COOKIE_NAME} from "@/config";
import Hotjar from '../components/Hotjar';
import 'normalize.css'
import '@/assets/styles/styles.scss'
import '@/assets/styles/tailwind.css'
import '@/assets/styles/react-datepicker.css'

export {metadata, viewport} from "@/app/config/global-meta";

interface Props {
    children: React.ReactNode;
    params: { locale: string };
}


export default async function PrimaryLayout({children, params: {locale}}: Props) {
    const messages = await getMessages();
    const userSession = cookies().get(SESSION_COOKIE_NAME)?.value;
    const dateRange = await getDateRange();

    const appliedGiftCard = await getAppliedGiftCard();

    const dateRangeGifts = appliedGiftCard?.id ? await getDateRangeWithGiftCard(dateRange.end, appliedGiftCard.id) : [];

    return (
        <html lang={locale}>
        <HtmlHead/>
        <body>
        <FrilandIntlContextProvider
            locale={locale}
            messages={messages}
        >
            <FrilandContextProvider
                appliedGiftCard={appliedGiftCard}
                dateRange={dateRange}
                dateRangeGifts={dateRangeGifts}
                regions={await getRegions()}
                userSession={userSession}
            >
                <IubendaProvider bannerConfig={iubendaBannerConfig}>
                    {children}
                    <MobileNavHamburger/>
                    <ConsentAwareWrapper customConsentNotGrantedNodes='' requiredGdprPurposes={['measurement']}>
                        <GoogleAnalyticsContainer/>
                        <FacebookPixel/>
                    </ConsentAwareWrapper>
                </IubendaProvider>
            </FrilandContextProvider>
        </FrilandIntlContextProvider>
        <AosInit/>
        <Hotjar />
        </body>
        </html>
    )
}
