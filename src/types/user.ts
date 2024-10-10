export type TUserAddress = {
    street: string;
    city: string;
}

export type TUserPreferences = {
    language: string;
    newsletter_subscription: boolean;
}

// any keys added to TUserOrderExtra will be added to the object so you'll be able to use it in translation strings
// the `type` key is used to pick the translation key, while everything else will be passed as arguments to the translation function
// for example, if the translation string is :
// meal_kit_desc: "Meal kit for {guests_numbers} guests"
// then the `extra` item should look like this
// { id: 1,
//      type: 'meal_kit',
//      guests_numbers: 2 <<<<<< this key name is important, as it will be used in the translation string, in curly braces
// }

export type TUserOrderExtra = {
    id: number,
    type: string,
} & Record<string, any>;

export type TUserOrderAttachment = {
    id: number,
    type: string
}

export type TUserOrder = {
    id: number;
    pet: boolean;
    tax: number;
    guests_numbers: number;
    extras: TUserOrderExtra[];
    date_to: string;
    currency: string;
    date_from: string;
    cancellable: boolean;
    attachments: TUserOrderAttachment[];
    destination: {
        id: number;
        title: string;
        location: string;
    };
    total_price: number;
    total_nights: number;
}

export type TUserGiftCard = {
    id: number,
    title: string,
    nights: number,
    status: 'active',
    can_use: boolean,
    warning: boolean,
    can_give: boolean,
    value: number,
    currency: 'EUR',
    expiration: string,
    attachments: {}[]
}

export type TUserProfile = {
    name: string;
    surname: string;
    email: string;
    phone: string;
    last_login?: string;

    preferences: TUserPreferences;
    address: TUserAddress[];
    orders: TUserOrder[];
    gift_cards: TUserGiftCard[];
}
