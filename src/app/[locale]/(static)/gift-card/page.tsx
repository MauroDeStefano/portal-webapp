import React from "react";
import {Metadata} from "next";
import {getTranslations} from "next-intl/server";

import Cart from "@/app/[locale]/(static)/gift-card/components/Cart";
import GiftCard, {GiftCardsWrapper} from "@/app/[locale]/(static)/gift-card/components/GiftCard";
import {Header3} from "@/app/components/SubHeader";
import {ClientOnlyContextProvider} from "@/app/contexts/ClientOnlyContext";
import Faq from "@/app/sections/Faq";
import SectionWithCarousel from "@/app/sections/SectionWithCarousel";
import {getGiftCards} from "@/app/utils/xhr/api";
import {getBestLocations} from "@/app/utils/xhr/api-calls/getBestLocations";
import {headers} from "next/headers";

const FAQ_BLOCK_ID = 10002;

interface Props {
    params: {
        locale: string
    }
}

export default async function GiftCardPage({params: {locale}}: Props) {
    const [
        t,
        content,
        bestLocations
    ] = await Promise.all([
        getTranslations('GiftCard'),
        getGiftCards(locale),
        getBestLocations(locale)
    ]);

    const pageTitle: React.ReactNode = t.rich('title', {
        important: (chunks) => <span className="underline">{chunks}</span>
    });

    return (
        <>
            <Header3>{pageTitle}</Header3>

            <GiftCardsWrapper>
                {content.gifts.map((gift) => <GiftCard
                    key={gift.id}
                    card={gift}/>
                )}
            </GiftCardsWrapper>

            <ClientOnlyContextProvider>
                <Cart/>
            </ClientOnlyContextProvider>

            <SectionWithCarousel slides={bestLocations.item}/>

            <Faq id={FAQ_BLOCK_ID}/>
        </>
    );
};

export async function generateMetadata(props: Props): Promise<Metadata> {

    const items = await getGiftCards(props.params.locale);
    const url = headers().get('x-url');

    return {
        title: items._meta.title,
        description: items._meta.description,
        openGraph: {
            title: items._meta.title,
            description: items._meta.description,
            // images: ['/some-specific-page-image.jpg', ...previousImages],
        },
        alternates: {
            canonical: url
        },
    }
}
