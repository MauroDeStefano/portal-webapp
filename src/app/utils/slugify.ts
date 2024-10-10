import {slug as slugMethod} from "@/app/utils/locationSlug";

export const slugify = (id: null | number | string, text: null | string) => {
    if (id || id === 0) {
        id = id.toString() + '-';
    }

    return id + (text ?? '')
        .toString()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '');
}

export const idFromSlug = (slug: string): number => {
    return parseInt(slug.split('-')[0], 10);
}

export const slugifiedNameFromSlug = (slug: string): string => {
    return slugMethod(decodeURI(slug.substring(slug.indexOf('-') + 1)));
}

export const slugFromParamsSlug = ({slug}: {
    slug?: string | string[]
}): string => {
    if (typeof slug === 'undefined') {
        return '';
    }

    if (typeof slug === 'string') {
        return slugifiedNameFromSlug(slug);
    }

    return slugifiedNameFromSlug(slug[0]);
}

export const idFromParamsSlug = ({slug}: {
    slug?: string | string[]
}): number => {
    if (typeof slug === 'undefined') {
        return 0;
    }

    if (typeof slug === 'string') {
        return idFromSlug(slug);
    }

    return idFromSlug(slug[0]);
}