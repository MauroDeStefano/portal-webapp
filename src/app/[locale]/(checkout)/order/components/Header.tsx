'use client';

import {Link} from "@i18n/config";
import {useTranslations} from "next-intl";

import {useOrderContext} from "@/app/[locale]/(checkout)/order/OrderContext";

export default function Header() {
    const t = useTranslations('Checkout');

    const {
        step,
        cartType,
        goToSummary,
        goToPayment,
        goToConfirmation,
        goToUserDetails,
        cart,
    } = useOrderContext((state) => state);

    const goBack = {
        "summary": null,
        "user-details": {
            label: t('step_back_detailed.summary'),
            callback: goToSummary
        },
        "payment": null,
        "confirmation": null,
    }

    return (
        <header className="iterative-screens__header">
            <div className="iterative-screens__header-container fl-container">
                <div className="iterative-screens__header-wrapper">
                    <div className="iterative-screens__header-action iterative-screens__header-action--left">
                        {step === 'summary' && <Link
                            href={cartType === 'HOUSE' ? '/destinations' : '/gift-card'}
                        >{cartType === 'HOUSE' ? t('step_back_detailed.destinations') : t('step_back_detailed.gift_card')}</Link>}

                        {goBack[step] &&
                            <button
                                type='button'
                                className="iterative-screens__header-action"
                                onClick={() => goBack[step]?.callback?.()}>{goBack[step]?.label}</button>
                        }
                    </div>

                    <div className="iterative-screens__header-logo">
                        <a href='/'>
                            <img
                                className="iterative-screens__header-logo-img"
                                src="/icons/friland-alt-logo.svg"
                                alt="Friland"
                            />
                        </a>
                    </div>

                    <div
                        className="iterative-screens__header-action iterative-screens__header-action--right">
                    </div>
                </div>
            </div>
        </header>
    );
};