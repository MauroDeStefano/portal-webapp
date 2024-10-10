import React from "react";
import classNames from "classnames";

import {A_href, ButtonProps, getTagName, LinkProps} from "@/app/components/buttons/ButtonInterface";
import LoadingSpinner from "@/app/components/LoadingSpinner";

import css from './OneButtonToRuleThemAll.module.css'

type Props = {
    icon?: null | React.ReactNode;
    iconAlign?: 'left' | 'right' | 'top' | 'bottom';
    iconOutline?: boolean;

    children?: React.ReactNode | string;
    className?: string;
    hoverEffect?: 'scale' | 'scale-icon' | 'none' | 'background';
    hasBorder?: boolean;
    hasShadow?: boolean;
    background?: 'element' | 'icon' | 'none';
    isBusy?: boolean;
    noPadding?: boolean;
    labelClass?: string;
} & (ButtonProps | A_href | LinkProps);

export default function OneButtonToRuleThemAll({
                                                   tagName = 'button',
                                                   children,
                                                   icon = null,
                                                   iconAlign = 'left',
                                                   iconOutline = false,
                                                   noPadding = false,

                                                   className = '',
                                                   hoverEffect = 'scale',
                                                   hasBorder = false,
                                                   hasShadow = false,
                                                   background = 'element',
                                                   isBusy = false,
                                                   labelClass = '',
                                                   ...props
                                               }: Props) {
    const Tag = getTagName(tagName);

    if (tagName === 'button') {
        // @ts-ignore
        props.type = props.type || 'button';

        if (isBusy) {
            // @ts-ignore
            props.disabled = true;
        }
    }

    const tagClassNames = classNames({
        [css['has-label']]: !!children,
        [css['has-border']]: hasBorder,
        [css['has-shadow']]: hasShadow,
        [css.backgroundOnEl]: background === 'element',
        [css.backgroundOnIcon]: background === 'icon',
        [css.noBackground]: background === 'none',
        [css.iconOutline]: iconOutline,
        [css['no-padding']]: noPadding,
    }, [
        css.button,
        css[`hover-${hoverEffect}`],
        icon ? css[`has-icon-align-${iconAlign}`] : css.noIcon,
    ]);

    return (
        <Tag
            className={`${tagClassNames} ${className}`}
            {...props}>

            {!children ? null : <span className={labelClass ? labelClass : css.label}>{children}</span>}

            {icon && !isBusy && <span className={css.icon}>{icon}</span>}

            {isBusy && <span className={css.icon}><LoadingSpinner/></span>}
        </Tag>
    );
};