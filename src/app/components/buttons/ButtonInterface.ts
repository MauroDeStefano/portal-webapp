import {ComponentProps, ElementType} from "react";
import {Link, pathnames} from "@i18n/config";

export type ButtonProps = {
    tagName?: 'button'
    type?: 'button' | 'submit' | 'reset'
} & ComponentProps<'button'>

export type A_href = {
    tagName: 'a'
} & ComponentProps<'a'>

export type LinkProps = {
    tagName: 'link';
    href: keyof typeof pathnames;
} & ComponentProps<typeof Link>


export function getTagName(tagName: string): ElementType {
    const Tag: Record<string, ElementType> = {
        button: 'button' as ElementType,
        a: 'a' as ElementType,
        link: Link
    };

    return Tag[tagName];
}