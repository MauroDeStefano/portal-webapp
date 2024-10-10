import {_get} from "@/app/utils/xhr/_get";
import {Endpoints} from "@/endpoints";
import {TDateRangeString} from "@/types";

export const getDateRange = async (): Promise<TDateRangeString> => {
    const dateRange = await _get(Endpoints.date_range);

    return {
        start: dateRange.open,
        end: dateRange.close,
    };
}

export const getDateRangeWithGiftCard = async (until: Date | string, cardID?: number | string) => {
    if (!cardID) {
        return [];
    }

    const dateRange = {
        "vacancy_range": {
            "close": "2025-10-02T00:00:00.000Z",
            "open": "2024-06-04T10:57:44.280Z"
        },
        "days": [
            {
                "id": "506",
                "date": "2024-06-04",
                "vacancy": true,
                "no_check_in": true,
                "no_check_out": false,
                "no_gift_card": false
            },
            {
                "id": "507",
                "date": "2024-06-05",
                "vacancy": true,
                "no_check_in": true,
                "no_check_out": false,
                "no_gift_card": true
            },
            {
                "id": "508",
                "date": "2024-06-06",
                "vacancy": true,
                "no_check_in": true,
                "no_check_out": false,
                "no_gift_card": true
            },
            {
                "id": "509",
                "date": "2024-06-07",
                "vacancy": true,
                "no_check_in": true,
                "no_check_out": false,
                "no_gift_card": false
            },
            {
                "id": "510",
                "date": "2024-06-08",
                "vacancy": true,
                "no_check_in": true,
                "no_check_out": false,
                "no_gift_card": false
            },
            {
                "id": "511",
                "date": "2024-06-09",
                "vacancy": true,
                "no_check_in": true,
                "no_check_out": false,
                "no_gift_card": false
            },
            {
                "id": "512",
                "date": "2024-06-10",
                "vacancy": true,
                "no_check_in": true,
                "no_check_out": false,
                "no_gift_card": false
            },
            {
                "id": "513",
                "date": "2024-06-11",
                "vacancy": true,
                "no_check_in": true,
                "no_check_out": false,
                "no_gift_card": false
            },
            {
                "id": "514",
                "date": "2024-06-12",
                "vacancy": true,
                "no_check_in": true,
                "no_check_out": false,
                "no_gift_card": false
            }
        ]
    };

    return dateRange?.days ?? []
};