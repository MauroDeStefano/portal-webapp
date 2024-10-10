import {jsonCall} from "@/app/api-integration/api-call";
import {useApiAuthCall} from "@/app/api-integration/hooks/useApiAuthCall";
import {useApiErrorHandler} from "@/app/api-integration/hooks/useApiErrorHandler";
import {Endpoints} from "@/endpoints";

export function useDeleteReservation() {
    const api = useApiErrorHandler(useApiAuthCall(jsonCall));

    return async (id: number): Promise<{
        message: string;
    }> => {
        const xhr = await api.delete(Endpoints.profile.deleteReservation(id))

        return xhr.data;
    };
}
