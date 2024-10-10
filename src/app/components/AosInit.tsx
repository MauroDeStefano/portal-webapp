'use client';

import {useEffect, useRef} from "react";
import Aos from "aos";

import {useDebounce} from "@/app/hooks/useThrottle";

import 'aos/dist/aos.css';

export default function AosInit() {
    const aosInit = useRef(false);
    const debounce = useDebounce();

    useEffect(() => {
        if (!aosInit.current) {
            aosInit.current = true;

            Aos.init({
                duration: 800,
                once: false,
                delay: 0
            })
        }
        debounce(() => Aos.refresh(), 500);
    }, [])

    return <></>
}