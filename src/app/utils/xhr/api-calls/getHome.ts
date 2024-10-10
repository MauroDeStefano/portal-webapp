import {_get} from "@/app/utils/xhr/_get";
import {Endpoints} from "@/endpoints";

export const getHome = async (locale: string) => {
    return await _get(Endpoints.home(locale));
}