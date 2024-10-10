import {useFormatter} from "use-intl";

import {useFrilandContext} from "@/app/contexts/FrilandContext";

export const useGiftCardCartSummary = (): string => {
    const format = useFormatter();
    const uniqueProducts: Record<string, number> = {};

    const {
        cart,
    } = useFrilandContext((state) => state)

    cart.forEach((item) => {
        if (item.product_type !== 'GIFT_CARD') {
            return;
        }

        if (!uniqueProducts[item.product_name]) {
            uniqueProducts[item.product_name] = 0;
        }

        uniqueProducts[item.product_name] += 1;
    });

    const uniqueProductsArray = [];
    for (const [name, qty] of Object.entries(uniqueProducts)) {
        uniqueProductsArray.push({name, qty});
    }

    return format.list(uniqueProductsArray.map(({name, qty}: { name: string, qty: number }) => {
        return qty > 1 ? `${qty}×${name}` : name;
    }), {
        style: 'long',
        type: 'conjunction',
    });
}