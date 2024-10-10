import React from "react";
import {getTranslations} from "next-intl/server";

import Support from "@/app/[locale]/(checkout)/order/confirmation/components/Support";
import {TStripeStatus} from "@/app/[locale]/(checkout)/order/confirmation/page";
import {DeleteCircled} from "@/app/components/Icons";

type TFailedProps = {
    status: TStripeStatus
}

export default async function Failed({status}: TFailedProps) {
    const t = await getTranslations('Checkout.error');

    return (
        <>
            <div className=" card-1 card-1--red">
                <div className="order-complete-1__payment">
                    <div className="order-complete-1__payment-confirmation">
                        <ul className="payment-confirmation-1">
                            <li className="payment-confirmation-1__item">
                                <div className="payment-confirmation-1__item-icon">
                                    <DeleteCircled/>
                                </div>

                                <div className="payment-confirmation-1__item-line"></div>

                                <div className="payment-confirmation-1__item-content">
                                    <h2 className="payment-confirmation-1__item-title display--54">{t('title')}</h2>

                                    <p className="payment-confirmation-1__item-label">{t('content', {
                                        status: t(`error_code.${status}`)
                                    })}</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="order-complete-1__separator"></div>
                    <Support/>
                </div>
            </div>
        </>
    );
}