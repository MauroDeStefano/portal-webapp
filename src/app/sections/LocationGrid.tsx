"use client";

import React from "react";
import { Link } from "@i18n/config";
import { useTranslations } from "next-intl";

import { useCheckAvailabilityForm } from "@/app/components/Forms/AvailabilityForm/hooks/useCheckAvailabilityForm";
import ImageBundle from "@/app/components/ImageBundle";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import NavigationLink from "@/app/components/NavigationLink";
import { useFrilandContext } from "@/app/contexts/FrilandContext";
import { locationSlug } from "@/app/utils/locationSlug";
import { TDateRangeString, THouse } from "@/types";
import { LocationIcon, ParkIcon, PetIcon } from "../components/Icons";

const sanitizeHtml = (html: string): string => {
  return html.replace(/<(?!\/?br\s*\/?)[^>]+>/gi, '');
};

const SafeHTML: React.FC<{ html: string }> = ({ html }) => {
  const sanitizedHtml = sanitizeHtml(html);
  return (
    <>
      {sanitizedHtml.split(/<br\s*\/?>/i).map((line, index) => (
        <React.Fragment key={index}>
          {line}
          {index < sanitizedHtml.split(/<br\s*\/?>/i).length - 1 && <br />}
        </React.Fragment>
      ))}
    </>
  );
};

export function LocationGridItem({
  id,
  isNew,
  images,
  title,
  dateRange,
  info,
  showDetails= true
}: THouse & {
  dateRange?: TDateRangeString | null;
  showDetails?: boolean;
}) {
  const href = locationSlug(id, title);
  const t = useTranslations("Destination");

  return (
    <div className="location-grid__location">
      <NavigationLink
        className="location-grid__location-link"
        href={{
          pathname: "/destination/[slug]",
          params: {
            slug: href,
          },
          query: { ...dateRange },
        }}
      />

      <div className="location-grid__location-image-wrapper">
        <ImageBundle
          className="location-grid__location-image"
          srcMobile={images.mobile.src}
          srcDesktop={images.desktop.src}
          alt={images.alt}
        />
        {isNew && <span className="location-grid__location-new">New!</span>}
      </div>

      <h3 className="location-grid__location-name text--18">{title}</h3>
      {showDetails && info && (
        <div className="location-grid__location-info">
          <div className="location-grid__location-tag">
            <img
              src={info?.tag}
              alt=""
              className="location-grid__location-tag-image"
            />
            <p className="location-grid__location-tag-text">
            <SafeHTML html={info.description || ''} />
            </p>
          </div>

          <div className="location-grid__location-tags">
            <div className="location-grid__location-icon-wrapper">
              <PetIcon className="location-grid__location-icon" />
              <p className="location-grid__location-info-text">
                {info?.dog_allowed
                  ? t("features.features_grid.info.pet_allowed")
                  : t("features.features_grid.info.pet_non_allowed")}
              </p>
            </div>
            <div className="location-grid__location-icon-wrapper">
              <LocationIcon className="location-grid__location-icon" />
              <p className="location-grid__location-info-text">
                {info?.time_from_city} {t("features.features_grid.info.location")} {info?.time_from_where}
              </p>
            </div>
            <div className="location-grid__location-icon-wrapper">
              <ParkIcon className="location-grid__location-icon" />
              <p className="location-grid__location-info-text">
                {t("features.features_grid.info.distance")} {info?.park_distance}
                {t("features.features_grid.info.m")}
              </p>
            </div>
          </div>

          <p className="location-grid__location-info-text price">
            {t("features.features_grid.info.min_price")}{" "}
            <span className="location-grid__location-info-bold ">
              {info?.min_price}€ / {t("features.features_grid.info.abb")}{" "}
            </span>
          </p>
        </div>
      )}

      {/*{logo && <img className="location-grid__location-logo" src={logo} alt=''/>}*/}
    </div>
  );
}

export function LocationGridNoEntries() {
  const t = useTranslations("Destinations");
  const { setActiveDateRange, activeRegion } = useFrilandContext(
    (state) => state
  );
  const {
    availableRegions,
    setRegion,
    setDateRange,
    handleSubmit,
    isRedirecting,
  } = useCheckAvailabilityForm();

  const reset = () => {
    setDateRange(null);
    setActiveDateRange(null);
    // handleSubmit();
  };

  return (
    <div className="location-grid">
      <div className="location-grid__container fl-container">
        <div className="location-grid__wrapper-not-found prose prose-2xl text-center text-balance mx-auto">
          {t.rich("not_found", {
            reset_button: (chunk) => {
              return (
                <Link
                  href={{
                    pathname: activeRegion?.value
                      ? "/destinations/[...slug]"
                      : "/destinations",
                    params: {
                      slug: activeRegion?.value
                        ? [locationSlug(activeRegion.value, activeRegion.label)]
                        : [],
                    },
                  }}
                  onClick={reset}
                  className={"underline"}
                >
                  {chunk}
                </Link>
              );
            },
          })}
        </div>
      </div>
    </div>
  );
}

export default function LocationGrid({
  houses,
  dateRange,
}: {
  houses: THouse[];
  dateRange?: TDateRangeString | null;
  moreInfo: boolean;
}) {
  const { isRedirecting } = useCheckAvailabilityForm();

  const enabledOnly = houses.filter(({ disabled }) => !disabled);

  if (enabledOnly.length === 0) {
    return <LocationGridNoEntries />;
  }

  if (isRedirecting) {
    return (
      <div className="text-center">
        <LoadingSpinner size="x-large" />
      </div>
    );
  }

  return (
    <div className="location-grid">
      <div className="location-grid__container fl-container">
        <div className="location-grid__wrapper">
          {enabledOnly.map((item: THouse) => (
            <LocationGridItem key={item.id} dateRange={dateRange} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}
