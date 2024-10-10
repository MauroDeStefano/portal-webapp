import {HouseType} from "@/app/[locale]/(static)/destination/[slug]/page";
import {_get} from "@/app/utils/xhr/_get";
import {getDateRange} from "@/app/utils/xhr/api";
import {Endpoints} from "@/endpoints";

export const getHouseData = async (id: number, locale: string): Promise<HouseType> => {
    const [
        data,
        globalDateRange
    ] = await Promise.all([
        _get(Endpoints.houses.single(id, locale)),
        getDateRange()
    ]);

    const locationDateRange = {
        "vacancy_range": {
            "open": "2024-06-04T07:11:16.352Z",
            "close": "2024-10-01"
        },
        "days": [
            {
                "id": "510",
                "date": "2024-06-08",
                "vacancy": false,
                "no_check_in": true,
                "no_check_out": false
            },
            {
                "id": "514",
                "date": "2024-06-12",
                "vacancy": false,
                "no_check_in": true,
                "no_check_out": false
            },
            {
                "id": "515",
                "date": "2024-06-13",
                "vacancy": false,
                "no_check_in": true,
                "no_check_out": false
            },
            {
                "id": "516",
                "date": "2024-06-14",
                "vacancy": false,
                "no_check_in": true,
                "no_check_out": false
            },
            {
                "id": "517",
                "date": "2024-06-15",
                "vacancy": false,
                "no_check_in": true,
                "no_check_out": false
            },
            {
                "id": "518",
                "date": "2024-06-16",
                "vacancy": false,
                "no_check_in": true,
                "no_check_out": false
            },
            {
                "id": "519",
                "date": "2024-06-17",
                "vacancy": false,
                "no_check_in": true,
                "no_check_out": false
            },
            {
                "id": "520",
                "date": "2024-06-18",
                "vacancy": false,
                "no_check_in": true,
                "no_check_out": false
            },
            {
                "id": "521",
                "date": "2024-06-19",
                "vacancy": false,
                "no_check_in": true,
                "no_check_out": false
            },
            {
                "id": "522",
                "date": "2024-06-20",
                "vacancy": false,
                "no_check_in": true,
                "no_check_out": false
            },
            {
                "id": "523",
                "date": "2024-06-21",
                "vacancy": false,
                "no_check_in": true,
                "no_check_out": false
            },
            {
                "id": "524",
                "date": "2024-06-22",
                "vacancy": false,
                "no_check_in": true,
                "no_check_out": false
            },
            {
                "id": "529",
                "date": "2024-06-27",
                "vacancy": false,
                "no_check_in": true,
                "no_check_out": false
            },
            {
                "id": "530",
                "date": "2024-06-28",
                "vacancy": false,
                "no_check_in": true,
                "no_check_out": false
            }
        ]
    }
    data.availableDates = locationDateRange.days;

    return data;
}
