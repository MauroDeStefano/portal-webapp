'use client'

import React, {RefObject, useEffect, useRef, useState} from "react";
import {CSSTransition} from 'react-transition-group';
import {useMeasure, useWindowScroll} from 'react-use';
import {usePathname} from "@i18n/config";
import classNames from "classnames";
import {useSearchParams} from "next/navigation";
import {useTranslations} from "next-intl";

import UserProfileHeaderMenu from "@/app/components/auth/UserProfileHeaderMenu";
import ButtonLabelIcon from "@/app/components/buttons/ButtonLabelIcon";
import CheckAvailabilityForm from "@/app/components/Forms/AvailabilityForm/CheckAvailabilityForm";
import {ROUTES_WITH_CONTRAST, ROUTES_WITHOUT_HEADER_SEARCH, ROUTES_WITHOUT_HERO} from "@/app/layout/config";
import DesktopLogo from "@/app/layout/header/DesktopLogo";
import DesktopNav from "@/app/layout/header/DesktopNav";
import SearchIcon from "@/assets/icons/search.svg";

function OpenAvailabilityCTA(props: { onClick: () => void }) {
    const t = useTranslations('SearchForm');

    return <div className="header-desktop__book-now">
        <ButtonLabelIcon
            decoration="border"
            icon={<SearchIcon/>}
            onClick={props.onClick}>{t('search_cta')}
        </ButtonLabelIcon>
    </div>;
}

export function HeaderDummy() {
    const pathname = usePathname();
    const hasHero = !ROUTES_WITHOUT_HERO.includes(pathname);

    if (hasHero) {
        return null;
    }
    return <>
        <div className="md:h-[118px]"/>
    </>;
}

export default function Header() {
    const [headerExpanded, setHeaderExpanded] = useState(false)
    const [headerIsStuck, setStickyHeader] = useState(false)

    const nodeRef = useRef(null);
    const searchFormRef = useRef(null);

    const [wrapperRef, {width: wrapperWidth, height: wrapperHeight}] = useMeasure();

    const pathname = usePathname();
    const searchParams = useSearchParams()

    const [isDestinations, setIsDestinations] = useState(false);

    const [headerIsHovered, setHeaderIsHovered] = useState(false);

    const {y} = useWindowScroll();

    if (y > 0 && !headerIsStuck) {
        setStickyHeader(true)
    } else if (y === 0 && headerIsStuck) {
        setStickyHeader(false)
    }

    const transitionDuration = 300;

    const hasHero = !ROUTES_WITHOUT_HERO.includes(pathname);
    const hasSearch = !ROUTES_WITHOUT_HEADER_SEARCH.includes(pathname);
    const hasContrast = ROUTES_WITH_CONTRAST.includes(pathname);

    const wrapperClassNames = classNames({
        'top-0 left-0 w-full z-50 max-lg:hidden': true,
        'header-desktop': true,
        'duration-300 ease-in-out transition': true,
        'fixed': true,
        'header-desktop--expanded': headerExpanded,
        'header-desktop--filled': (headerIsStuck || headerExpanded || headerIsHovered),
        'header-desktop--transparent': !hasHero && !headerIsHovered,
        'header-desktop--contrast': hasContrast
    });

    useEffect(() => {
        setHeaderExpanded(false);
        setStickyHeader(false);
    }, [pathname, searchParams])

    return (
        <>


            <div className={wrapperClassNames}
                 ref={wrapperRef as unknown as RefObject<HTMLDivElement>}>
                <div className="header-desktop__container fl-container"
                     onMouseEnter={() => setHeaderIsHovered(true)}
                     onMouseLeave={() => setHeaderIsHovered(false)}
                >
                    <div className="header-desktop__wrapper">
                        <DesktopNav/>

                        {headerIsStuck || headerIsHovered ? <DesktopLogo/> : <div/>}

                        <div className="header-desktop__actions mr-0">
                            {hasSearch &&
                                <OpenAvailabilityCTA onClick={() => setHeaderExpanded(!headerExpanded)}/>
                            }
                            <UserProfileHeaderMenu/>
                        </div>
                    </div>

                    {hasSearch &&
                        <CSSTransition
                            in={headerExpanded}
                            nodeRef={searchFormRef}
                            timeout={transitionDuration}
                            classNames="slide-in-out"
                            unmountOnExit
                        >
                            <div className="header-desktop__search" ref={searchFormRef}>
                                <CheckAvailabilityForm/>
                            </div>
                        </CSSTransition>
                    }
                </div>
            </div>

            <CSSTransition
                in={headerExpanded}
                nodeRef={nodeRef}
                timeout={transitionDuration}
                classNames="fade-in-out"
                unmountOnExit
            >
                <div className="header-desktop__overlay z-40"
                     ref={nodeRef}
                     onClick={() => setHeaderExpanded(false)}></div>
            </CSSTransition>
        </>
    );
};