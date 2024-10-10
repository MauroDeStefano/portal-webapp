export const getDestinations = async (locale: string) => {

    return {
        slides: [
            {
                url: "/images/placeholder.jpg",
                urlMobile: "/images/placeholder.jpg",
                alt: "test",
                name: "test",
            },
            {
                url: "/images/placeholder-2.jpg",
                urlMobile: "/images/placeholder-2.jpg",
                alt: "test",
                name: "test",
            },
            {
                url: "/images/partners.jpg",
                urlMobile: "/images/partners.jpg",
                alt: "test",
                name: "test",
            },
        ]
    }
}

export const getDestinationsImages = async () => {

    return {
        nature:
        {
            alt: "nature",
            imgDesktop:
                "https://contenuti.s3.eu-north-1.amazonaws.com/homepage/desktop/stanza_nella_natura.jpeg",
            imgMobile:
                "https://contenuti.s3.eu-north-1.amazonaws.com/homepage/mobile/stanza_nella_natura.jpeg",
        },
    }
}