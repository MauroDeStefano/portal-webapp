import React from "react";
import {useTranslations} from "next-intl";

import {CheckMarkCircleIcon} from "@/app/components/Icons";
import {useAuthDrawers} from "@/app/hooks/useAuthDrawers";

export function CreatePasswordFormSuccess() {
    const t = useTranslations('Contact');
    const authDrawers = useAuthDrawers();

    return (
        <div className="new-password__form-sent">
            <div className="form-response-1">
                <div className="form-response-1__icon">
                    <CheckMarkCircleIcon/>
                </div>

                <h2 className='form-response-1__title display--54'>{t('create_password_success.title')}</h2>

                <div
                    className="form-response-1__text display--24 mcb-0">
                    {
                        t.rich('create_password_success.text', {
                            auth_button: (chunks) => (
                                <button type={'button'}
                                        onClick={() => authDrawers.login()}
                                        className={'bold underline'}>{chunks}</button>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}
