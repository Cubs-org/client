export const splitDt = (date: any) => {
    let year, month, day
    year = date.getFullYear()
    month = date.getMonth() + 1
    day = date.getDate()
    return [year, month, day]
}
