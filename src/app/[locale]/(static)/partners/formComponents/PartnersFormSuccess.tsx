import React from "react";
import {autop} from "@wordpress/autop";
import {useTranslations} from "next-intl";

import {CheckMarkCircleIcon} from "@/app/components/Icons";

interface PartnersFormSuccessProps {
}

export default function PartnersFormSuccess(props: PartnersFormSuccessProps) {
    const t = useTranslations('Contact');

    return (
        <>
            <div className="form-1__form-sent">
                <div className="form-response-1">
                    <div className="form-response-1__icon">
                        <CheckMarkCircleIcon/>
                    </div>

                    <h4 className="form-response-1__title display--54">
                        {t('form_success.title')}
                    </h4>

                    <div
                        className="form-response-1__text display--24 mcb-0"
                        dangerouslySetInnerHTML={{__html: autop(t('form_success.text'))}}/>
                </div>
            </div>
        </>
    );
};