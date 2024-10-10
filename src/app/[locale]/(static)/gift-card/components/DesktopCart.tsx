import React from "react";
import {TrashIcon} from "@storybook/icons";
import {useTranslations} from "next-intl";

import {useGiftCardCartContext} from "@/app/[locale]/(static)/gift-card/components/Cart";
import {useGiftCardCartPrice} from "@/app/[locale]/(static)/gift-card/hooks/useGiftCardCartPrice";
import {useGiftCardCartSummary} from "@/app/[locale]/(static)/gift-card/hooks/useGiftCardSummary";
import {ArrowForwardIcon} from "@/app/components/Icons";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import {useFrilandContext} from "@/app/contexts/FrilandContext";

type TCartProps = {}

function CartDetailsExpanded() {
    const t = useTranslations('Reservation');
    const {
        cart,
        removeFromCart
    } = useFrilandContext((state) => state)

    return (
        <div
            className="gift-card-cart-bar__selection">
            {cart.map((item) => {
                if (item.product_type !== 'GIFT_CARD') {
                    return null;
                }

                return (
                    <div className="gift-card-cart-bar__selection-item" key={item.uniq_id}>
                        <div className="gift-card-cart-bar__selection-item-description mcy-0">
                            <p><strong>1 Gift card</strong><br/>
                                {item.product_name}</p>
                            <p><i>{t('nights_label', {night_count: item.qty})}</i></p>
                        </div>

                        <button
                            type="button"
                            role="button"
                            onClick={() => removeFromCart(item)}
                            className="button-5 gift-card-cart-bar__selection-item-trash"
                        >
                            <div className="button-5__circle"></div>

                            <div className="button-5__icon">
                                <TrashIcon/>
                            </div>
                        </button>
                    </div>
                );
            })}
        </div>
    );
}

function CartDetailsCollapsed() {
    const cartSummary = useGiftCardCartSummary();
    const {
        toggleCart,
    } = useGiftCardCartContext();

    const {
        cart
    } = useFrilandContext((state) => state)

    return (
        <div
            onClick={toggleCart}
            className="gift-card-cart-bar__overview gift-card-cart-bar__overview--selected"
            title={cartSummary}
        >
            <div className="gift-card-cart-bar__items">
                <div className="gift-card-cart-bar__items-amount">{cart.length} Gift Card</div>
                <div className="gift-card-cart-bar__items-description">
                    {cartSummary}
                </div>
            </div>
        </div>
    );
}

export default function DesktopCart(props: TCartProps) {
    const {
        isCartVisible,
        isCartExpanded,
        completePurchase,
        isRedirecting
    } = useGiftCardCartContext();

    const t = useTranslations('GiftCard')
    const cartTotal = useGiftCardCartPrice();

    const {
        setIsCartExpanded
    } = useGiftCardCartContext();

    if (!isCartVisible('GIFT_CARD')) {
        return null;
    }

    return (
        <>
            {isCartExpanded &&
                <div
                    className="gift-card-cart-bar__overlay"
                    onClick={() => setIsCartExpanded(false)}/>
            }

            <div className={'max-lg:hidden'}>
                {isCartExpanded && <CartDetailsExpanded/>}

                <div className="gift-card-cart-bar">
                    <div className="gift-card-cart-bar__wrapper">
                        <CartDetailsCollapsed/>

                        <button className="gift-card-cart-bar__total" onClick={completePurchase} type={'button'}
                                disabled={isRedirecting}>
                            <div className="gift-card-cart-bar__button">
                                <div className="gift-card-cart-bar__button-label">
                                    {t('buy_cta')}<br/>
                                    <span className="gift-card-cart-bar__button-price">{cartTotal}</span>
                                </div>
                                <div className="gift-card-cart-bar__button-icon">
                                    {isRedirecting ? <LoadingSpinner/> : <ArrowForwardIcon/>}
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};