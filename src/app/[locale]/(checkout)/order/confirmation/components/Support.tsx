'use client';

import React from "react";
import {useTranslations} from "next-intl";

import OneButtonToRuleThemAll from "@/app/components/buttons/OneButtonToRuleThemAll";
import {ArrowForwardIcon} from "@/app/components/Icons";

type TSupport = {}

export default function Support(props: TSupport) {
    const t = useTranslations('Checkout.confirmation');

    return (
        <div className="order-complete-1__support lg:w-1/3">
            <div className="cta-6">
                <h3 className="cta-6__title display--24">{t('support.title')}</h3>

                <div className="cta-6__links">
                    <OneButtonToRuleThemAll
                        tagName={'link'}
                        noPadding={true}
                        iconOutline={true}
                        hoverEffect='scale'
                        background={'none'}
                        icon={<ArrowForwardIcon/>}
                        className='icon-button icon-button--white icon-button--outline'
                        href="/faq">
                        {t('support.cta.faq')}
                    </OneButtonToRuleThemAll>

                    <OneButtonToRuleThemAll
                        tagName={'link'}
                        noPadding={true}
                        iconOutline={true}
                        hoverEffect='scale'
                        background={'none'}
                        icon={<ArrowForwardIcon/>}
                        className=" icon-button icon-button--white icon-button--outline"
                        href="/contact">
                        {t('support.cta.contact')}
                    </OneButtonToRuleThemAll>

                </div>
            </div>
        </div>
    );
};