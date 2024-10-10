'use client'

import React, {Dispatch, SetStateAction, useState} from "react";
import {useTranslations} from "next-intl";
import {sprintf} from "sprintf-js";

import {useDeleteReservation} from "@/app/api-integration/user-delete-order";
import LinkWithIcon from "@/app/components/buttons/LinkWithIcon";
import DescriptionList1 from "@/app/components/DescriptionList1";
import {DescriptionList2Item} from "@/app/components/DescriptionList2";
import {ArrowForwardIcon} from "@/app/components/Icons";
import {useBusyContext} from "@/app/contexts/BusyContext";
import {useCurrencyFormatter} from "@/app/hooks/useCurrencyFormatter";
import {useDateFormatter} from "@/app/hooks/useDateFormatter";
import {TUserOrder, TUserOrderExtra} from "@/types/user";

type Props = {
    order: TUserOrder
}

function DeleteButton({reservationId, children, onDelete}: {
    reservationId: number,
    children: React.ReactNode,
    onDelete: Dispatch<SetStateAction<boolean>>
}) {
    const handleDelete = useDeleteReservation();
    const {isBusy, setIsBusy} = useBusyContext((state) => state);

    return (
        <LinkWithIcon
            onClick={async (data) => {
                setIsBusy(true);
                try {
                    await handleDelete(reservationId);
                } catch (e: any) {
                    throw new Error(e.message);
                } finally {
                    setIsBusy(false);
                    onDelete(true)
                }
            }}
            disabled={isBusy}
            tagName="button"
            icon={<ArrowForwardIcon/>}>{children}</LinkWithIcon>
    );
}

function OrderExtra({item}: {
    item: TUserOrderExtra
}) {
    const t = useTranslations('Reservation');
    const variants: Record<string, string> = {
        meal_kit: 'meal_kit_desc',
    }

    if (!variants[item.type]) {
        return (
            <p className="stay-overview-3__option">
                {sprintf(item.title, {...item})}
            </p>
        );
    }

    return (
        <p className="stay-overview-3__option">{
            // @ts-ignore
            t(variants[item.type], {...item})
        }</p>
    );
}

export default function StayOverview3({order}: Props) {
    const t = useTranslations('Reservation');
    const tom = useTranslations('OneMany');
    const currencyFormatter = useCurrencyFormatter();

    const buildGuestsString = (guests: number) => {
        if (guests < 3) {
            return sprintf(t('guests_content'), guests);
        } else {
            return sprintf(t('guests_content'), guests) + '+' + sprintf(t('guests_children'), guests - 2);
        }
    }

    const [isDeleted, setIsDeleted] = useState(false);

    const dateFormatter = useDateFormatter();

    if (!isDeleted) {
        return (
            <div className="stay-overview-3">
                <div className="stay-overview-3__overview">
                    <p className="stay-overview-3__num-nights">{tom('night', {count: order.total_nights})}</p>

                    <div className="stay-overview-3__details">
                        <div>
                            <DescriptionList1>
                                <DescriptionList2Item
                                    title={t('date_from')}>{dateFormatter(order.date_from)}</DescriptionList2Item>
                                <DescriptionList2Item
                                    title={t('date_to')}>{dateFormatter(order.date_to)}</DescriptionList2Item>
                                <DescriptionList2Item
                                    title={t('guests_label')}>{buildGuestsString(order.guests_numbers || 0)}</DescriptionList2Item>
                            </DescriptionList1>

                            <div className="stay-overview-3__options">
                                {order.extras.map((item, index) => <OrderExtra key={item.id} item={item}/>)}
                                {order.pet && <p className="stay-overview-3__option">{t('pets_desc')}</p>}
                            </div>
                        </div>

                        <div className="stay-overview-3__price">
                            <div
                                className="stay-overview-3__price-value">{currencyFormatter(order.total_price)}</div>
                            <div
                                className="stay-overview-3__price-description">{sprintf(t('tax_desc'), currencyFormatter(order.tax))}</div>
                        </div>
                    </div>

                    <div className="stay-overview-3__actions">
                        <div className="stay-overview-3__action-item">
                            {order.cancellable &&
                                <div className="stay-overview-3__cancel">
                                    <DeleteButton
                                        reservationId={order.id}
                                        onDelete={setIsDeleted}>{t('cancel_label')}</DeleteButton>
                                </div>
                            }
                            {!order?.cancellable &&
                                <div className="stay-overview-3__cancel stay-overview-3__cancel--disabled">
                                    <LinkWithIcon tagName="button" icon={<ArrowForwardIcon/>}
                                                  disabled={true}>{t('cancel_label')}</LinkWithIcon>

                                    <p className="stay-overview-3__cancel-text">
                                        {t('cancellation_text')}
                                    </p>
                                </div>
                            }
                        </div>

                        <div className="stay-overview-3__action-item">
                            <div className="stay-overview-3__invoice">
                                {order.attachments.map((item, index) =>
                                    <LinkWithIcon
                                        key={index}
                                        tagName="button"
                                        icon={<ArrowForwardIcon/>}
                                        disabled={true}>{item.type}</LinkWithIcon>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="stay-overview-3">
            <div className="stay-overview-3__overview">
                <p className="stay-overview-3__num-nights card-1__gift-card-accordion-status--expired">{t('deleted')}</p>
            </div>
        </div>
    )
}