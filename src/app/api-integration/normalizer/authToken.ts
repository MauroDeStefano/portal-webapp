import {TAuthToken} from "@/types/auth";

export function authToken({accessToken, refreshToken}: any): TAuthToken {
    return {
        created_at: new Date(),
        access: accessToken,
        refresh: refreshToken,
    }
}