import {pathnames} from "@i18n/config";

import {DropdownOption} from "@/app/components/Forms/AvailabilityForm/types";

export type TValidGuestTypeValues = 1 | 2 | 3 | 4;

export type TPetOption = {
    petAllowed: boolean;
    hasPet: boolean;
    petPrice: number;
}

export type THouseCartItem = TPetOption & {
    dateRange: TDateRangeString,

    guests: TValidGuestTypeValues;
    product_type: 'HOUSE';
}

export type TGiftCardRecipient = {
    email: string;
    name: string;
    surname: string;
    message: string;
    date_gift: string;
}

export type TGiftCartItem = {
    product_type: 'GIFT_CARD';
    qty: number;

    recipient: TGiftCardRecipient;
    delivery_method: 'myself' | 'email';
}
export type TCartItem = {
    product_id: number;
    uniq_id: string;

    product_name: string;
    product_url: keyof typeof pathnames;

    totalPrice: number;
    taxes: number;
    discount: number;
    totalPriceDiscounted: number;
    discountGiftCards: number;
} & (
    THouseCartItem | TGiftCartItem
    )


export interface Image {
    src: string
    width: number
    height: number
    alt?: string
}


export interface URL {
    url: string
    anchor: string
}

export type TDateRangeString = {
    start: string;
    end: string;
}

export interface Region extends DropdownOption {
}

export interface TestimonialContent {
    items: [
        {
            id: number,
            author: string,
            content: string
        }
    ],
    title: string,
    images: {
        alt: string,
        desktop: string,
        mobile: string
    },
    subtitle: string
}

export interface HomeFeaturesProps {
    title: string,
    text: string,
    tags: {
        order: number | string
        name: string
        img: string
        imgMobile?: string
    }[]
    cta: URL
}

export interface VideoHeroProps {
    src: string,
    placeholder: string,
    title: string,
    imgDesktop: string
}

export interface SectionCTA1 {
    locations: {
        id: number | string
        name: string
        image: Image
        title: string
        subtitle: string
        cta: URL
    }[]
    image: Image
    title: string
    subtitle: string
}

export interface SectionCTA2 {
    cta: URL
    imgDesktop: string,
    imgMobile: string
    title: string
    text: string
}

export interface SectionCTA3 {
    cta: URL
    image: Image
    title: string
    content: string
}

export interface SectionCTA4 {
    cta1: URL
    image1: Image
    title1: string

    cta2: URL
    image2: Image
    title2: string
}

export interface Testimonial {
    author: string
    content: string
    id: number | string
}

export interface SectionTestimonials {
    image: Image
    title: string
    subtitle: string
    items: Testimonial[]
}

export interface HomePageContent {
    header: VideoHeroProps
    experienceBox: HomeFeaturesProps
    cta1: SectionCTA1
    missionBox: SectionCTA2
    cta3: SectionCTA3
    cta4: SectionCTA4
    testimonials: SectionTestimonials
}

export interface CustomerLogo {
    image: string,
    alt: string,
    href: string
}


export interface GiftCardFeature {
    id: number,
    language: string,
    title: string,
    description: string,
    image: string,
    alt: string,
    is_limitation: boolean
}

export interface GiftCard {
    id: number,
    title: string,
    backgroundColor: string,
    backgroundImage: string,
    backgroundAlt: string,
    text: string,
    maxDuration: number,
    minDuration: number,
    isNigthsNumberEditable: boolean,
    features: GiftCardFeature[],
    limitations: []
}

export interface UserProfile {
    newsletter: {
        subscription_status: boolean
    },
    personal_data: {
        name: string,
        email: string,
        telephone: string,
    }
}

export interface Reservation {
    id: string,
    cancellable: boolean,
    pet: boolean,
    tax: string,
    guests_numbers: number,
    extras: {
        meal_kit?: {
            id: number,
            days: number,
            title: string,
            people: number
        },
        guided_tour?: {
            id: number,
            date: string,
            time: string,
            title: string,
            people: number
        }
    },
    date_to: string,
    children: number,
    currency: string,
    date_from: string,
    attachments: [
        {
            id: number,
            type: string
        },
        {
            id: number,
            type: string
        }
    ],
    destination: {
        id: number,
        title: string,
        location: string
    },
    total_price: string,
    total_nights: 3
}


export type AvailabilityDate = {
    id: number | string
    date: Date,
    vacancy: boolean
    no_check_in: boolean
    no_check_out: boolean
    no_gift_card: boolean
}

export type THouse = {
    id: number,
    region: number,
    isNew: boolean,
    title: string,
    images: {
        alt: string,
        mobile: {
            src: string
        },
        desktop: {
            src: string
        }
    },
    location: string,
    isWWfOasis: boolean,
    availableTo: string,
    disabled?: boolean,
    info: {
        description: string,
        tag: string,
        dog_allowed: boolean,
        time_from_city: string,
        park_distance: number,
        min_price: number,
        time_from_where: string
    }
}

export type TMetaData = {
    _meta: {
        title: string,
        description: string
    }
}

export type TOrderIntent = {
    client_secret: string | null,
    error: string | null,
    cartIDs: string[]
}