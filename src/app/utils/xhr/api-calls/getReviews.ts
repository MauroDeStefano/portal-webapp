import {_get} from "@/app/utils/xhr/_get";
import {Endpoints} from "@/endpoints";

export const getReviews = async (locale: string, houseId: number) => {
    return await _get(Endpoints.reviews(houseId, locale));
}