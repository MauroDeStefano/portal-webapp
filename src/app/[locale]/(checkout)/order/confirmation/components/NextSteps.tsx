'use client'
import React from "react";
import {useMessages} from "use-intl";
import {useTranslations} from "next-intl";

type TNextSteps = {
    giftCard?: boolean
}

export default function NextSteps(props: TNextSteps) {

    const t = useTranslations('Checkout.confirmation');


    return (
        <>
            {props?.giftCard &&
                <>
                    <li className="payment-confirmation-1__item">
                        <div className="payment-confirmation-1__item-circle"></div>
                        <div className="payment-confirmation-1__item-line"></div>
                        <div className="payment-confirmation-1__item-content">

                            <p className="payment-confirmation-1__item-label">{t('next_steps_giftcard.one')}</p>
                        </div>
                    </li>
                    <li className="payment-confirmation-1__item">
                        <div className="payment-confirmation-1__item-circle"></div>
                        <div className="payment-confirmation-1__item-line"></div>
                        <div className="payment-confirmation-1__item-content">

                            <p className="payment-confirmation-1__item-label">{t('next_steps_giftcard.two')}</p>
                        </div>
                    </li>
                    <li className="payment-confirmation-1__item">
                        <div className="payment-confirmation-1__item-circle"></div>
                        <div className="payment-confirmation-1__item-line"></div>
                        <div className="payment-confirmation-1__item-content">

                            <p className="payment-confirmation-1__item-label">{t('next_steps_giftcard.three')}</p>
                        </div>
                    </li>
                </>
            }
            {!props?.giftCard &&
                <>
                    <li className="payment-confirmation-1__item">
                        <div className="payment-confirmation-1__item-circle"></div>
                        <div className="payment-confirmation-1__item-line"></div>
                        <div className="payment-confirmation-1__item-content">

                            <p className="payment-confirmation-1__item-label">{t('next_steps.one')}</p>
                        </div>
                    </li>
                    <li className="payment-confirmation-1__item">
                        <div className="payment-confirmation-1__item-circle"></div>
                        <div className="payment-confirmation-1__item-line"></div>
                        <div className="payment-confirmation-1__item-content">

                            <p className="payment-confirmation-1__item-label">{t('next_steps.two')}</p>
                        </div>
                    </li>
                </>
            }
        </>
    );
};