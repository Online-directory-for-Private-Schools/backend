export default function checkIfNumericOrUndefined(num: number | undefined) {
    if (num === undefined) {
        return true;
    }

    return Boolean(Number(num));
}
