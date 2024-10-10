"use client"
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import ImageBundle from "../components/ImageBundle";
import { getDestinationsImages } from "../utils/xhr/api-calls/mocks/getDestinations";

export default function SectionWithNatureRetreat() {
    const [imageUrl, setImageUrl] = useState<string | undefined>();
    const t = useTranslations("NatureRetreat");
    
    useEffect(() => {
        const fetchData = async () => {
            await getDestinationsImages().then((data) => {
                return setImageUrl(data?.nature?.imgDesktop);
            })
        };

        fetchData();
    }, []); 
    if (!imageUrl) {
        return null; 
    }

    return (
        <section className="nature-retreat">
            <div className="nature-retreat__container fl-container">
                <div className="nature-retreat__text">
                    <p className="nature-retreat__text-1">{t("text_one")}</p>
                    <p className="nature-retreat__text-2">{t.rich("text_two")}</p>
                </div>
                <div className="nature-retreat__image-wrapper">
                    <ImageBundle
                        className="nature-retreat__image"
                        srcMobile={imageUrl}
                        srcDesktop={imageUrl}
                        alt="Nature Retreat"
                    />
                </div>
            </div>
        </section>
    );
}