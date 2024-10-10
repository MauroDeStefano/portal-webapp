'use client'

import React, {useEffect, useState} from "react";
import {ChevronDownIcon} from "@storybook/icons";
import {useTranslations} from "next-intl";
import {sprintf} from "sprintf-js";

import {CheckMarkIcon} from "@/app/components/Icons";
import {useDateFormatter} from "@/app/hooks/useDateFormatter";

type Props = {
    title?: string,
    expiration_date?: string,
    children?: React.ReactNode,
    status?: 'active' | 'expired' | 'deactivated'
}

export default function GiftCardAccordion(props: Props) {
    const [status, setStatus] = useState('active');
    const [expanded, setExpanded] = useState(false);
    const t = useTranslations('MyGiftCards');

    const toggleExpanded = () => {
        setExpanded(!expanded);
    }

    useEffect(() => {
        setStatus(props?.status || 'active')
    }, []);

    const dateFormatter = useDateFormatter();

    return (
        <div className="card-1__gift-card-accordion">
            <div className="card-1__gift-card-accordion-trigger" aria-expanded={expanded} onClick={toggleExpanded}>
                <div className="card-1__gift-card-accordion-title">
                    <h2 className="card-1__title">
                        {props?.title}
                    </h2>


                    {status === 'active' &&
                        <div className="card-1__gift-card-accordion-status card-1__gift-card-accordion-status--active">
                            <div className="card-1__gift-card-accordion-status-icon">
                                <CheckMarkIcon/>
                            </div>
                            <div className="card-1__gift-card-accordion-status-label">
                                {t('active')} - {sprintf(t('expires'), '')}
                                {props?.expiration_date && dateFormatter(props?.expiration_date)}
                            </div>
                        </div>
                    }

                    {status === 'expired' &&
                        <div className="card-1__gift-card-accordion-status card-1__gift-card-accordion-status--expired">
                            <div className="card-1__gift-card-accordion-status-label">
                                {t('expired')}
                            </div>
                        </div>
                    }
                </div>

                <div className="card-1__gift-card-accordion-icon">
                    <ChevronDownIcon/>
                </div>
            </div>

            <div className="card-1__gift-card-accordion-content" aria-hidden={!expanded}>
                <div className="card-1__gift-card-accordion-content-container">
                    <div className="card-1__gift-card-accordion-content-wrapper">
                        {props?.children}
                    </div>
                </div>
            </div>
        </div>
    )
}