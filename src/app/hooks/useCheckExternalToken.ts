import {useEffect, useState} from "react";
import {getCookie, setCookie} from "cookies-next";
import {useSearchParams} from "next/navigation";

import {jsonCall} from "@/app/api-integration/api-call";
import {useApiErrorHandler} from "@/app/api-integration/hooks/useApiErrorHandler";

const tokenKey = process?.env?.NEXT_PUBLIC_EXTERNAL_TOKEN_KEY as string;

const endpoints = {
    check_consent: process?.env?.NEXT_PUBLIC_STARTUP_INTEGRATION_CHECK_CONSENT_FULL_URL_API as string,
    use_token: process?.env?.NEXT_PUBLIC_STARTUP_INTEGRATION_USE_TOKEN_FULL_URL_API as string,
    check_token_at_interval: process?.env?.NEXT_PUBLIC_STARTUP_INTEGRATION_CHECK_TOKEN_AT_INTERVAL_FULL_URL_API as string,
} as const

export const useCheckExternalToken = () => {
    const api = useApiErrorHandler(jsonCall);
    const params = useSearchParams()

    const token_param = params.get(tokenKey);
    const cookieValue = JSON.parse(getCookie(tokenKey) || '{}');

    const [tokenCookie, setTokenCookie] = useState<{
        token: string,
        consent: boolean,
        valid_token: boolean
    }>({
        token: cookieValue.token || '',
        consent: cookieValue.consent || false,
        valid_token: cookieValue.valid_token || false
    });

    const hasInvalidTokenStored = tokenCookie.token && !tokenCookie.valid_token;

    const [accepted, setAccepted] = useState(false);
    const [busy, setBusy] = useState(false);
    const [canAccept, setCanAccept] = useState(!hasInvalidTokenStored);
    const [displayPopup, setDisplayPopup] = useState(false);

    const checkTokenStatus = async (token: string) => {
        if (!token || busy) {
            return;
        }

        setBusy(true);

        const cookieValue = {
            ...tokenCookie,
            token,
        };

        try {
            const consent: {
                data: {
                    consent: boolean,
                    valid_token: boolean
                }
            } = await api.get(endpoints.check_consent.replace('%token%', token));

            cookieValue.consent = consent.data.consent;
            cookieValue.valid_token = consent.data.valid_token;

            if (!consent.data.valid_token) {
                throw new Error('Invalid token');
            }

            setDisplayPopup(!cookieValue.consent);
            setAccepted(cookieValue.consent)
        } catch (e: any) {
            cookieValue.token = '';
            cookieValue.valid_token = false;
            cookieValue.consent = false;

            setDisplayPopup(true);
            setCanAccept(false);
            setAccepted(false)
        } finally {
            setBusy(false);
        }

        setTokenCookie(cookieValue);
    }

    const checkTokenAtInterval = async () => {
        console.debug('🕒 Check Token At Interval');
        const token = tokenCookie.token;
        if (busy) {
            return;
        }

        setBusy(true);
        try {
            await api.get(endpoints.check_token_at_interval.replace('%token%', token));
        } catch (e: any) {
            setDisplayPopup(true);
            setCanAccept(false);
            setAccepted(false)
            setTokenCookie({
                token: '',
                consent: false,
                valid_token: false
            })
        } finally {
            setBusy(false);
        }
    }

    const acceptToken = async (token: string) => {
        if (busy || !token) {
            return;
        }

        setBusy(true);

        try {
            await api.get(endpoints.use_token.replace('%token%', token));
            setDisplayPopup(false);
            setAccepted(true);
            setTokenCookie({
                token,
                consent: true,
                valid_token: true
            })
        } catch (e: any) {
            setDisplayPopup(true);
            setCanAccept(false);
            setAccepted(false);
            setTokenCookie({
                token,
                consent: false,
                valid_token: false
            })
        } finally {
            setBusy(false);
        }
    }

    useEffect(() => {
        setCookie(tokenKey, JSON.stringify(tokenCookie));

        if (!tokenCookie.token || !tokenCookie.consent) {
            return;
        }

        const checkTokenInterval = setInterval(() => {
            checkTokenAtInterval()
        }, Number(process.env.NEXT_PUBLIC_EXTERNAL_TOKEN_CHECK_TIMEOUT_IN_SECONDS) * 1000);


        return () => {
            clearInterval(checkTokenInterval);
        }
    }, [tokenCookie]);

    useEffect(() => {
        if (token_param) {
            console.log('🎫 Token Check from Param');
            checkTokenStatus(token_param);
        } else if (tokenCookie.token) {
            if (!hasInvalidTokenStored) {
                checkTokenStatus(tokenCookie.token);
            } else {
                setDisplayPopup(true);
                setCanAccept(false);
                setAccepted(false);
            }
        }
    }, [])

    return {
        doAccept: () => acceptToken(tokenCookie.token),
        canAccept,
        displayPopup,
        accepted,
        busy,
    };
}
