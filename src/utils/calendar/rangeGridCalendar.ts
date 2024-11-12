import { CalendarProps } from '../../types/calendar'

function dayLimit(day: number) {
    if (day > 31) return 31
    if (day < 1) return 1

    return day
}

export default function rangeGridCalendar({ year, month }: any) {
    const grid: string[][] = []

    for (let i = 0; i < 6; i++) {
        grid.push([])
    }

    const firstDay = new Date(year, month - 1, 1)
    const firstDayWeekday = firstDay.getDay()

    const prevMonth = month === 1 ? 12 : month - 1
    const prevYear = month === 1 ? year - 1 : year
    const prevMonthDays = new Date(prevYear, prevMonth, 0).getDate()

    const totalDays = getMonthDays({ year, month }) || 0
    let day = 1
    let row = 0

    for (let i = 1; row < 6; i++) {
        const col = (i - 1) % 7

        if (i <= firstDayWeekday) {
            const prevMonthDay = prevMonthDays - (firstDayWeekday - i)
            grid[row][col] = String(
                formatDate({
                    year: prevYear,
                    month: prevMonth,
                    day: dayLimit(prevMonthDay),
                })
            )
        } else if (day <= totalDays) {
            grid[row][col] = String(formatDate({ year, month, day }))
            day++
        } else {
            grid[row][col] = String(
                formatDate({
                    year: nextYear({ year, month }),
                    month: nextMonth(month),
                    day: dayLimit(day - totalDays),
                })
            )
            day++
        }

        if (i % 7 === 0) {
            row++
        }
    }

    return grid
}

const formatDate = ({ year, month, day }: CalendarProps) =>
    day && month && `${year}-${formatNumber(month)}-${formatNumber(day)}`
const formatNumber = (num: number) => num.toString().padStart(2, '0')
const getMonthDays = ({ year, month }: CalendarProps) =>
    year && month && new Date(year, month, 0).getDate()
const nextMonth = (month: number) => (month === 12 ? 1 : month + 1)
const nextYear = ({ year, month }: CalendarProps): number =>
    month && year ? (month === 12 ? year + 1 : year) : 0

const year = new Date().getFullYear()
const month = new Date().getMonth() + 1
const day = new Date().getDate()
export const today = formatDate({ year, month, day })
