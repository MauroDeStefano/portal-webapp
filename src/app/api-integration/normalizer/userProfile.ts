import {userGiftCards} from "@/app/api-integration/normalizer/giftCards";
import {orders} from "@/app/api-integration/normalizer/orders";
import {TUserAddress, TUserPreferences, TUserProfile} from "@/types/user";

export function userProfile(data: any) {
    const preferences: TUserPreferences = {
        language: data.preferences.language || 'en',
        newsletter_subscription: data.preferences.newsletter_subscription || false
    };

    const address: TUserAddress[] = [{
        street: data.address.street,
        city: data.address.city,
    }];

    const user: TUserProfile = {
        name: data.name,
        surname: data.surname,
        email: data.email,
        phone: data.phone,
        last_login: data?.last_login,

        preferences,
        address,

        orders: orders(data.orders),
        gift_cards: userGiftCards(data.gift_cards.gift_cards)
    };

    return user;
}
