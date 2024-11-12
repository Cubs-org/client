export function getMonthNameByNumber(monthNumber: number): string {
    const date = new Date()
    date.setMonth(monthNumber - 1)

    return date.toLocaleString('pt-br', {
        month: 'long',
    })
}

export function getMonthNameByDate(date: Date): string {
    return date.toLocaleString('pt-br', { month: 'long' })
}
