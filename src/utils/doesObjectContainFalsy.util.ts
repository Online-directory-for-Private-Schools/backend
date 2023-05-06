export default function doesObjectContainFalsy(obj: any) {
    return Object.values(obj).some(value => !value)
}