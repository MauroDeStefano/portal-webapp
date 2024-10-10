// @ts-nocheck
import {useRef} from "react";

export const useThrottle = () => {
    const throttleSeed = useRef(null);

    const throttleFunction = useRef((func, delay = 200) => {
        if (!throttleSeed.current) {
            func();
            throttleSeed.current = setTimeout(() => {
                throttleSeed.current = null;
            }, delay);
        }
    });

    return throttleFunction.current;
};

export const useDebounce = () => {
    const debounceSeed = useRef(null);

    const debounceFunction = useRef((func, timeout = 200) => {
        if (debounceSeed.current) {
            clearTimeout(debounceSeed.current);
            debounceSeed.current = null;
        }

        debounceSeed.current = setTimeout(() => {
            func();
        }, timeout);
    });

    return debounceFunction.current;
};