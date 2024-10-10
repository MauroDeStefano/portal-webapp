'use client';
import React from "react";
import {autop} from "@wordpress/autop";
import {useTranslations} from "next-intl";

import NewsletterForm from "@/app/components/NewsletterForm";

type TFooterNewsletterBoxProps = {}

export default function FooterNewsletterBox(props: TFooterNewsletterBoxProps) {
    const t = useTranslations('Footer');

    return (
        <>
            <img className="footer__newsletter-icon" src="/icons/mail-open.svg"/>

            <h4 className="footer__newsletter-title text--13">
                {t('newsletter.title')}
            </h4>

            <div
                className="footer__newsletter-text text--12 mcb-0"
                dangerouslySetInnerHTML={{__html: autop(t('newsletter.text'))}}/>

            <NewsletterForm/>

            <div
                className="footer__newsletter-disclaimer text--12 mcb-0">
                {t.rich('privacy_text')}
            </div>
        </>
    );
}