import React from "react";
import {getTranslations} from 'next-intl/server';

import {Header3} from "@/app/components/SubHeader";
import AnchorLinks1 from "@/app/sections/AnchorLinks1";
import {getFaqPageContents} from "@/app/utils/xhr/api";
import {Metadata} from "next";
import {headers} from "next/headers";

type Props = {
    params: {
        locale: string
    }
};


export default async function FaqPage(props: Props) {
    const content = await getFaqPageContents(props.params.locale);
    const t = await getTranslations('Faq');
    const faqTitle: React.ReactNode = t.rich('subHeader.title', {
        important: (chunks) => <span className="underline">{chunks}</span>
    });
    return (
        <>
            <Header3>{faqTitle}</Header3>

            <AnchorLinks1 content={content}/>
        </>
    )
}

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('Faq');
    const url = headers().get('x-url');

    return {
        title: t('_meta.title'),
        description: t('_meta.description'),
        openGraph: {
            title: t('_meta.title'),
            // images: ['/some-specific-page-image.jpg', ...previousImages],
        },
        alternates: {
            canonical: url
        },
    }
}