'use client';

import React, {useEffect} from "react";
import {useTranslations} from "next-intl";

import NextSteps from "@/app/[locale]/(checkout)/order/confirmation/components/NextSteps";
import SummaryGiftCardOrderComplete
    from "@/app/[locale]/(checkout)/order/confirmation/components/SummaryGiftCardOrderComplete";
import Support from "@/app/[locale]/(checkout)/order/confirmation/components/Support";
import {useOrderContext} from "@/app/[locale]/(checkout)/order/OrderContext";
import {LoadHouseSummary} from "@/app/[locale]/(checkout)/order/steps/houseSummary/HouseSummaryContext";
import OneButtonToRuleThemAll from "@/app/components/buttons/OneButtonToRuleThemAll";
import {ArrowForwardIcon, CheckMarkCircleIcon} from "@/app/components/Icons";
import {useTrackOrderComplete} from "@/app/utils/tracking";
import {useIubenda} from "@mep-agency/next-iubenda";

export default function Success({
                                    payment_intent
                                }: {
    payment_intent: string
}) {
    const {
        cart
    } = useOrderContext((state) => state);

    const t = useTranslations('Checkout.confirmation');
    const track = useTrackOrderComplete();
    const {
        userPreferences, // The latest available user preferences data
        showCookiePolicy, // Displays the cookie policy popup
        openPreferences, // Opens the preferences panel
        showTcfVendors, // Opens the TCF vendors panel
        resetCookies, // Resets all cookies managed by Iubenda

        /*
         * The following exposed entries are meant for internal use only and should
         * not be used in your projects.
         */
        dispatchUserPreferences, // Update the user preferences data across the app
        i18nDictionary, // Contains the translations for the built-in components
    } = useIubenda();

    useEffect(() => {
        if (typeof userPreferences !== 'undefined') {
            if (userPreferences.gdprPurposes.measurement) {
                track(cart, payment_intent);
            }
        }
    }, []);

    return (
        <>
            <div className=" card-1 card-1--green">
                <div className="order-complete-1__payment">
                    <div className="order-complete-1__payment-confirmation">
                        <ul className="payment-confirmation-1">
                            <li className="payment-confirmation-1__item">
                                <div className="payment-confirmation-1__item-icon">
                                    <CheckMarkCircleIcon/>
                                </div>

                                <div className="payment-confirmation-1__item-line"></div>

                                <div className="payment-confirmation-1__item-content">
                                    <h2 className="payment-confirmation-1__item-title display--54">{t('title')}</h2>

                                    <p className="payment-confirmation-1__item-label">{t('content', {
                                        order_id: ''
                                    })}</p>
                                </div>
                            </li>
                            {[...cart]
                                .filter(({product_type}) => product_type === 'GIFT_CARD').length > 0 && (
                                <NextSteps giftCard={true}/>)
                            }
                            {[...cart]
                                .filter(({product_type}) => product_type === 'HOUSE').length > 0 && (
                                <NextSteps giftCard={false}/>)
                            }
                        </ul>
                    </div>

                    <div className="order-complete-1__separator"></div>
                    <Support/>
                </div>

            </div>

            <div className="page-header-1 ">
                <h1 className="page-header-1__title">{t('summary_title')}</h1>
            </div>

            {[...cart]
                .map((item) => {
                    if (item.product_type !== 'HOUSE') {
                        return null;
                    }
                    return <LoadHouseSummary
                        key={item.uniq_id}
                        cartItem={item}/>
                })
            }

            {[...cart]
                .filter(({product_type}) => product_type === 'GIFT_CARD').length > 0 && (
                <div className="card-1 m-0">
                    <div className="gift-card-overview-3">
                        {[...cart]
                            .filter(({product_type}) => product_type === 'GIFT_CARD')
                            .map((item) => {
                                return <SummaryGiftCardOrderComplete
                                    key={item.uniq_id}
                                    item={item}/>
                            })
                        }
                    </div>
                </div>
            )}

            <div className="order-complete-1__continue">
                <OneButtonToRuleThemAll
                    tagName={'link'}
                    noPadding={true}
                    hoverEffect='scale'
                    background={'icon'}
                    icon={<ArrowForwardIcon/>}
                    className=" icon-button icon-button--white icon-button--outline"
                    href="/destinations">
                    {t('continue')}
                </OneButtonToRuleThemAll>
            </div>
        </>
    );
}