export function locationSlug(id: number | string, title: string) {
    return `${id}-${slug(title)}`;
}

export function slug(title: string) {
    return  replaceSpacesWithLine(removePunctuation(removeQuotes(removeParenthesis(removeTags(removeAccents(title)))))).toLowerCase().replace(/\s+/g, '-');
}

const removeAccents = (str:string):string  => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

const removeParenthesis = (str:string):string  => {
    return str.split('(')[0].trim();
}

const replaceSpacesWithLine = (str:string):string  => {
    return str.replace(/\s+/g, '-');
}

const removeQuotes = (str:string):string  => {
    return str.replace(/["']/g, "")
}

const  removePunctuation = (str:string):string  => {
    return str.replace(/[.,?!:;]/g, "");
}
const removeTags = (str:string):string => {
    return str.replace(/(<([^>]+)>)/ig, '');
}