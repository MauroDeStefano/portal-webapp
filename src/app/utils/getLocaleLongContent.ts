import fm from 'front-matter';
import {readFileSync} from "fs";
import {fileURLToPath} from "node:url";
import {dirname, resolve} from "path";

export const getLocaleLongContent = (path: string) => {
    const modulePath = dirname(fileURLToPath(import.meta.url))
    return readFileSync(resolve(modulePath, `../../../locales/content/${path}`), 'utf-8');
}

export const getLocaleLongContentWithMeta = (path: string) => {
    const data = getLocaleLongContent(path);

    return fm(data);
}