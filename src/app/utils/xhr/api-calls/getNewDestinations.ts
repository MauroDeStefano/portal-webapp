import {_get} from "@/app/utils/xhr/_get";
import {Endpoints} from "@/endpoints";

export const getNewDestinations = async () => {
    return await _get(Endpoints.newDestinations);
}

