import {useTranslations} from "next-intl";

import {useHouseSummaryContext} from "@/app/[locale]/(checkout)/order/steps/houseSummary/HouseSummaryContext";
import {useDateFormatter} from "@/app/hooks/useDateFormatter";

export default function ServicesIncludedInOrder() {
    const t = useTranslations('Checkout');
    const guest_count_i18n = useTranslations('guest_count');
    const dateFormatter = useDateFormatter();
    const {
        cartItem: {
            dateRange,
            guests,
        },
    } = useHouseSummaryContext();

    const guest_summary = guest_count_i18n(`dropdown.${guests}`);

    return (
        <dl className="description-list-1">
            <div className="description-list-1__item">
                <dt className="description-list-1__title">{t('date_from')}</dt>
                <dd className="description-list-1__text">{dateFormatter(dateRange.start)}</dd>
            </div>

            <div className="description-list-1__item">
                <dt className="description-list-1__title">{t('date_to')}</dt>
                <dd className="description-list-1__text">{dateFormatter(dateRange.end)}</dd>
            </div>

            <div className="description-list-1__item">
                <dt className="description-list-1__title">{t('guests_label')}</dt>
                <dd className="description-list-1__text">{guest_summary}</dd>
            </div>
        </dl>
    );
};