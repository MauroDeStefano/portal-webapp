'use client'

import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useTranslations} from "next-intl";

import {useGetUserDetails, useNewsletterOptIn} from "@/app/api-integration/user-preferences";
import OneButtonToRuleThemAll from "@/app/components/buttons/OneButtonToRuleThemAll";
import Card, {CardHeader} from "@/app/components/Card";
import {RfhFormError} from "@/app/components/Forms/FormError";
import {RadioRfh} from "@/app/components/Forms/Radio";
import {CheckMarkCircleIcon, DeleteCircled} from "@/app/components/Icons";
import {useAuthContext} from "@/app/contexts/AuthContext";
import {useFrilandContext} from "@/app/contexts/FrilandContext";
import {newsletterValidator, TNewsletterFormSchema} from "@/app/serverActions/validators/newsletter";
import ArrowForward from "@/assets/icons/arrow-forward.svg";
import {UserProfile} from "@/types";

type Props = {
    data?: UserProfile
    headers?: any
}

function NewsletterPreferencesEditor({onUpdate}: {
    onUpdate?: (isSubscribed: boolean) => void
}) {
    const t = useTranslations('Forms.user_profile');
    const t_btn = useTranslations('Forms.buttons');

    const {user, updateUserProfileData} = useFrilandContext((state) => state);

    const newsletterOptIn = useNewsletterOptIn();
    const getUserDetails = useGetUserDetails();

    const schema = newsletterValidator();

    const {
        control,
        handleSubmit,
        formState: {errors, isSubmitting, isDirty},
        setError
    } = useForm<TNewsletterFormSchema>({
        resolver: zodResolver(schema),
        mode: "onChange",
        defaultValues: {
            status: user?.preferences.newsletter_subscription ? 'true' : 'false',
        }
    });

    const action: () => void = handleSubmit(async (data) => {
        try {
            const isSubscribed = await newsletterOptIn(data)
            const details = await getUserDetails();

            updateUserProfileData(details);

            onUpdate?.(isSubscribed);
        } catch (e: any) {
            setError('root.server_error', {message: e.message});
        }
    });

    return (
        <form
            className="newsletter-form-1__form"
            action={action}
        >
            <div className="newsletter-form-1__options">
                <RadioRfh
                    name='status'
                    control={control}
                    options={[
                        {value: 'true', label: t('fields.newsletter.label_on')},
                        {value: 'false', label: t('fields.newsletter.label_off')},
                    ]}/>
            </div>

            <RfhFormError errors={errors?.root?.server_error?.message}/>

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

function NewsletterStatus() {
    const t = useTranslations('Profile');

    const {user, updateUserProfileData} = useFrilandContext((state) => state);

    const status = user?.preferences.newsletter_subscription;

    return (
        <div className="newsletter-form-1__state">
            <div className="newsletter-form-1__state-icon">
                {status ? <CheckMarkCircleIcon/> : <DeleteCircled/>}
            </div>

            <div className="newsletter-form-1__state-label">
                <span>
                    {status ? t('newsletter.label_on') : t('newsletter.label_off')}
                </span>
            </div>
        </div>
    );
}


export default function NewsletterContent(props: Props) {
    const {user, updateUserProfileData, session, token} = useFrilandContext((state) => state);
    const t = useTranslations('Profile');
    const tA = useTranslations('Account');

    const [editorActive, setEditorActive] = useState(false);

    return (
        <Card>

            <CardHeader title={tA('my_newsletter')}>
                <button
                    onClick={() => setEditorActive(!editorActive)}
                    className="card-1__header-action-link">
                    {!editorActive ? t('label_modify') : t('label_cancel')}
                </button>
            </CardHeader>

            {!editorActive ?
                <NewsletterStatus/> :
                <NewsletterPreferencesEditor onUpdate={() => setEditorActive(false)}/>}
        </Card>
    )
}