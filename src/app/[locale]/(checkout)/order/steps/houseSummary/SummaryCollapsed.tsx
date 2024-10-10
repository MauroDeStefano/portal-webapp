'use client';

import {useState} from "react";
import {useTranslations} from "next-intl";

import ServicesIncludedInOrder from "@/app/[locale]/(checkout)/order/components/ServicesIncludedInOrder";
import {useHouseSummaryContext} from "@/app/[locale]/(checkout)/order/steps/houseSummary/HouseSummaryContext";
import {useCurrencyFormatter} from "@/app/hooks/useCurrencyFormatter";
import Alert from "@/assets/icons/alert.svg";
import ChevronDown from "@/assets/icons/chevron-down.svg";

export default function SummaryCollapsed() {
    const t = useTranslations('Checkout');
    const currency = useCurrencyFormatter()

    const {
        cartItem: {
            product_name,
        },
        house: {
            discount: gift_card,
            taxes,
            totalPrice,
            totalPriceDiscounted,
            night_count,
            has_pet
        }
    } = useHouseSummaryContext();

    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <>
            <div className="card-1">
                <div className="card-1__price-accordion">
                    <div className="card-1__price-accordion-trigger"
                         onClick={() => setIsExpanded(!isExpanded)}
                         aria-expanded={isExpanded}
                         data-js="accordion-trigger">

                        <div className="card-1__price-accordion-title">
                            <h2 className="card-1__title">{product_name}</h2>
                        </div>

                        <div className="card-1__price-accordion-icon">
                            <ChevronDown/>
                        </div>

                        <div className="card-1__price-accordion-price-wrapper">
                            <div className="card-1__price-accordion-price">{currency(totalPrice)}</div>

                            <div className="card-1__price-accordion-description">
                                {t('price_summary.taxes', {taxes: currency(taxes)})}
                            </div>
                        </div>
                    </div>

                    <div className="card-1__price-accordion-content"
                         aria-hidden={!isExpanded}>
                        <div className="card-1__price-accordion-content-container">
                            <div className="card-1__price-accordion-content-wrapper">
                                <div className="stay-overview-2">
                                    <div className="stay-overview-2__overview">
                                        <p className="stay-overview-2__num-nights">{t('how_many_nights', {night_count})}</p>

                                        <div className="stay-overview-2__details">
                                            <ServicesIncludedInOrder/>
                                        </div>
                                    </div>

                                    {has_pet &&
                                        <div className="stay-overview-2__options">
                                            <p className="stay-overview-2__option">{t('with_pet')}</p>
                                        </div>
                                    }

                                    <div className="stay-overview-2__price">
                                        <div className="stay-overview-2__price-value">{currency(totalPrice)}</div>
                                        <div
                                            className="stay-overview-2__price-description">{t('price_summary.taxes', {taxes: currency(taxes)})}</div>
                                    </div>

                                    {/*<div className="stay-overview-2__alert">*/}
                                    {/*    <div*/}
                                    {/*        className="stay-overview-2__alert-icon">*/}
                                    {/*        <Alert/>*/}
                                    {/*    </div>*/}
                                    {/*    <p className="stay-overview-2__alert-text">Le date selezionate non sono comprese*/}
                                    {/*        o coperte dalla tua Gift Card</p>*/}
                                    {/*    <div role="button" className="stay-overview-2__alert-button">Ho capito</div>*/}
                                    {/*</div>*/}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </>
    );
};