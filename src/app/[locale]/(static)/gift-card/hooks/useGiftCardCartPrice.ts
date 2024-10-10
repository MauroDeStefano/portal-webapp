import {useFrilandContext} from "@/app/contexts/FrilandContext";
import {useCurrencyFormatter} from "@/app/hooks/useCurrencyFormatter";

export const useGiftCardCartPrice = (): string => {
    const currency = useCurrencyFormatter();
    const {
        cart,
    } = useFrilandContext((state) => state)

    const total = cart.reduce((acc, item) => {
        return acc + item.totalPriceDiscounted;

    }, 0);

    return currency(total);
}
