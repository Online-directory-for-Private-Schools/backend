export default function isNumeric(num: string) {
    return !isNaN(+num) && !isNaN(parseFloat(num));
}
