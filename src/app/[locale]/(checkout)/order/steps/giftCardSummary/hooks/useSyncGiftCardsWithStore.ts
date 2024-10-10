import {useOrderContext} from "@/app/[locale]/(checkout)/order/OrderContext";
import {useDebounce} from "@/app/hooks/useThrottle";
import {TCompleteOrderSchema} from "@/app/serverActions/validators/completeOrderValidator";
import {TCartItem} from "@/types";

export function useSyncGiftCardsWithStore() {
    const debounce = useDebounce();

    const {
        cart,
        replaceCart,
    } = useOrderContext((state) => state);

    return (formData: TCompleteOrderSchema) => {
        if (formData.cart_type !== 'GIFT_CARD') {
            return;
        }

        let newCart: TCartItem[] = [];

        formData?.giftCards
            ?.forEach((formItem) => {
                cart
                    .filter(({product_type}) => product_type === 'GIFT_CARD')
                    .filter(({uniq_id}) => uniq_id === formItem.id)
                    .forEach((cartItem) => {
                        newCart.push({
                            ...cartItem,
                            // @ts-ignore
                            delivery_method: formItem?.delivery_method ?? 'myself',
                            recipient: {
                                // @ts-ignore
                                email: formItem?.email ?? '',
                                // @ts-ignore
                                name: formItem?.name ?? '',
                                // @ts-ignore
                                surname: formItem?.surname ?? '',
                                // @ts-ignore
                                message: formItem?.message ?? '',
                                // @ts-ignore
                                date_gift: formItem?.date_gift ?? '',
                            }
                        });
                    });
            });

        debounce(() => {
            replaceCart(newCart);
        }, 1000);
    }
}