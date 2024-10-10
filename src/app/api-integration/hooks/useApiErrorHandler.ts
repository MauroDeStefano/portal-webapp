import {useEffect} from "react";
import {AxiosInstance} from "axios";

export const useApiErrorHandler = (instance: AxiosInstance) => {
    useEffect(() => {
        const errorHandler = instance.interceptors.response.use((response) => {
            if (response.status >= 400) {
                throw new Error((response.data?.message || response.data?.error || 'Generic API error'));
            }

            return response;
        })

        return () => {
            instance.interceptors.response.eject(errorHandler);
        }
    }, []);

    return instance;
}