import {Endpoints} from "@/endpoints";

export async function subscribeToNewsletter({
                                                email: mail
                                            }: {
    email: string;
}) {
    const xhr = await fetch(Endpoints.newsletter.subscribe, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            mail
        })
    });

    const json = await xhr.json();

    if (!xhr.ok) {
        if (xhr.status >= 400) {
            throw new Error('api profile: ' + (json?.message || json?.error || 'Generic error'));
        }
    }

    return {
        message: json.message
    }
}