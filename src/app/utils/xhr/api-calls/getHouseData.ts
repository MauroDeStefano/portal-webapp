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

    const locationDateRange = await _get(Endpoints.houses.availability(id, globalDateRange.start, globalDateRange.end), 'GET', {}, {}, 'no-store');

    data.availabilityRange = {
        min: locationDateRange.vacancy_range.open,
        max: locationDateRange.vacancy_range.close
    };

    data.availableDates = locationDateRange.days;

    return data;
}
