import {useTranslations} from "next-intl";

import {useCurrencyFormatter} from "@/app/hooks/useCurrencyFormatter";
import {TCartItem} from "@/types";

type TProductSummary = {}

export default function ProductSummary({item}: {
    item: TCartItem
}) {
    const t = useTranslations('Checkout');
    const currency = useCurrencyFormatter()

    return (
        <div className="card-1">
            <div className="card-1__price-accordion-trigger">
                <div className="card-1__price-accordion-title">
                    <h2 className="card-1__title">{item.product_name}</h2>
                </div>

                <div className="card-1__price-accordion-price-wrapper">
                    <div className="card-1__price-accordion-price">{currency(item.totalPriceDiscounted)}</div>

                    <div className="card-1__price-accordion-description">
                        {t('price_summary.taxes', {taxes: currency(item.taxes)})}
                    </div>
                </div>
            </div>
        </div>
    );
};