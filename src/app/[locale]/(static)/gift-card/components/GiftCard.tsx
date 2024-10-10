'use client';

import React, {useEffect, useRef, useState} from "react";
import {CSSTransition} from "react-transition-group";
import {autop} from "@wordpress/autop";
import classNames from "classnames";
import {useTranslations} from "next-intl";

import ButtonWithLabelOverAndIcon from "@/app/components/buttons/ButtonWithLabelOverAndIcon";
import LinkWithIcon from "@/app/components/buttons/LinkWithIcon";
import {AddIcon, MinusIcon} from "@/app/components/Icons";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import {useFrilandContext} from "@/app/contexts/FrilandContext";
import FeaturesModal from "@/app/sections/FeaturesModal";
import {TGiftCard} from "@/types/giftcard";
import {useCurrencyFormatter} from "@/app/hooks/useCurrencyFormatter";

export function GiftCardsWrapper({children}: { children: React.ReactNode }) {
    return (
        <div className="gift-card-selector">
            <div className="gift-card-selector__container fl-container">
                <div className="gift-card-selector__wrapper">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default function GiftCard({card}: { card: TGiftCard }) {
    const transitionDuration = 300;
    const {
        addToCart,
    } = useFrilandContext((state) => state)

    const t = useTranslations('GiftCard');
    const tom = useTranslations('OneMany');
    const nodeRef = useRef(null);
    const currency = useCurrencyFormatter(0);

    const [modalVisible, setModalVisible] = useState(false);

    const [numberOfNights, setNumberOfNights] = useState(() => {
        return card.minDuration;
    });

    const [addingToCart, setAddingToCart] = useState(false);
    useEffect(() => {
        if (addingToCart) {
            setTimeout(() => setAddingToCart(false), 1000);
        }
    }, [addingToCart])

    const addGiftToCart = () => {
        setAddingToCart(true);
        addToCart({
            product_type: 'GIFT_CARD',
            product_id: card.id,
            product_name: card.title,
            product_url: '/gift-card',
            totalPrice: card.totalPrice,
            taxes: card.taxes,
            discount: card.discount,
            discountGiftCards: 0,
            totalPriceDiscounted: card.totalPriceDiscounted,
            uniq_id: Math.random().toString(36).substring(7),
            qty: numberOfNights,
            delivery_method: 'myself',
            recipient: {
                name: '',
                surname: '',
                message: '',
                date_gift: '',
                email: '',
            }
        });
    }

    const incrementAmount = () => {
        setNumberOfNights(Math.min(card.maxDuration, (numberOfNights + 1)));
    }

    const decrementAmount = () => {
        setNumberOfNights(Math.max(1, card.minDuration, (numberOfNights - 1)));
    }

    const canAdjustAmount = card.isNigthsNumberEditable && card.maxDuration !== card.minDuration

    return (
        <>
            <div
                className="gift-card-selector__card relative" style={{backgroundColor: card.backgroundColor}}
                data-aos="fade-up">

                <img
                    className="gift-card-selector__card-bgimage"
                    src={card.backgroundImage}
                    alt={card.backgroundAlt}/>

                <div className="gift-card-selector__card-container">
                    <div className="gift-card-selector__card-copy">
                        <h3 className="gift-card-selector__card-title display--36"
                            dangerouslySetInnerHTML={{__html: autop(card.title)}}/>
                        <p className="gift-card-selector__card-description text--13">
                            <span dangerouslySetInnerHTML={{__html: card.text}}/>
                        </p>
                    </div>
                    <div className="gift-card-selector__card-amount">
                        {currency(card.totalPrice)}
                    </div>

                    {canAdjustAmount &&
                        <div className="gift-card-selector__card-amount">
                            <LinkWithIcon
                                onClick={decrementAmount}
                                nogap='true'
                                outline='true'
                                white='true'
                                tagName='button'
                                icon={<MinusIcon/>}/>
                            <span
                                className="gift-card-selector__card-amount-label">{tom('night', {count: numberOfNights})}</span>
                            <LinkWithIcon
                                onClick={incrementAmount}
                                nogap='true'
                                outline='true'
                                white='true'
                                tagName='button'
                                icon={<AddIcon/>}/>
                        </div>
                    }

                    <div className="gift-card-selector__card-add-button-wrapper">
                        <ButtonWithLabelOverAndIcon
                            tagName='button'
                            onClick={addGiftToCart}
                            icon={addingToCart ? <LoadingSpinner size={'small'}/> : <AddIcon/>}
                            disabled={addingToCart}
                            classes={classNames({
                                'gift-card-selector__card-add-button': true,
                                'gift-card-selector__card-add-button--busy': addingToCart,
                            })}>{addingToCart ? t('adding') : t('add')}</ButtonWithLabelOverAndIcon>
                    </div>

                    <button onClick={() => setModalVisible(true)}
                            className="gift-card-selector__card-additional-details"
                            role="button">
                        {t('included')}
                    </button>
                </div>
            </div>

            <CSSTransition
                in={modalVisible}
                nodeRef={nodeRef}
                timeout={transitionDuration}
                classNames="fade-in-out"
                unmountOnExit
            >
                <div className="features-modal" ref={nodeRef} onClick={() => setModalVisible(false)}>
                    <FeaturesModal data={card.features}/>
                </div>
            </CSSTransition>
        </>
    )
};