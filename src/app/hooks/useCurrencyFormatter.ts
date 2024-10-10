import {useFormatter} from "use-intl";

export function useCurrencyFormatter(maximumFractionDigits?:number) {
    const format = useFormatter();

    return (
        price: number,
        currency = process?.env?.NEXT_PUBLIC_CURRENCY ?? 'EUR'
    ) => format.number(price, {
        style: 'currency',
        currency,
        maximumFractionDigits: (maximumFractionDigits !== undefined)?maximumFractionDigits:2
    })
}