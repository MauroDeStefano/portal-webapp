import {TUserGiftCard} from "@/types/user";

export function userGiftCards(serverData: []): TUserGiftCard[] {
    return serverData.map(({item}: any): TUserGiftCard => {
        return {
            id: item.id,
            title: item.title,
            nights: item.nights,
            status: item.status,
            can_use: item.can_use,
            warning: item.warning,
            can_give: item.can_give,
            currency: item.currency.toUpperCase(),
            expiration: item.expiration,
            value: item?.total_price || 0,
            attachments: item.attachments.map((attachment: any) => {
                // [{printable_pdf: 'Non disponibile'}]
                return {};
            })
        };
    })
}

export function giftCardsPageContent(serverData: any) {
    serverData.gifts = serverData.gifts.map((gift: any) => {
        gift.totalPrice = gift?.price?.totalPrice ?? 100;
        gift.taxes = gift?.price?.taxes ?? 10;
        gift.discount = gift?.price?.discount ?? 0;
        gift.totalPriceDiscounted = gift?.price?.totalPriceDiscounted ?? 100;

        return gift;
    });
    return serverData;
}