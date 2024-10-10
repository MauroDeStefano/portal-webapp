'use client';

import React from "react";
import {getPathname, localesWithLabels, usePathname} from "@i18n/config";
import classNames from "classnames";
import {useParams} from "next/navigation";
import {useLocale} from "use-intl";

import {useUpdateLanguage} from "@/app/api-integration/user-preferences";
import {useFrilandContext} from "@/app/contexts/FrilandContext";


function useGetTranslationURL() {
    const pathname = usePathname();
    const params = useParams();

    // @ts-ignore
    return (locale: string) => `/${locale}/` + getPathname({locale, href: {pathname, params}})
}

export function MobileLanguagePicker() {
    const currentLocale = useLocale();
    const {token} = useFrilandContext((state) => state);
    const updateLanguage = useUpdateLanguage();
    const getPath = useGetTranslationURL()

    return (
        <ul className="header-mobile__language-list">
            {Object.values(localesWithLabels).map((locale) => {
                return (
                    <li className="header-mobile__language-item" key={locale.key}>
                        <button onClick={(e) => {
                            token && updateLanguage(locale.key);
                            window.location.href = getPath(locale.key);
                        }}
                                role="button"
                                type='button'
                                className={classNames({
                                    'button-2 header-mobile__language-button': true,
                                    'button-2--active': currentLocale === locale.key,
                                })}
                                title={locale.label}
                        >
                            <span className="button-2__label text--13">{locale.short}</span>
                        </button>
                    </li>
                );
            })}
        </ul>
    );
}


export function FooterLanguagePicker() {
    const currentLocale = useLocale();
    const {token} = useFrilandContext((state) => state);
    const updateLanguage = useUpdateLanguage();

    const getPath = useGetTranslationURL()

    return (
        <ul className="footer__language-list">
            {Object.values(localesWithLabels).map((locale) => {
                return (
                    <li className="footer__language-item" key={locale.key}>
                        <button
                            onClick={(e) => {
                                token && updateLanguage(locale.key);
                                window.location.href = getPath(locale.key);
                            }}
                            type='button'
                            role="button"
                            className={classNames({
                                'button-2 footer__language-button': true,
                                'button-2--active': currentLocale === locale.key,
                            })}
                            title={locale.label}
                        ><span className="button-2__label text--13">{locale.short}</span>
                        </button>
                    </li>
                );
            })}
        </ul>
    );
}