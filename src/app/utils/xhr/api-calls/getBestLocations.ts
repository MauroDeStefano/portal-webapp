import {_get} from "@/app/utils/xhr/_get";
import {Endpoints} from "@/endpoints";
import {TBestLocation, TBestLocations} from "@/types/bestLocation";

export const getBestLocations = async (locale: string): Promise<TBestLocations> => {
    return await _get(Endpoints.bestLocations(locale));
}