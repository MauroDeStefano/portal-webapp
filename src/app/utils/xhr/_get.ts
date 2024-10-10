export const _get = async (endpoint: string, method = 'GET', body = {}, headers = {}, cache?: string) => {
    const xhrOptions: Record<string, any> = {
        method,
        // cache: 'no-store',
        headers: Object.assign({'Content-Type': 'application/json'}, headers),
        body: JSON.stringify(body),
        cache: cache
    };

    if (method === 'GET') {
        delete xhrOptions.body;
    }

    try {
        console.debug('fetching', endpoint);
        const xhr = await fetch(endpoint, xhrOptions);
        const json = await xhr.json();
        if (!xhr.ok) {
            if (xhr.status >= 400) {
                console.error(endpoint);
                throw new Error('api: ' + (json?.message || json?.error || 'Generic error'));
            }
        }

        return json;
    } catch (e: any) {
        throw new Error(e.message);
    }
}

export const _post = async (endpoint: string, body = {}, headers = {}) => {
    return _get(endpoint, 'POST', body, headers);
}
