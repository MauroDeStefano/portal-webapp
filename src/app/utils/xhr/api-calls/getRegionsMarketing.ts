import {_get} from "@/app/utils/xhr/_get";
import {Endpoints} from "@/endpoints";
import {Region} from "@/types";
import {TRegionMarketing} from "@/types/regionMarketing";

export const getRegionsMarketing = async (locale: string, region_id: number): Promise<TRegionMarketing> => {
    return await _get(Endpoints.regions_marketing(locale, region_id));
}