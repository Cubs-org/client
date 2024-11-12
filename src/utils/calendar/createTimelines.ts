import isSunday from '../datetime/isSunday'
import isDateInRange from './isDateInRange'
import rangeDifferenceBetweenDates from './rangeDifferenceBetweenDays'

export function createTimelines(items: any, data: any) {
    let _items = items as any[]

    for (let k = 0; k < _items.length; k++) {
        let properties,
            item = _items[k]
        let timeline = [] as any

        properties = item.properties

        // const start = (properties.date.start).split(' ')[0];
        // const end = (properties.date.end).split(' ')[0];
        const datetimeProperty = properties.find(
            (p: any) => p.type === 'datetime'
        ).data
        const [start, end] = [
            datetimeProperty.start.split('T')[0],
            datetimeProperty.end.split('T')[0],
        ]

        if (start && end) {
            for (let i = 0; i < data.length; i++) {
                const week = data[i]

                for (let j = 0; j < week.length; j++) {
                    const day = week[j]

                    if (
                        isDateInRange(day, start, end) &&
                        (isSunday(day) || start.split(' ')[0] === day)
                    ) {
                        // Calcula a hierarchy com base nas tarefas que começam depois no mesmo dia
                        const hierarchy = calculateHierarchy(_items, k, day)
                        if (hierarchy >= 3 && end.split(' ')[0] !== day) {
                            let dt = new Date(day)

                            dt.setDate(dt.getDate() + 1)

                            let _day = dt.toISOString().split('T')[0]

                            let newHierarchy = calculateHierarchy(
                                _items,
                                k,
                                _day
                            )

                            timeline.push({
                                day: _day,
                                range: rangeDifferenceBetweenDates({
                                    initialDate: day,
                                    finalDate: end.split(' ')[0],
                                }),
                                hierarchy: newHierarchy,
                            })
                        }

                        timeline.push({
                            day,
                            range: rangeDifferenceBetweenDates({
                                initialDate: day,
                                finalDate: end.split(' ')[0],
                            }),
                            hierarchy,
                        })
                    }
                }
            }
        }

        _items[k].timeline = timeline
    }
}

// Função auxiliar para calcular a hierarchy
function calculateHierarchy(
    items: any[],
    currentIndex: number,
    currentDay: string
) {
    let hierarchy = 1

    for (let i = 0; i < items.length; i++) {
        if (i !== currentIndex) {
            const item = items[currentIndex]
            const otherItem = items[i]
            const otherItemProperties = otherItem.properties
            const itemProperties = item.properties

            // datetimePropertyFromCurrentItem
            const dpfci = itemProperties.find(
                    (p: any) => p.type === 'datetime'
                ).data,
                startfc = dpfci.start

            // datetimePropertyFromOtherItem
            const dpfoi = otherItemProperties.find(
                    (p: any) => p.type === 'datetime'
                ).data,
                startfo = dpfoi.start

            // Verifica se o outro item começou antes e está no mesmo dia
            if (
                startfo.split(' ')[0] < startfc.split(' ')[0] &&
                isDateInRange(
                    currentDay,
                    startfo.split(' ')[0],
                    dpfoi.end.split(' ')[0]
                )
            ) {
                hierarchy++
            } else if (
                startfo.split(' ')[0] === startfc.split(' ')[0] &&
                isDateInRange(
                    currentDay,
                    startfo.split(' ')[0],
                    dpfoi.end.split(' ')[0]
                )
            ) {
                // Verifica se o outro item começou no mesmo dia
                new Date(otherItem.createdAt) < new Date(item.createdAt)
                    ? hierarchy++
                    : hierarchy
            }
        }
    }

    return hierarchy
}
