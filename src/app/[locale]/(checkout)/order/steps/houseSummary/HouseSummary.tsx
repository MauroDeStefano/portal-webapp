'use client'
import {Link} from "@i18n/config";
import {useTranslations} from "next-intl";

import PetCheckbox from "@/app/[locale]/(checkout)/order/components/PetCheckbox";
import PriceSummary from "@/app/[locale]/(checkout)/order/components/PriceSummary";
import ServicesIncludedInOrder from "@/app/[locale]/(checkout)/order/components/ServicesIncludedInOrder";
import {useOrderContext} from "@/app/[locale]/(checkout)/order/OrderContext";
import {useHouseSummaryContext} from "@/app/[locale]/(checkout)/order/steps/houseSummary/HouseSummaryContext";
import {useCurrencyFormatter} from "@/app/hooks/useCurrencyFormatter";
import {locationSlug} from "@/app/utils/locationSlug";

export default function HouseSummary() {
    const t = useTranslations('Checkout');
    const currency = useCurrencyFormatter()

    const {
        error,
    } = useOrderContext((state) => state);

    const {
        cartItem: {
            product_id,
            product_name,
            petAllowed,
        },
        house: {
            totalPrice,
            night_count
        }
    } = useHouseSummaryContext();

    return (
        <>
            <div className="card-1">
                <div className="card-1__header">
                    <h2 className="card-1__title">
                        <Link href={{
                            pathname: '/destination/[slug]',
                            params: {slug: locationSlug(product_id, product_name)}
                        }}>{product_name}</Link>
                    </h2>
                </div>

                <div className="stay-overview-1">
                    <div className="stay-overview-1__overview">
                        <p className="stay-overview-1__num-nights">{t('how_many_nights', {night_count})}</p>

                        <div className="stay-overview-1__details">
                            <ServicesIncludedInOrder/>
                            <p className="stay-overview-1__price">{currency(totalPrice)}</p>
                        </div>
                    </div>

                    <div className="stay-overview-1__options">
                        {petAllowed && <PetCheckbox/>}
                    </div>
                </div>

                {error && <div className="error-message">{error}</div>}
            </div>

            {/*<UpsellWrapper/>*/}
            <PriceSummary/>
        </>
    );
};