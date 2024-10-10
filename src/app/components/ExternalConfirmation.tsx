'use client'

import React from "react";
import {autop} from "@wordpress/autop";
import {useTranslations} from "next-intl";

import OneButtonToRuleThemAll from "@/app/components/buttons/OneButtonToRuleThemAll";
import {useCheckExternalToken} from "@/app/hooks/useCheckExternalToken";
import FrilandLogo from "@/assets/icons/friland-round-logo.svg";

export default function ExternalConfirmation() {
    const t = useTranslations('ExternalConfirmation');

    const {
        doAccept,
        accepted,
        busy,
        canAccept,
        displayPopup
    } = useCheckExternalToken();

    if (!displayPopup || accepted) {
        return <div className={'hidden'}/>;
    }

    return (
        <div className='fixed inset-0 z-[99999] bg-[rgba(0,0,0,.5)]'>
            <div
                className='bg-white absolute w-[800px] max-w-[90%] -translate-y-1/2 -translate-x-1/2 left-1/2 top-1/2 px-4 py-12 lg:p-12 2xl:p-24 text-center items-center flex flex-col gap-16'>

                <FrilandLogo className='w-60'/>

                <div
                    className="prose-2xl lg:text-3xl !leading-[1.5]"
                    dangerouslySetInnerHTML={{__html: autop(canAccept ? t('content') : t('content_rejected'))}}/>

                {canAccept &&
                    <div>
                        <OneButtonToRuleThemAll
                            labelClass={'py-8 px-12 lg:py-8 lg:px-12 lg:text-3xl !leading-none'}
                            onClick={doAccept}
                            isBusy={busy}
                        >
                            {busy ? t('cta_busy') : t('cta')}
                        </OneButtonToRuleThemAll>
                    </div>
                }
            </div>
        </div>
    );
}