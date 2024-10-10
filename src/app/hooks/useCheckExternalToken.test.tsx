import {act, renderHook} from "@testing-library/react";
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest'

import {jsonCall} from "@/app/api-integration/api-call";
import {useCheckExternalToken} from "@/app/hooks/useCheckExternalToken";

const tokenKey = process?.env?.NEXT_PUBLIC_EXTERNAL_TOKEN_KEY as string;

const endpoints = {
    check_consent: process?.env?.NEXT_PUBLIC_STARTUP_INTEGRATION_CHECK_CONSENT_FULL_URL_API as string,
    use_token: process?.env?.NEXT_PUBLIC_STARTUP_INTEGRATION_USE_TOKEN_FULL_URL_API as string,
    check_token_at_interval: process?.env?.NEXT_PUBLIC_STARTUP_INTEGRATION_CHECK_TOKEN_AT_INTERVAL_FULL_URL_API as string,
} as const

const mocks = vi.hoisted(() => {
    return {
        useSearchParams: {
            get: vi.fn(),
        },
        cookies: {
            deleteCookie: vi.fn(),
            getCookie: vi.fn(),
            setCookie: vi.fn(),
        },
        axios: {
            get: vi.fn(),
            post: vi.fn(),
        }
    }
})

vi.mock("next/navigation", () => {
    const actual = vi.importActual("next/navigation");
    return {
        ...actual,
        useSearchParams: vi.fn(() => mocks.useSearchParams),
    };
});

vi.mock('cookies-next', () => mocks.cookies);

vi.mock('axios', async (importActual) => {
    const actual = await importActual<typeof import ('axios')>();

    return {
        default: {
            ...actual.default,
            create: vi.fn(() => ({
                ...actual.default.create(),
                get: mocks.axios.get,
                post: mocks.axios.post,
            })),
        },
    };
});

beforeEach(() => {
    vi.useFakeTimers();
});

afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks()
})

///////////////////////////////////////////////////////////////

describe('No cookie, no params = no popup, no API call', () => {
    beforeEach(() => {
        mocks.useSearchParams.get.mockReturnValue(null);
        mocks.cookies.getCookie.mockReturnValue(null);
    })

    it('External API is not called, no popup is displayed', async () => {
        const apiSpy = vi.spyOn(jsonCall, 'get');

        const {result} = await act(async () => renderHook(useCheckExternalToken));

        await act(() => result.current.doAccept())

        expect(apiSpy).toHaveBeenCalledTimes(0);

        expect(result.current.accepted).toBe(false);
        expect(result.current.displayPopup).toBe(false);
    });
});


describe('Has token in search params', () => {
    it('Has valid token in param, will call the `check_consent` endpoint, nothing in cookie, display closable popup', async () => {
        mocks.useSearchParams.get.mockReturnValue(123);

        mocks.axios.get.mockResolvedValue({
            data: {
                consent: false,
                valid_token: true
            }
        });

        const apiSpy = vi.spyOn(jsonCall, 'get');
        const cookieSpy = vi.spyOn(mocks.cookies, 'setCookie');

        const {result} = await act(async () => renderHook(useCheckExternalToken));

        expect(apiSpy).toHaveBeenCalledTimes(1)
        expect(apiSpy).toHaveBeenCalledWith(endpoints.check_consent.replace('%token%', '123'))

        expect(result.current.displayPopup).toBe(true);
        expect(result.current.canAccept).toBe(true);

        expect(result.current.accepted).toBe(false);

        expect(cookieSpy).toHaveBeenCalled();
    });

    it('Has valid token in param, previously not consented, user consent it, hide popup', async () => {
        mocks.useSearchParams.get.mockReturnValue(123);
        mocks.axios.get.mockResolvedValue({
            data: {
                consent: false,
                valid_token: true
            }
        });

        const {result} = await act(async () => renderHook(useCheckExternalToken));

        mocks.axios.get.mockResolvedValue({
            data: {"id": 5, "start_time": 1726418583352, "end_time": 1726418747034}
        });

        const apiSpy = vi.spyOn(jsonCall, 'get');
        const cookieSpy = vi.spyOn(mocks.cookies, 'setCookie');

        await act(async () => result.current.doAccept())

        expect(apiSpy).toHaveBeenCalledWith(endpoints.use_token.replace('%token%', '123'))

        expect(result.current.displayPopup).toBe(false);
        expect(result.current.accepted).toBe(true);

        expect(cookieSpy).toHaveBeenCalledTimes(1);
    });


    it('Has invalid token in params, display popup, cannot accept/hide it', async () => {
        mocks.useSearchParams.get.mockReturnValue(123);
        mocks.axios.get.mockRejectedValue({
            data: {
                consent: false,
                valid_token: false
            }
        });

        const apiSpy = vi.spyOn(jsonCall, 'get');
        const cookieSpy = vi.spyOn(mocks.cookies, 'setCookie');

        const {result} = await act(async () => renderHook(useCheckExternalToken));

        expect(apiSpy).toHaveBeenCalledTimes(1)
        expect(result.current.displayPopup).toBe(true);
        expect(result.current.accepted).toBe(false);
        expect(result.current.canAccept).toBe(false);
        expect(cookieSpy).toHaveBeenCalled();
    });


    it('Has valid token in param, previously consented, do not display popup', async () => {
        mocks.useSearchParams.get.mockReturnValue(123);

        mocks.axios.get.mockResolvedValue({
            data: {
                consent: true,
                valid_token: true
            }
        });

        const apiSpy = vi.spyOn(jsonCall, 'get');
        const cookieSpy = vi.spyOn(mocks.cookies, 'setCookie');

        const {result} = await act(async () => renderHook(useCheckExternalToken));

        expect(apiSpy).toHaveBeenCalledTimes(1)

        expect(result.current.displayPopup).toBe(false);
        expect(result.current.accepted).toBe(true);

        expect(cookieSpy).toHaveBeenCalled();
    });
});


describe('Has no token in search params, has token in cookie', () => {
    beforeEach(() => {
        mocks.useSearchParams.get.mockReturnValue(null);
    })

    it('Previously NOT consented, display popup & consent', async () => {
        mocks.cookies.getCookie.mockReturnValue('{ "token": "321", "consent": false, "valid_token": true }');

        mocks.axios.get.mockResolvedValue({
            data: {
                consent: false,
                valid_token: true
            }
        });

        const apiSpy = vi.spyOn(jsonCall, 'get');

        const {result} = await act(async () => renderHook(useCheckExternalToken));

        expect(apiSpy).toHaveBeenCalledWith(endpoints.check_consent.replace('%token%', '321'));
        expect(apiSpy).toHaveBeenCalledTimes(1)
        expect(result.current.displayPopup).toBe(true);

        const apiSpy2 = vi.spyOn(jsonCall, 'get');
        await act(async () => result.current.doAccept())

        expect(apiSpy2).toHaveBeenCalledWith(endpoints.use_token.replace('%token%', '321'));
        expect(apiSpy2).toHaveBeenCalledTimes(1)

        expect(result.current.accepted).toBe(true);
        expect(result.current.displayPopup).toBe(false);
    });

    it('Accept Fails, display non-dismissible popup ', async () => {
        mocks.cookies.getCookie.mockReturnValue('{ "token": "321", "consent": false, "valid_token": true }');

        mocks.axios.get.mockResolvedValue({
            data: {
                consent: false,
                valid_token: true
            }
        });

        const {result} = await act(async () => renderHook(useCheckExternalToken));

        mocks.axios.get.mockRejectedValue({});
        await act(async () => result.current.doAccept())

        expect(result.current.accepted).toBe(false);
        expect(result.current.displayPopup).toBe(true);
        expect(result.current.canAccept).toBe(false);
    });

    it('Previously consented, popup not visible', async () => {
        mocks.cookies.getCookie.mockReturnValue('{ "token": "321", "consent": true, "valid_token": true }');

        mocks.axios.get.mockResolvedValue({
            data: {
                consent: true,
                valid_token: true
            }
        });

        const {result} = await act(async () => renderHook(useCheckExternalToken));

        expect(result.current.accepted).toBe(true);
        expect(result.current.displayPopup).toBe(false);
    });

    it('Revalidate at interval, still valid', async () => {
        mocks.cookies.getCookie.mockReturnValue('{ "token": "321", "consent": true, "valid_token": true }');

        mocks.axios.get.mockResolvedValue({
            data: {
                consent: true,
                valid_token: true
            }
        });

        const {result} = await act(async () => renderHook(useCheckExternalToken));

        const apiSpy = vi.spyOn(jsonCall, 'get');

        await act(async () => vi.advanceTimersByTime(Number(process.env.NEXT_PUBLIC_EXTERNAL_TOKEN_CHECK_TIMEOUT_IN_SECONDS) * 1000));

        expect(apiSpy).toHaveBeenCalledWith(endpoints.check_token_at_interval.replace('%token%', '321'));

        expect(apiSpy).toHaveBeenCalledTimes(1)
        expect(result.current.accepted).toBe(true);
        expect(result.current.displayPopup).toBe(false);
    });

    it('Revalidate at interval, invalid', async () => {
        mocks.cookies.getCookie.mockReturnValue('{ "token": "321", "consent": true, "valid_token": true }');

        mocks.axios.get.mockResolvedValue({
            data: {
                consent: true,
                valid_token: true
            }
        });

        const {result} = await act(async () => renderHook(useCheckExternalToken));

        mocks.axios.get.mockRejectedValue({});

        const apiSpy = vi.spyOn(jsonCall, 'get');

        await act(async () => vi.advanceTimersByTime(Number(process.env.NEXT_PUBLIC_EXTERNAL_TOKEN_CHECK_TIMEOUT_IN_SECONDS) * 1000));

        expect(apiSpy).toHaveBeenCalledWith(endpoints.check_token_at_interval.replace('%token%', '321'));

        expect(result.current.displayPopup).toBe(true);
        expect(result.current.accepted).toBe(false);
        expect(result.current.canAccept).toBe(false);
    });

    it('has invalid token in cookie, display popup, cannot accept', async () => {
        mocks.cookies.getCookie.mockReturnValue('{ "token": "321", "consent": true, "valid_token": false }');

        const apiSpy = vi.spyOn(jsonCall, 'post');

        const {result} = await act(async () => renderHook(useCheckExternalToken));

        expect(apiSpy).toHaveBeenCalledTimes(0)

        expect(result.current.accepted).toBe(false);
        expect(result.current.displayPopup).toBe(true);
        expect(result.current.canAccept).toBe(false);
    });
});