// @ts-nocheck
import React from "react";
import {autop} from "@wordpress/autop";
import {Metadata} from "next";
import {getTranslations} from "next-intl/server";

import Cta1, {CtaBox} from "@/app/sections/CTA1";
import Cta2 from "@/app/sections/CTA2";
import Cta3 from "@/app/sections/CTA3";
import Cta4, {Cta4BackgroundUnit} from "@/app/sections/CTA4";
import Features1, {FeaturesItem} from "@/app/sections/Features1";
import ImageHero from "@/app/sections/ImageHero";
import Testimonials from "@/app/sections/Testimonials";
import {getHome, getNewDestinations, getReviews} from "@/app/utils/xhr/api";
import {HomePageContent, TestimonialContent} from "@/types";
import {headers} from "next/headers";


type CtaBox = {
    id?: number,
    name?: string,
    imgDesktop?: string,
    imgMobile?: string
}

export default async function IndexPage({params: {locale}}: {
    params: { locale: string };
}) {

    const homeTranslator = await getTranslations('Home');
    const newDestinationsTranslator = await getTranslations('NewDestinations');
    const advTranslator = await getTranslations('AdvBoxes');

    const content: HomePageContent = await getHome(locale) as HomePageContent;
    const reviews: TestimonialContent = await getReviews(locale, 0);
    const cta1Content = await getNewDestinations();

    return (

        <>
            <ImageHero bundle={{srcDesktop: content.header.imgDesktop, srcMobile: content.header.imgMobile}}>
                <div dangerouslySetInnerHTML={{__html: autop(content.header.title)}}></div>
            </ImageHero>
            <Features1 title={content.experienceBox.title} text={content.experienceBox.text} cta_href='/destinations'
                       cta_label={homeTranslator('features.cta.label')}>
                <>
                    {content.experienceBox.tags.map((item, index: number) => (
                        <FeaturesItem key={index} img={item.img}>{item.name}</FeaturesItem>

                    ))}
                </>
            </Features1>
            <Cta1 subtitle={newDestinationsTranslator('subtitle')} title={newDestinationsTranslator.rich('title', {
                important: (chunks) => <span className="underline">{chunks}</span>
            })}>
                <>
                    {cta1Content.map((item: CtaBox, index: number) => (
                        <CtaBox key={index} title={item.name} subtitle={newDestinationsTranslator('cta_label')}
                                img={item?.imgDesktop || '/images/placeholder.jpg'}
                                href={'/destination/[slug]'} itemId={item.id}></CtaBox>
                    ))}
                </>
            </Cta1>
            <Cta2 cta_href='/destinations' imgMobile={content.missionBox.imgMobile}
                  imgDesktop={content.missionBox.imgDesktop} cta_label={homeTranslator('features.cta.label')}
                  title={content.missionBox.title}>
                {content.missionBox.text}
            </Cta2>
            <Cta3 img='/images/gift-card.webp' cta_href='/gift-card' cta_label={homeTranslator('giftCardBox.cta.label')}
                  title={homeTranslator.rich('giftCardBox.title', {
                      important: (chunks) => <span className="underline">{chunks}</span>
                  })}>
                {homeTranslator('giftCardBox.text')}
            </Cta3>
            <Testimonials title={reviews.title} subtitle={reviews.subtitle} slides={reviews.items}/>
            <Cta4>
                <Cta4BackgroundUnit
                    link='/companies-services'
                    image="/images/non-solo-smartworking.jpg"
                    buttonLabel={advTranslator('smartworking.label')}
                    text={advTranslator('smartworking.title')}
                />
                <Cta4BackgroundUnit
                    link='/partners'
                    image="/images/diventa-nostro-partner.jpg"
                    buttonLabel={advTranslator('partners.label')}
                    text={advTranslator('partners.title')}
                />
            </Cta4>
        </>
    )
}

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('Home');
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