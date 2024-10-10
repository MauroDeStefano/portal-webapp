'use client';

import React, {ReactNode} from "react";
import {Link} from "@i18n/config";
import {NextIntlClientProvider} from "next-intl";
import {AbstractIntlMessages} from "use-intl";


export const FrilandIntlContextProvider = ({
                                               locale,
                                               messages,
                                               children
                                           }: {
    children: ReactNode,
    messages: AbstractIntlMessages,
    locale: string
}) => {
    console.debug('⌛Fri.land Intl Init');
    return (
        <NextIntlClientProvider
            defaultTranslationValues={{
                privacy_link: (chunks) => (<Link href="/privacy" className={'bold underline'}>{chunks}</Link>),
                tos_link: (chunks) => (<Link href="/terms-of-use" className={'bold underline'}>{chunks}</Link>),
                important: (chunks) => <span className='underline'>{chunks}</span>,
                b: (chunks) => <strong>{chunks}</strong>,
                u: (chunks) => <span className='underline'>{chunks}</span>,
            }}
            timeZone='Europe/Rome'
            locale={locale}
            messages={messages}>
            {children}
        </NextIntlClientProvider>
    );
};