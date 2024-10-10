export const getCompaniesServices = async (locale: string) => {
    return {
        emblaSlides: [
            {
                url: "https://contenuti.s3.amazonaws.com/paginaaziende/desktop/esperienzadivalore.jpeg",
                urlMobile:
                    "https://contenuti.s3.amazonaws.com/paginaaziende/mobile/esperienzadivalore.jpeg",
                alt: "ragazza che suona uno strumento nella natura",
                name: "ragazza che suona uno strumento nella natura",
            },
            {
                url: "https://contenuti.s3.amazonaws.com/paginaaziende/desktop/esperienzadivalore2.jpeg",
                urlMobile:
                    "https://contenuti.s3.amazonaws.com/paginaaziende/mobile/esperienzadivalore2.jpeg",
                alt: "ragazza spensierata nel verde",
                name: "ragazza spensierata nel verde",
            },
            {
                url: "https://contenuti.s3.amazonaws.com/paginaaziende/desktop/esperienzadivalore3.jpeg",
                urlMobile:
                    "https://contenuti.s3.amazonaws.com/paginaaziende/mobile/esperienzadivalore3.jpeg",
                alt: "coppia rilassata nella natura",
                name: "coppia rilassata nella natura",
            },
        ],
        underSlide: {
            imgDesktop:
                "https://contenuti.s3.amazonaws.com/paginaaziende/desktop/empoweryourself.jpeg",
            imgMobile:
                "https://contenuti.s3.amazonaws.com/paginaaziende/desktop/empoweryourself.jpeg",
        },
        imgBoxes: [
            {
                id: "1",
                mainCtaHref: "/contact",
                otherCtaHref: "/contact",
                imgDesktop:
                    "https://contenuti.s3.amazonaws.com/paginaaziende/desktop/crescitaterritoriale.jpeg",
                imgMobile:
                    "https://contenuti.s3.amazonaws.com/paginaaziende/mobile/crescitaterritoriale.jpeg",
            },
            {
                id: "2",
                mainCtaHref: "/contact",
                otherCtaHref: "/contact",
                imgDesktop:
                    "https://contenuti.s3.amazonaws.com/paginaaziende/desktop/empoweryourself.jpeg",
                imgMobile:
                    "https://contenuti.s3.amazonaws.com/paginaaziende/mobile/empoweryourself.jpeg",
            },
            {
                id: "3",
                mainCtaHref: "/contact",
                otherCtaHref: "/contact",
                imgDesktop:
                    "https://contenuti.s3.amazonaws.com/paginaaziende/desktop/growingtogether.jpeg",
                imgMobile:
                    "https://contenuti.s3.amazonaws.com/paginaaziende/mobile/growingtogether.jpeg",
            },
        ],
        customers: [],
    };
};
