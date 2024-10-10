'use client';
import {useTranslations} from "next-intl";

type TPaymentZeroProps = {}

export default function PaymentZero(props: TPaymentZeroProps) {
    const t = useTranslations('Checkout.payment_zero');

    return (
        <>
            <h3>{t('title')}</h3>
            <p>{t('content')}</p>
        </>
    );
}