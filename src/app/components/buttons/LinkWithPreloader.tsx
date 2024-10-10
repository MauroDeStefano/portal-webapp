import React, {ComponentProps, useRef} from "react";
import {Link, pathnames} from "@i18n/config";

import LoadingSpinner from "@/app/components/LoadingSpinner";
import {useFrilandContext} from "@/app/contexts/FrilandContext";

function Indicator() {
    return <span className='absolute right-0 top-1/2 -translate-y-2/4'><LoadingSpinner/></span>;
}

export default function LinkWithPreloader<Pathname extends keyof typeof pathnames>({
                                                                                       children,
                                                                                       inject = 'sibling',
                                                                                       ...props
                                                                                   }: {
    children?: React.ReactNode,
    inject?: 'sibling' | 'child',
} & ComponentProps<typeof Link<Pathname>>) {
    const {
        busyEl,
        setBusyEl
    } = useFrilandContext((state) => state);
    const ref = useRef(null);

    return (
        <>
            <Link
                {...props}
                ref={ref}
                onClick={(e) => {
                    setBusyEl(ref.current);
                    props.onClick && props.onClick(e);
                }}>
                {children}
                {ref.current && busyEl === ref.current && inject === 'child' && <Indicator/>}
            </Link>

            {ref.current && busyEl === ref.current && inject === 'sibling' && <Indicator/>}
        </>
    );
};