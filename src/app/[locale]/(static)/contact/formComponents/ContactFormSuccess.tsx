import React from "react";
import {autop} from "@wordpress/autop";
import {useTranslations} from "next-intl";

import {CheckMarkCircleIcon} from "@/app/components/Icons";

interface ContactFormSuccessProps {
}

export default function ContactFormSuccess(props: ContactFormSuccessProps) {
    const t = useTranslations('Contact');

    return (
        <>
            <div className="contact-form__wrapper">
                <div className="contact-form__response">
                    <div className="form-response-1">
                        <div className="form-response-1__icon">
                            <CheckMarkCircleIcon/>
                        </div>

                        <h2 className='form-response-1__title display--54'>{t('form_success.title')}</h2>

                        <div
                            className="form-response-1__text display--24 mcb-0"
                            dangerouslySetInnerHTML={{__html: autop(t('form_success.text'))}}/>
                    </div>
                </div>
            </div>
        </>
    );
};