import {useTranslations} from "next-intl";

import {CheckMarkCircleIcon} from "@/app/components/Icons";

type TGenericFormSuccessProps = {
    title?: string;
    children?: React.ReactNode;
}

export default function GenericFormSuccess({
                                               title,
                                               children
                                           }: TGenericFormSuccessProps) {

    const t = useTranslations('Forms.generic');

    title = title || t('success.title');
    children = children || t('success.text');

    return (
        <>
            <div className="form-response-1">
                <div className="form-response-1__icon">
                    <CheckMarkCircleIcon/>
                </div>

                <h4 className="form-response-1__title display--54">{title}</h4>

                <div className="form-response-1__text display--24 mcb-0">
                    {children}
                </div>
            </div>
        </>
    );
}