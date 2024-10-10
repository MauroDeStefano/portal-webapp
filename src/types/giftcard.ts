export type TGiftCardFeature = {
    id: number;
    language: string;
    title: string;
    description: string;
    image: string;
    alt: string;
    is_limitation: boolean;
}

export type TGiftCard = {
    id: number;
    title: string;
    backgroundColor: string;
    backgroundImage: string;
    backgroundAlt: string;
    text: string;
    maxDuration: number;
    minDuration: number;
    isNigthsNumberEditable: boolean;
    features: TGiftCardFeature[];
    limitations: [];

    totalPrice: number;
    taxes: number;
    discount: number;
    totalPriceDiscounted: number;
}

export type TGiftCardContent = {
    _meta: {
        title: string;
        description: string;
    },
    gifts: TGiftCard[];
}