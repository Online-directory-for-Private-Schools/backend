export default function checkTimeFormat(timeStr: string): boolean {
    const status = /^(2[0-3]|[0-1]?[\d]):[0-5][\d]$/.test(timeStr)
    return status;
}