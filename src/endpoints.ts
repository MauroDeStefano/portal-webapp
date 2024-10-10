import {sprintf} from "sprintf-js";

const BASE_DOMAIN = 'https://app.friland.it/v1';

const Endpoints = {
    home: (locale: string) => sprintf(`${BASE_DOMAIN}/content/%s/homePageInfo`, locale),

    profile: {
        user: `${BASE_DOMAIN}/user`,
        auth: (locale: string) => `${BASE_DOMAIN}/user/ws/login/${locale}`,
        logout: `${BASE_DOMAIN}/user/we/logout`,
        register: `${BASE_DOMAIN}/user/new`,
        full_info: `${BASE_DOMAIN}/content/ws/user/full-info`,

        profile: `${BASE_DOMAIN}/user/ws/profile`,
        update_profile: `${BASE_DOMAIN}/user/update`,
        refresh_token: `${BASE_DOMAIN}/user/ws/useRefreshToken`,
        update_password: `${BASE_DOMAIN}/user/ws/updatePassword`,

        create_password: `${BASE_DOMAIN}/user/ws/first-login`,
        reset_password: `${BASE_DOMAIN}/user/ws/set-forget-pass`,
        request_password_reset: `${BASE_DOMAIN}/user/ws/password-forgoten`,

        newsletter: `${BASE_DOMAIN}/user/ws/newsletter-status`,

        switch_language: (locale: string) => `${BASE_DOMAIN}/user/ws/updateLanguage/${locale}`,

        deleteReservation: (id: number) => sprintf(`${BASE_DOMAIN}/booking/ws/%s`, id),
        giveGiftCard: `${BASE_DOMAIN}/gift_card/ws/changeOwner`,
    },

    newsletter: {
        subscribe: `${BASE_DOMAIN}/user/ws/subscribe`,
        unsubscribe: `${BASE_DOMAIN}/user/ws/unsubscribe`
    },

    submit_form: `${BASE_DOMAIN}/content/ws/form`,

    region_list: `${BASE_DOMAIN}/houses/ws/region_list`,
    regions_marketing: (locale: string, region_id: number) => sprintf(`${BASE_DOMAIN}/content/ws/regionContent/%s/%s`, locale, region_id),
    date_range: `${BASE_DOMAIN}/vacancy/allHousesSimple`,

    gift_card_availability: (start_date: string, end_date: string, giftCardID: string | number) => sprintf(`${BASE_DOMAIN}/vacancy/ws/allHouses/onGift/%s/%s/%s`, start_date, end_date, giftCardID),

    blog: {
        content: (locale: string) => sprintf(`${BASE_DOMAIN}/article/ws/mainPageContent/%s`, locale),
        posts_by_tag: (locale: string, id: number | string | undefined) => sprintf(`${BASE_DOMAIN}/article/ws/getArticleList/%s/%s`, locale, id),
        post_by_id: (locale: string, id: number | string) => sprintf(`${BASE_DOMAIN}/article/ws/singlePageContent/%s/%s`, locale, id),
        tags: (locale: string) => sprintf(`${BASE_DOMAIN}/article/ws/allCategories/%s`, locale)
    },

    houses: {
        single: (id: number, locale: string) => sprintf(`${BASE_DOMAIN}/content/%s/house/%s`, locale, id),
        availability: (id: number, start: string, end: string) => sprintf(`${BASE_DOMAIN}/vacancy/ws/oneHouse/%s/%s/%s`, start, end, id),
        in_region: ({region, locale}: {
            region: string | number,
            locale: string
        }) => sprintf(`${BASE_DOMAIN}/content/%s/allHouses/%s`, locale, region),
        // https://app.friland.it/v1/days/vacancyAll/ws/2024-06-06/2024-08-07/6
        vacant_in_region: (start_date: string, end_date: string, region: string | number) => sprintf(`${BASE_DOMAIN}/days/vacancyAll/ws/%s/%s/%s`, start_date, end_date, region),
    },
    booking: {
        price: (houseId: number, start: string, end: string, has_pet: boolean) => sprintf(
            `${BASE_DOMAIN}/booking/price/ws/v2/%s/%s/%s/%s`, houseId, start, end, has_pet.toString()
        ),
        payment_intent: `${BASE_DOMAIN}/booking/new/ws`,
        payment_intent_gift_card: `${BASE_DOMAIN}/gift_card/ws/new`,
        payment_intent_test: `${BASE_DOMAIN}/booking/new/test`,
    },


    giftCards: (locale: string) => sprintf(`${BASE_DOMAIN}/gift_card_template/all/b2c/%s`, locale),

    faq: (locale: string) => sprintf(`${BASE_DOMAIN}/content/all/faqs/%s`, locale),

    faqBlock: (id: number, locale: string) => sprintf(`${BASE_DOMAIN}/faq/tags/byBlock/%s/%s`, id, locale),

    newDestinations: `${BASE_DOMAIN}/content/newestHousesCards`,

    reviews: (houseId: number, locale: string) => sprintf(`${BASE_DOMAIN}/review/ws/single/%s/%s`, houseId, locale),

    bestLocations: (locale: string) => sprintf(`${BASE_DOMAIN}/content/ws/bestContent/%s`, locale),

    mostClickedLocations: `${BASE_DOMAIN}/content/ws/mostClicked`

} as const;

export {Endpoints};