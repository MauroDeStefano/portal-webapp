import {_get} from "@/app/utils/xhr/_get";
import {Endpoints} from "@/endpoints";
import {TMostClickedLocation} from "@/types/mostClickedtLocation";

export const getMostClickedLocations = async (): Promise<TMostClickedLocation[]> => {
    return await _get(Endpoints.mostClickedLocations);
}