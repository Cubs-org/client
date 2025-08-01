export function formatToDateInput(prev: string) {
    const date = new Date(prev),
        ten = (i) => (i < 10 ? '0' : '') + i,
        YYYY = date.getFullYear(),
        MTH = ten(date.getMonth() + 1),
        DAY = ten(date.getDate()),
        HH = ten(date.getHours()),
        MM = ten(date.getMinutes()),
        SS = ten(date.getSeconds())
    // MS = ten(date.getMilliseconds())

    return `${YYYY}-${MTH}-${DAY}T${HH}:${MM}:${SS}`
}
