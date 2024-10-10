import {TMetaData} from "@/types";

export function parseMetaResponse({_meta}: any): TMetaData {
    if (!_meta) {
        return {} as TMetaData;
    }

    return {_meta};
}