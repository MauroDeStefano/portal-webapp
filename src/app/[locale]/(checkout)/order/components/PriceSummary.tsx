import classNames from "classnames";
import {useTranslations} from "next-intl";

import NextStep from "@/app/[locale]/(checkout)/order/components/NextStep";
import {useOrderContext} from "@/app/[locale]/(checkout)/order/OrderContext";
import {useCurrencyFormatter} from "@/app/hooks/useCurrencyFormatter";

type TPriceSummaryProps = {
    showDiscountedPrice?: boolean;
}

function PrimeSummaryRow({
                             label,
                             value,
                             negative = false,
                             show = true,
                             note,
                             extraMsg
                         }: {
    label: string;
    value: number;
    negative?: boolean;
    show?: boolean;
    note?: string;
    extraMsg?: string;
}) {
    const currency = useCurrencyFormatter()

    if (!show) {
        return null;
    }

    return <div className={classNames({
        'payment-summary__item': true,
        'payment-summary__item--negative': negative,
    })}>
        <div className="payment-summary__label">{label}</div>
        <div className="payment-summary__value-wrapper">
            <div className="payment-summary__value">{currency(value)}</div>
            {note && <div className="payment-summary__description">{note}</div>}
            {extraMsg && <div className="payment-summary__description">{extraMsg}</div>}
        </div>
    </div>;
}

export default function PriceSummary({
                                         showDiscountedPrice = true
                                     }: TPriceSummaryProps) {

    const t = useTranslations('Checkout');
    const currency = useCurrencyFormatter()

    const {
        goToUserDetails,
        cart
    } = useOrderContext((state) => state);

    const totalPrice = cart.reduce((acc, item) => {
        return acc + item.totalPrice;
    }, 0);

    const discount = cart.reduce((acc, item) => {
        return acc + item.discount;
    }, 0);

    const taxes = cart.reduce((acc, item) => {
        return acc + item.taxes;
    }, 0);

    const totalPriceDiscounted = cart.reduce((acc, item) => {
        return acc + item.totalPriceDiscounted;
    }, 0);

    const discountGiftCards = cart.reduce((acc, item) => {
        return acc + item.discountGiftCards;
    }, 0);


    return (
        <div className="card-1">
            <div className="payment-summary">
                <div className="payment-summary__items">
                    <PrimeSummaryRow
                        label={t('price_summary.subtotal')}
                        value={totalPrice}
                    />

                    <PrimeSummaryRow
                        label={t('price_summary.discount')}
                        value={discount}
                        show={showDiscountedPrice && discount !== 0}
                        negative={true}
                    />

                    <PrimeSummaryRow
                        label={t('price_summary.gift_card')}
                        value={discountGiftCards}
                        show={discountGiftCards > 0}
                        negative={true}
                    />
                </div>

                <hr className="payment-summary__separator"/>

                <div className="payment-summary__total">
                    <PrimeSummaryRow
                        label={t('price_summary.total')}
                        value={totalPriceDiscounted}
                        note={t('price_summary.taxes', {taxes: currency(taxes)})}
                        extraMsg={t('price_summary.tempnotes')}
                    />
                </div>

                <hr className="payment-summary__separator"/>

                <NextStep
                    nextStep={goToUserDetails}
                    label={t('step_button_nav.user-details')}
                />
            </div>
        </div>

    );
};