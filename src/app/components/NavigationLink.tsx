'use client';

import {ComponentProps} from 'react';
import {Link, pathnames} from '@i18n/config';
import classNames from "classnames";
import {usePathname} from "next/navigation";

import LinkWithPreloader from "@/app/components/buttons/LinkWithPreloader";

export default function NavigationLink<
    Pathname extends keyof typeof pathnames
>({subPath, showSplash, className = '', ...rest}: {
    showSplash?: boolean;
    subPath?: string
} & ComponentProps<typeof Link<Pathname>>) {
    const selectedLayoutSegment = usePathname();
    const isActive = subPath ? selectedLayoutSegment.includes(subPath) : selectedLayoutSegment.includes(rest.href.toString());

    const wrapperClassNames = classNames({
        'selected': isActive,
    }, [
        className
    ])

    if (showSplash) {
        return (
            <LinkWithPreloader
                aria-current={isActive ? 'page' : undefined}
                className={`${wrapperClassNames} `}
                {...rest}
            />
        );
    }

    return (
        <Link
            aria-current={isActive ? 'page' : undefined}
            className={wrapperClassNames}
            {...rest}
        />
    );
}
