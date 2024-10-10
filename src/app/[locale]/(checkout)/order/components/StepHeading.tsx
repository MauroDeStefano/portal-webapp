'use client';

import React from "react";
import {useTranslations} from "next-intl";

import {useOrderContext} from "@/app/[locale]/(checkout)/order/OrderContext";
import {useFrilandContext} from "@/app/contexts/FrilandContext";
import {useAuthDrawers} from "@/app/hooks/useAuthDrawers";

export default function StepHeading() {
    const t = useTranslations('Checkout');

    const {
        step,
    } = useOrderContext((state) => state);

    const authDrawers = useAuthDrawers();
    const {isLoggedIn} = useFrilandContext((state) => state);

    return (
        <div className="page-header-1  page-header-1--with-action">
            <h1 className="page-header-1__title">{t(`step_titles.${step}`)} </h1>

            {!isLoggedIn &&
                <div className="page-header-1__action">
                    <button
                        type={'button'}
                        onClick={() => authDrawers.login()}
                        className="page-header-1__action-link">{t('login_cta')}</button>
                </div>
            }
        </div>
    );
};