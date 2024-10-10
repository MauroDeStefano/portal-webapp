import {useEffect} from "react";
import {useFieldArray, useFormContext} from "react-hook-form";
import {TrashIcon} from "@storybook/icons";
import classNames from "classnames";
import {useTranslations} from "next-intl";

import PriceSummary from "@/app/[locale]/(checkout)/order/components/PriceSummary";
import {useOrderContext} from "@/app/[locale]/(checkout)/order/OrderContext";
import GiftCardRecipient from "@/app/[locale]/(checkout)/order/steps/giftCardSummary/GiftCardRecipient";
import {
    useSyncGiftCardsWithStore
} from "@/app/[locale]/(checkout)/order/steps/giftCardSummary/hooks/useSyncGiftCardsWithStore";
import {useCurrencyFormatter} from "@/app/hooks/useCurrencyFormatter";
import {giftCardOrderValidator, TCompleteOrderSchema} from "@/app/serverActions/validators/completeOrderValidator";
import {TCartItem} from "@/types";

export default function GiftCardSummaryList() {
    const {
        cart,
        step,
        removeFromCart,
        setCanChangeStep,
    } = useOrderContext((state) => state);

    const {control, watch, getValues} = useFormContext<TCompleteOrderSchema>();
    const {remove} = useFieldArray({
        control: control,
        name: 'giftCards',
    });

    const syncCart = useSyncGiftCardsWithStore();

    useEffect(() => {
        if (step !== 'summary') {
            return;
        }

        const subscription = watch((formData) => {
            if (formData.cart_type !== 'GIFT_CARD') {
                return;
            }

            const validateStep = giftCardOrderValidator().safeParse(formData.giftCards);
            setCanChangeStep(validateStep.success);

            // @ts-ignore
            syncCart(formData)
        })

        return () => {
            subscription.unsubscribe();
        }
    }, [watch])

    const handleDelete = (item: TCartItem, index: number) => {
        remove(index);
        removeFromCart(item);
    }

    return (
        <div className={classNames({
            'hidden': step !== 'summary',
        })}>
            {cart.map((item, index) => {
                return (
                    <GiftCardSummaryItem
                        key={item.uniq_id}
                        index={index}
                        handleDelete={(item) => handleDelete(item, index)}
                        item={item}/>
                );
            })}

            <PriceSummary
                showDiscountedPrice={false}/>
        </div>
    );
};

function GiftCardSummaryItem({
                                 item,
                                 index,
                                 handleDelete
                             }: {
    item: TCartItem,
    index: number,
    handleDelete: (item: TCartItem) => void
}) {
    const currency = useCurrencyFormatter();
    const t = useTranslations('Checkout');

    if (item.product_type !== 'GIFT_CARD') {
        return null;
    }

    return (
        <>
            <div className="card-1">
                <div className="card-1__gift-card-header">
                    <div className="card-1__gift-card-header-cell">
                        <div className="card-1__gift-card-header-content">
                            <div className="card-1__gift-card-header-title">
                                <h2 className="card-1__title">{item.product_name}</h2>
                            </div>

                            <p className="card-1__gift-card-header-description">{t('valid_until')}</p>
                        </div>

                        <div className="card-1__gift-card-header-num-nights">
                            {t('how_many_nights', {night_count: item.qty})}
                        </div>

                        <button
                            onClick={() => handleDelete(item)}
                            className="card-1__gift-card-header-delete card-1__gift-card-header-delete--mobile">
                            <TrashIcon/>
                        </button>
                    </div>

                    <div className="card-1__gift-card-header-cell">
                        <button
                            type={'button'}
                            onClick={() => handleDelete(item)}
                            className="card-1__gift-card-header-delete card-1__gift-card-header-delete--desktop">
                            <TrashIcon/>
                        </button>

                        <div className="card-1__gift-card-header-price">{currency(item.totalPriceDiscounted)}</div>
                    </div>
                </div>

                <GiftCardRecipient
                    item={item}
                    index={index}
                />
            </div>
        </>
    );
}
