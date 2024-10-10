'use client';

import { useIubenda } from '@mep-agency/next-iubenda';
import React from "react";
import {useTranslations} from "next-intl";

const ConsentAwareComponent = () => {
    const t_nav = useTranslations('Navigation');
    const {
        userPreferences, // The latest available user preferences data
        showCookiePolicy, // Displays the cookie policy popup
        openPreferences, // Opens the preferences panel
        showTcfVendors, // Opens the TCF vendors panel
        resetCookies, // Resets all cookies managed by Iubenda

        /*
         * The following exposed entries are meant for internal use only and should
         * not be used in your projects.
         */
        dispatchUserPreferences, // Update the user preferences data across the app
        i18nDictionary, // Contains the translations for the built-in components
    } = useIubenda();

    return (
        <li className="footer__legal-item">
            <button
                onClick={openPreferences}
                className="footer__legal-link text--12"
                >{t_nav('cookie')}</button>
        </li>
    );
};

export default ConsentAwareComponent;