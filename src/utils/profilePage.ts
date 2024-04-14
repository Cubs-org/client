const padDate = (date: number) => String(date).padStart(2, '0');

const formatDate = (date: string) => {
    const d = new Date(date.concat("T03:00:00.000Z"));
    return `${padDate(d.getDate())}/${padDate(d.getMonth() + 1)}/${d.getFullYear()}`
}

const formatUserName = (name: string) => {
    return name.length > 16 ? `${name.slice(0, 16)}...` : name
}

export { formatDate, formatUserName, padDate };