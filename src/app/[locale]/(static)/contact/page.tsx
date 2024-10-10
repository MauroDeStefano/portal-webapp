import React from "react";
import classNames from "classnames";
import {Metadata} from "next";
import {headers} from "next/headers";
import {getTranslations} from "next-intl/server";

import {ContactForm} from "@/app/[locale]/(static)/contact/formComponents/ContactForm";
import {Header4} from "@/app/components/SubHeader";
import Cta5, {Cta5Item, Cta5ItemAction, Cta5ItemActionInternal} from "@/app/sections/CTA5";

interface Props {
}

export default async function Index(props: Props) {
    const t = await getTranslations('Contact');
    const infoTranslator = await getTranslations('InfoBoxes');

    return (
        <>
            <Header4>{t('title')}</Header4>

            <div className="contact-form max-lg:mt-32">
                <div className="contact-form__container fl-container">
                    <div className="contact-form__wrapper">
                        <ContactForm/>
                    </div>
                </div>
            </div>

            <Cta5 classes={classNames({'pt-0': true})}>
                <Cta5Item title={infoTranslator('ourOffice.title')}>
                    <Cta5ItemAction href='https://maps.app.goo.gl/yC9LaMTDD49Pe1NbA' target="_blank">
                        {infoTranslator('ourOffice.actions.cta1.label')}
                    </Cta5ItemAction>
                </Cta5Item>
                <Cta5Item title={infoTranslator('info.title')} text={infoTranslator('info.text')}>
                    <Cta5ItemActionInternal href='/faq'>
                        {infoTranslator('info.actions.cta1.label')}
                    </Cta5ItemActionInternal>
                    <Cta5ItemActionInternal href='/contact'>
                        {infoTranslator('info.actions.cta2.label')}
                    </Cta5ItemActionInternal>
                </Cta5Item>
            </Cta5>
        </>
    );
};


export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('Contact');
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
