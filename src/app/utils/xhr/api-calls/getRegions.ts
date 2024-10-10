import {getTranslations} from "next-intl/server";
import {_get} from "@/app/utils/xhr/_get";
import {Endpoints} from "@/endpoints";
import {Region} from "@/types";


export const getRegions = async (): Promise<Region[]> => {
    const t = await getTranslations('Regions');
    const regions = await _get(Endpoints.region_list);

    const filteredRegions = regions
        .map((r: { region: string, id: number }): Region => {
            return {
                label: r.region,
                value: r.id, //+ '-' + r.region.toLowerCase().replace(/\s+/g, '-'),
                disabled: false,
            };
        })
        .filter((r: any) => !!r.value)

    return  [{label: t('all'), value: 0, disabled: false}].concat(filteredRegions);

}

export const getRegionsForSitemap = async (): Promise<Region[]> => {
    const regions = await _get(Endpoints.region_list);

    return regions
        .map((r: { region: string, id: number }): Region => {
            return {
                label: r.region,
                value: r.id, //+ '-' + r.region.toLowerCase().replace(/\s+/g, '-'),
                disabled: false,
            };
        })
        .filter((r: any) => !!r.value)

}