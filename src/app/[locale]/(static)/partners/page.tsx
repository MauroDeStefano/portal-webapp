import React from "react";
import classNames from "classnames";
import {Metadata} from "next";
import {getTranslations} from "next-intl/server";

import PartnersForm from "@/app/[locale]/(static)/partners/formComponents/PartnersForm";
import BackgroundDecorator from "@/app/components/Decorators/BackgroundDecorator";
import {
    CheckMarkCircleIcon,
    KeyIcon,
    MoneyIcon,
    MountainIcon,
    SettingsIcon,
    ShackingHandsIcon,
    ShoutIcon,
    SoundIcon,
    TreesIcon
} from "@/app/components/Icons";
import Cta5, {Cta5Item, Cta5ItemAction, Cta5ItemActionInternal} from "@/app/sections/CTA5";
import Features6, {Features6Item} from "@/app/sections/Features6";
import Features7, {Features7Item} from "@/app/sections/Features7";
import ImageHero from "@/app/sections/ImageHero";
import {headers} from "next/headers";

type Props = {}

export default async function PartnersPage(props: Props) {
    const t = await getTranslations("Partners");
    const infoTranslator = await getTranslations("InfoBoxes");

    return (
        <>
            <ImageHero bundle={{srcDesktop: '/images/partners.jpg', srcMobile: '/images/partners.jpg'}}
                       title={t.rich(('title'), {important: (chunks) => <span className="underline">{chunks}</span>})}>
                {t('text')}
            </ImageHero>
            <BackgroundDecorator>
                <Features6 isPb0={true} title={t('features.what_we_offer.title')}>
                    <Features6Item title={t('features.what_we_offer.value_partner.title')}
                                   icon={<ShackingHandsIcon stroke="#ffffff" fill="#ffffff"/>}>
                        {t('features.what_we_offer.value_partner.text')}
                    </Features6Item>
                    <Features6Item title={t('features.what_we_offer.additional_income.title')} icon={<MoneyIcon/>}>
                        {t('features.what_we_offer.additional_income.text')}
                    </Features6Item>
                    <Features6Item title={t('features.what_we_offer.promoting_your_service.title')}
                                   icon={<ShoutIcon stroke="#ffffff" fill="#ffffff"/>}>
                        {t('features.what_we_offer.promoting_your_service.text')}
                    </Features6Item>
                    <Features6Item title={t('features.what_we_offer.flexibility.title')}
                                   icon={<SettingsIcon stroke="#ffffff" fill="#ffffff"/>}>
                        {t('features.what_we_offer.flexibility.text')}
                    </Features6Item>
                </Features6>
                <Features6 title={t('features.what_we_look_for.title')}>
                    <Features6Item title={t('features.what_we_look_for.nature.title')}
                                   icon={<TreesIcon fill="#7CA365"/>}>
                        {t('features.what_we_look_for.nature.text')}
                    </Features6Item>
                    <Features6Item title={t('features.what_we_look_for.landscape.title')}
                                   icon={<MountainIcon fill="#7CA365"/>}>
                        {t('features.what_we_look_for.landscape.text')}
                    </Features6Item>
                    <Features6Item title={t('features.what_we_look_for.quiteness.title')}
                                   icon={<SoundIcon fill="#7CA365" stroke="#7CA365"/>}>
                        {t('features.what_we_look_for.quiteness.text')}
                    </Features6Item>
                    <Features6Item title={t('features.what_we_look_for.accessibility.title')}
                                   icon={<KeyIcon fill="#7CA365"/>}>
                        {t('features.what_we_look_for.accessibility.text')}
                    </Features6Item>
                </Features6>
            </BackgroundDecorator>
            <Features7 title={t('how_it_works.title')}>
                <Features7Item icon={<CheckMarkCircleIcon width="50" height="50"/>}>
                    {t('how_it_works.steps.step1.text')}
                </Features7Item>
                <Features7Item icon={<CheckMarkCircleIcon width="50" height="50"/>}>
                    {t('how_it_works.steps.step2.text')}
                </Features7Item>
                <Features7Item icon={<CheckMarkCircleIcon width="50" height="50"/>}>
                    {t('how_it_works.steps.step3.text')}
                </Features7Item>
            </Features7>
            <div className="form-1">
                <div className="form-1__container fl-container">
                    <div className="form-1__wrapper">
                        <PartnersForm/>
                    </div>
                </div>
            </div>
            <Cta5 classes={classNames({'pt-0': true})}>
                <Cta5Item title={infoTranslator('ourOffice.title')}>
                    <Cta5ItemAction href='https://maps.google.com' target="_blank">
                        {infoTranslator('ourOffice.actions.cta1.label')}
                    </Cta5ItemAction>
                </Cta5Item>
                <Cta5Item title={infoTranslator('info.title')} text={infoTranslator('info.text')}>
                    <Cta5ItemActionInternal href='/faq'>
                        {infoTranslator('info.actions.cta1.label')}
                    </Cta5ItemActionInternal>
                    <Cta5ItemActionInternal href='/'>
                        {infoTranslator('info.actions.cta2.label')}
                    </Cta5ItemActionInternal>
                </Cta5Item>
            </Cta5>

        </>
    );
};


export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('Partners');
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
