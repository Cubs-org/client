export default function cleanStr(str: string) {
    // normalize string
    str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

    // Remove spaces
    str = str.replace(/\s+/g, '')

    // Remove special chars
    str = str.replace(/[^\w\s]/gi, '')

    return str.toLowerCase()
}