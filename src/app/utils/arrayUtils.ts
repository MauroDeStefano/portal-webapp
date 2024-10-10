// @ts-ignore
export const groupBy = (key: string | number) => (array: any[]) =>
    array.reduce((objectsByKeyValue: any, obj: any) => {
        const value = obj[key];
        objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
        const objectsByKeyValueAsArray: never[] = [];
        for (const property in objectsByKeyValue) {
            // @ts-ignore
            objectsByKeyValueAsArray[property] = objectsByKeyValue[property];
        }
        return objectsByKeyValueAsArray;
    }, {});