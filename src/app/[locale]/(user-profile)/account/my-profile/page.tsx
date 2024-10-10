import React from "react";
import {getTranslations} from "next-intl/server";

import UpdatePasswordSection from "@/app/[locale]/(user-profile)/account/my-profile/components/UpdatePasswordSection";
import UserDetails from "@/app/[locale]/(user-profile)/account/my-profile/components/UserDetails";
import PersonalAreaFrame from "@/app/[locale]/(user-profile)/components/PersonalAreaFrame";

import NewsletterPreferences from "./components/NewsletterPreferences";

export default async function MyProfilePage({params: {locale}}: {
    params: { locale: string };
}) {
    const t = await getTranslations('Account');

    return (
        <PersonalAreaFrame title={t('my_profile')}>
            <UserDetails/>
            <NewsletterPreferences/>
            <UpdatePasswordSection/>
        </PersonalAreaFrame>
    )
}