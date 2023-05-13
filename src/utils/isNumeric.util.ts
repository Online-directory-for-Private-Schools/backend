export default function isNumeric(num: string) {
    return Number(num) === 0 || Boolean(Number(num));
}
