import {getTranslations} from "next-intl/server";

import CreatePasswordForm, {
    TPasswordRecoveryVariant
} from "@/app/[locale]/(static)/create-password/formComponents/CreatePasswordForm";
import SubHeaderRoundLogo from "@/app/layout/subheader/RoundLogo";


export default async function CreatePassword({
                                                 params: {locale},
                                                 searchParams: {unique_id, action = 'new'}
                                             }: {
    params: { locale: string },
    searchParams: {
        unique_id: string,
        action: TPasswordRecoveryVariant
    }
}) {
    const t = await getTranslations('Forms.create_password');

    return (
        <div className="new-password">
            <div className="new-password__container fl-container">
                <div className="new-password__wrapper">
                    <div className="new-password__logo">
                        <SubHeaderRoundLogo/>
                    </div>

                    <h1 className="new-password__form-title display--34">
                        {action === 'new' ? t('first_time') : t('reset')}
                    </h1>

                    <CreatePasswordForm
                        action={action}
                        unique_id={unique_id}/>
                </div>
            </div>
        </div>
    )
}