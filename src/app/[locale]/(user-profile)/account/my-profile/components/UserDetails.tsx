'use client';

import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useTranslations} from "next-intl";
import {useLocale} from "use-intl";

import {useGetUserDetails, useUpdateUserDetails} from "@/app/api-integration/user-preferences";
import OneButtonToRuleThemAll from "@/app/components/buttons/OneButtonToRuleThemAll";
import Card, {CardHeader} from "@/app/components/Card";
import DescriptionList2, {DescriptionList2Item} from "@/app/components/DescriptionList2";
import {RhfTextField} from "@/app/components/Forms/TextField";
import {useAuthContext} from "@/app/contexts/AuthContext";
import {useFrilandContext} from "@/app/contexts/FrilandContext";
import {TUserDetailsFormSchema, userDetailsValidator} from "@/app/serverActions/validators/userDetails";
import ArrowForward from "@/assets/icons/arrow-forward.svg";

type UserDetailsProps = {}

function UserDetailsEditor({
                               onUpdate
                           }: {
    onUpdate?: (message: string) => void
}) {
    const {user, updateUserProfileData,} = useFrilandContext((state) => state);
    const locale = useLocale();
    const t_frm = useTranslations('Forms.generic');
    const t_btn = useTranslations('Forms.buttons');

    const schema = userDetailsValidator({
        required_name: t_frm('fields.name.errors.required'),
        required_surname: t_frm('fields.surname.errors.required'),
        required_email: t_frm('fields.email.errors.required'),
        required_phone: t_frm('fields.phone.errors.too_short'),
    });

    const updateUserDetails = useUpdateUserDetails();
    const getUserDetails = useGetUserDetails();

    const {
        control,
        handleSubmit,
        formState: {errors, isSubmitting, isDirty},
        setError
    } = useForm<TUserDetailsFormSchema>({
        resolver: zodResolver(schema),

        defaultValues: {
            name: user?.name,
            surname: user?.surname,
            email: user?.email,
            phone: user?.phone,
        }
    });

    const action: () => void = handleSubmit(async (data) => {
        try {
            const response = await updateUserDetails({...data, locale})
            const details = await getUserDetails();
            updateUserProfileData(details);
            onUpdate?.(response.message);
        } catch (e: any) {
            setError('root.server_error', {message: e.message});
        }
    });

    return (
        <form
            action={action}
            className='account-data-form-1'
        >
            <div className="account-data-form-1__fields-grid">
                <div className="account-data-form-1__form-field half-width">
                    <RhfTextField
                        name='name'
                        control={control}
                        rules={{required: true}}
                        disabled={isSubmitting}
                        placeholder={t_frm('fields.name.label')}
                        autoComplete='given-name'
                    />
                </div>

                <div className="account-data-form-1__form-field half-width">
                    <RhfTextField
                        name='surname'
                        control={control}
                        rules={{required: true}}
                        disabled={isSubmitting}
                        placeholder={t_frm('fields.surname.label')}
                        autoComplete='family-name'
                    />
                </div>

                <div className="account-data-form-1__form-field">
                    <RhfTextField
                        name='email'
                        control={control}
                        type="email"
                        autoComplete='email'
                        rules={{required: true}}
                        disabled={isSubmitting}
                        placeholder={t_frm('fields.email.label')}
                    />
                </div>

                <div className="account-data-form-1__form-field">
                    <RhfTextField
                        name='phone'
                        control={control}
                        type="tel"
                        autoComplete="tel"
                        rules={{required: true}}
                        disabled={isSubmitting}
                        placeholder={t_frm('fields.phone.label')}
                    />
                </div>
            </div>

            {
                errors?.root?.server_error?.message &&
                <div
                    className="my-4 italic text-base p-4 border border-solid border-b-red-800 rounded-2xl bg-red-100">
                    {errors?.root?.server_error?.message}
                </div>
            }

            <div className="account-data-form-1__form-submit">
                <OneButtonToRuleThemAll
                    background='icon'
                    type='submit'
                    iconAlign='right'
                    icon={<ArrowForward/>}
                    isBusy={isSubmitting}
                    disabled={!isDirty || isSubmitting}
                >{isSubmitting ? t_btn('updating') : t_btn('update')}</OneButtonToRuleThemAll>
            </div>
        </form>
    );
}

function UserDetailsDisplay() {
    const {
        user
    } = useFrilandContext((state) => state);

    const t = useTranslations('Forms.generic');

    return (
        <DescriptionList2>
            <DescriptionList2Item
                title={t('fields.name.label')}>
                {user?.name} {user?.surname}
            </DescriptionList2Item>

            <DescriptionList2Item
                title={t('fields.email.label')}>
                {user?.email}
            </DescriptionList2Item>

            <DescriptionList2Item
                title={t('fields.phone.label')}>
                {user?.phone}
            </DescriptionList2Item>
        </DescriptionList2>
    );
}

export default function UserDetails(props: UserDetailsProps) {

    const [userDetailsEditActive, setUserDetailsEditActive] = useState(false);
    const [savedMessage, setSavedMessage] = useState<string | null>(null);

    const t = useTranslations('Profile');
    const tA = useTranslations('Account');

    return (
        <Card>
            <CardHeader title={tA('my_profile')}>
                <button
                    onClick={() => setUserDetailsEditActive(!userDetailsEditActive)}
                    className="card-1__header-action-link">
                    {!userDetailsEditActive ? t('label_modify') : t('label_cancel')}
                </button>
            </CardHeader>

            {savedMessage &&
                <div
                    onClick={() => setSavedMessage(null)}
                    className="my-4 italic text-base p-4 border border-solid border-b-green-800 rounded-2xl bg-green-100">
                    {savedMessage}
                </div>
            }

            {userDetailsEditActive ?
                <UserDetailsEditor onUpdate={(message: string) => {
                    setUserDetailsEditActive(false);
                    setSavedMessage(message);
                }}/> :
                <UserDetailsDisplay/>
            }
        </Card>
    )
};