export default function filterObjectFromFalsyValues(object: any) {
    const newObject: any = {};
    Object.keys(object).forEach((key) => {
        if (![undefined, null, NaN].includes(object[key])) {
            newObject[key] = object[key];
        }
    });
    return newObject;
};
