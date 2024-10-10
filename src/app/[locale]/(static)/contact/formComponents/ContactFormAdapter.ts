interface ContactFormData {
    name: string;
    surname: string;
    email: string;
    reasons_for_contact: string;
    message: string,
    describe_location: string,
    location: string,
    city: string,
    phone: string,
    subscribe_to_newsletter: boolean,
    terms: string
}


export function ContactFormAdapter(data: ContactFormData) {
    return {
        form_page: "contact-us",
        first_name: data.name,
        last_name: data.surname,
        mail: data.email,
        html: formatHtml(data),
        phone_number: data.phone,
        is_newsletter: data.subscribe_to_newsletter
    }
}

function formatHtml(data: ContactFormData) {
    let htmlString = '';
    for (const [key, value] of Object.entries(data)) {
        htmlString += `<b>${key}</b> ${value}<br />`;
    }
    return htmlString;
}