import {defaultLocale, locales, pathnames} from '@i18n/config';
import {cookies} from 'next/headers'
import {NextRequest, NextResponse} from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';

import {getUserEmailWithTokenLight} from "@/app/api-integration/user-preferences";
import {refreshTokenWithToken} from "@/app/api-integration/user-session";
import {LONG_SESSION_IN_SECONDS, SESSION_COOKIE_NAME, SHORT_SESSION_IN_SECONDS} from "@/config";
import {AuthCookie} from "@/types/auth";

const intlMiddleware = createIntlMiddleware({
    locales,
    defaultLocale,
    pathnames,
    localeDetection: false
});


export default async function middleware(request: NextRequest) {
    const {pathname} = request.nextUrl;
    const excludePattern = "^(/(" + locales.join("|") + "))?/account/?.*?$";
    const publicPathnameRegex = RegExp(excludePattern, "i");
    const isPublicPage = !publicPathnameRegex.test(request.nextUrl.pathname);
    const path_starts_with_locale = () => new RegExp(`^/(${locales.join('|')})(/.*)?$`).test(request.nextUrl.pathname);
    const shouldHandle = pathname === '/' || path_starts_with_locale();

    if (request.nextUrl.pathname.startsWith('/api/') || request.nextUrl.pathname.endsWith('.css') || request.nextUrl.pathname.endsWith('.map')) {
        return;
    }

    if (!shouldHandle) {
        return
    }

    // Store current request url in a custom header, which you can read later
    if (isPublicPage) {
        // Apply Next-Intl middleware for public pages
        const response = intlMiddleware(request);
        const siteDomain = process.env.SITE_DOMAIN;
        const url = siteDomain + request.nextUrl.pathname;
        response.headers.set('x-url', url);
        return response;
    } else {
        // Apply Next-Auth middleware for private pages
        return (authMiddleware as any)(request);
    }

}

const authMiddleware = async (request: NextRequest) => {
    const isLoggedIn = async () => {
        const cookie = cookies().get(SESSION_COOKIE_NAME)?.value;

        if (!cookie) {
            return false;
        }

        const cookieParsed: AuthCookie = JSON.parse(cookie);

        if (!cookieParsed?.token?.access) {
            return false;
        }

        let userEmail;

        try {
            userEmail = await getUserEmailWithTokenLight(cookieParsed.token.access);
        } catch (e) {
            try {
                // 1. refresh token
                const newToken = await refreshTokenWithToken(cookieParsed.token.refresh);

                // 2. save new token to cookie
                cookies().set(SESSION_COOKIE_NAME, JSON.stringify({
                    token: newToken,
                    remember_me: cookieParsed?.remember_me
                }), {
                    maxAge: cookieParsed?.remember_me ? LONG_SESSION_IN_SECONDS : SHORT_SESSION_IN_SECONDS
                });

                // 3. retry getUserDetailsWithToken
                userEmail = await getUserEmailWithTokenLight(newToken.access);
            } catch (e) {
                return false;
            }
        }

        return !!userEmail;
    }

    if (await isLoggedIn()) {
        return intlMiddleware(request);
    } else {
        console.log('not logged in, return');
        return NextResponse.redirect(new URL('/', request.url));
    }
}

