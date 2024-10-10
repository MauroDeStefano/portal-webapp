import deepmerge from 'deepmerge';
import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';

import {locales} from '@/../locales/config';

// @ts-ignore
export default getRequestConfig(async ({locale}) => {
    if (!locales.includes(locale as any)) notFound();

    const en = (await import(`../locales/en.json`)).default;

    if (locale === 'en') {
        return {
            messages: en
        };
    }

    return {
        messages: deepmerge(en, (await import(`../locales/${locale}.json`)).default)
    };
});