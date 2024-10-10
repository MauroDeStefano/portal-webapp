import {housesInRegion} from "@/app/api-integration/normalizer/housesInRegion";
import {_get} from "@/app/utils/xhr/_get";
import {Endpoints} from "@/endpoints";
import {TDateRangeString} from "@/types";

export const getHousesInRegion = async ({region, locale, dateRange = null}: {
    region: string | number,
    locale: string,
    dateRange?: null | TDateRangeString
}) => {
    const items = await _get(Endpoints.houses.in_region({region, locale}));

    let vacancy = [];

    if (dateRange) {
        vacancy = await _get(Endpoints.houses.vacant_in_region(dateRange.start, dateRange.end, region));
    }

    return housesInRegion(items, vacancy);
}