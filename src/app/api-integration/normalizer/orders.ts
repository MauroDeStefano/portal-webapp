import {TUserOrder} from "@/types/user";


export function orders(serverData: []) {
    return serverData.map((order: any): TUserOrder => {
        return {
            id: order.id,
            pet: order.pet,
            tax: order.tax,
            guests_numbers: order.guests_numbers,
            extras: [], //order.extras,
            date_to: order.date_to,
            currency: order.currency,
            date_from: order.date_from,
            cancellable: order.cancellable,
            attachments: order.attachments,
            destination: order.destination,
            total_price: order.total_price,
            total_nights: order.total_nights,

        };
    });
}