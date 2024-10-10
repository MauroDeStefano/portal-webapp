'use client'

import React from "react";
import classNames from "classnames";

import NavigationLink from "@/app/components/NavigationLink";
import {useFrilandContext} from "@/app/contexts/FrilandContext";
import {slugify} from "@/app/utils/slugify";

type TRegionSubmenuProps = {
    wrapperClassName: string;
    childClassName: string;
    linkClassName: string;
}

export default function RegionsSubmenu({
                                           wrapperClassName,
                                           childClassName,
                                           linkClassName,
                                       }: TRegionSubmenuProps) {
    const {
        availableRegions,
    } = useFrilandContext((state) => state);

    return (
        <ul className={wrapperClassName}>
            {availableRegions.slice(1).map((item, index) => (
                    <li
                        key={index}
                        className={classNames([
                            childClassName,
                        ])}>

                        <NavigationLink
                            className={classNames([
                                linkClassName,
                            ])}
                            showSplash={false}
                            // onClick={() => {
                            //     setActiveRegion(item);
                            // }}
                            href={{
                                pathname: '/regions/[...slug]',
                                params: {
                                    slug: [slugify(item.value, item.label)]
                                }
                            }}
                            subPath={slugify(item.value, item.label)}
                        >{item.label}</NavigationLink>
                    </li>
            ))}
        </ul>

    )
}