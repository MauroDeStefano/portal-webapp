export type THouseBookingDay = {
    dayId: string | number,
    dayDate: string,
    season_rank: number,
    dayOfTheWeek: string,
    priceId: string | number,
    priceEur: number
}

export type THouseBookingData = {
    totalPrice: number;
    days: THouseBookingDay[];
    taxes: number;
    discount: number;
    totalPriceDiscounted: number;
    pet_price: number;
    has_pet: boolean;
    extra_for_pet: boolean;
    night_count: number;
    discountGiftCards: number
}

export type THousePriceInDateRange = {
    houseID: number,
    days: []
    discount: number
    has_pet: boolean
    taxes: number
    totalPrice: number;
    totalPriceDiscounted: number;
    usedGifts: []
}

export function housePriceInDateRange(data: any): THousePriceInDateRange {
    return {
        houseID: data.houseID,
        days: data.days,// [],
        discount: data.discount,// 0,
        has_pet: !!data.dog,// 0,
        taxes: data.taxes,// 0,
        totalPrice: data.totalPrice,// 0,
        totalPriceDiscounted: data.totalPriceDiscounted,// 0,
        usedGifts: data.usedGifts,// [],
    }
}

function houseBookingDataDay(day: any): THouseBookingDay {
    return {
        dayId: day.dayId,
        dayDate: day.dayDate,
        season_rank: day.season_rank,
        dayOfTheWeek: day.dayOfTheWeek,
        priceId: day.priceId,
        priceEur: day.priceEur
    }
}

export function houseBookingData(data: any): THouseBookingData {
    return {
        totalPrice: data.totalPrice,
        days: data.days.map(houseBookingDataDay),
        night_count: data.days.length,
        taxes: data.taxes,
        discount: data.discount,
        totalPriceDiscounted: data.totalPriceDiscounted,
        pet_price: data.dog,
        has_pet: data.dog > 0,
        extra_for_pet: data.extra_for_pet || false,
        discountGiftCards: data.discountGiftCards || 0,
    };
}