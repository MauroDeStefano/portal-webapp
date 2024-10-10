import {parseMetaResponse} from "@/app/api-integration/normalizer/parseMetaResponse";
import {THouse, TMetaData} from "@/types";

export function housesInRegion(
    serverData: any,
    vacancy: {
        house: number,
        show: boolean
    }[]): TMetaData & { houses: THouse[] } {

    return {
        ...parseMetaResponse(serverData),
        houses: serverData.destinations.map((house: THouse) => {
            const houseVacancy = vacancy.find((v) => v.house === house.id);

            return {
                ...house,
                disabled: !(houseVacancy?.show ?? true)
            }
        })
    };
}