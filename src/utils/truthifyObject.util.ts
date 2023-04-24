export default function filterObjectFromFalsyValues(object: any) {
    const newObject: any = {};
    Object.keys(object).forEach((key) => {
        if (object[key]) {
            newObject[key] = object[key];
        }
    });
    return newObject;
};
