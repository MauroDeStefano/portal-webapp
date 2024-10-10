'use client';
import React, {useEffect} from "react";
import {usePathname,} from "@i18n/config";
import classNames from "classnames";
import {useSearchParams} from "next/navigation";

import {useBusyContext} from "@/app/contexts/BusyContext";
import FrilandRoundLogo from "@/assets/icons/friland-round-logo.svg";

type Props = {};
export default function LoadingScreen(props: Props) {
    const {isBusy, setIsBusy} = useBusyContext((state) => state);

    const pathname = usePathname()
    const searchParams = useSearchParams()

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        setIsBusy(false)
    }, [pathname, searchParams]);

    const wrapperClassNames = classNames({
        'fixed': true,
        'z-[9999999]': true,
        'inset-0': true,
        'bg-white': true,
        'text-[#38695b]': true,
        'flex': true,
        'justify-center': true,
        'content-center': true,
        'bg-gradient-to-b': true,
        'from-white': true,
        'to-slate-100': true,
        'will-fade-out-and-gone': true,
        'and-gone': !isBusy,
    });
    return (
        <div
            className={wrapperClassNames}>
            <FrilandRoundLogo className='w-80 h-auto'/>
        </div>
    );
};