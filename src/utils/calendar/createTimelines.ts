import isSunday from "../datetime/isSunday";
import isDateInRange from "./isDateInRange";
import rangeDifferenceBetweenDates from "./rangeDifferenceBetweenDays";

export function addTimelinesInItems(items: any, data: any) {
    let _items = items as any[];

    for (let k = 0; k < _items.length; k++) {
        let properties, item = _items[k];
        let timeline = [] as any;

        properties = item.properties;
        const start = (properties.date.start).split(' ')[0];
        const end = (properties.date.end).split(' ')[0];

        if (start && end) {
            for (let i = 0; i < data.length; i++) {
                const week = data[i];

                for (let j = 0; j < week.length; j++) {
                    const day = week[j];

                    if (
                        isDateInRange(day, start, end)
                        && (isSunday(day) || start === day)
                    ) {
                        // Calcula a hierarchy com base nas tarefas que começam depois no mesmo dia
                        const hierarchy = calculateHierarchy(_items, k, day);

                        timeline.push({
                            day,
                            range: rangeDifferenceBetweenDates({ initialDate: day, finalDate: end }),
                            hierarchy
                        });
                    }
                }
            }
        }

        _items[k].timeline = timeline;
    }
}

// Função auxiliar para calcular a hierarchy
function calculateHierarchy(items: any[], currentIndex: number, currentDay: string) {
    let hierarchy = 1;

    for (let i = 0; i < items.length; i++) {
        if (i !== currentIndex) {
            const item = items[currentIndex];
            const otherItem = items[i];
            const otherItemProperties = otherItem.properties;
            const itemProperties = item.properties;

            // Verifica se o outro item começou antes e está no mesmo dia
            if (
                otherItemProperties.date.start < itemProperties.date.start 
                && isDateInRange(currentDay, otherItemProperties.date.start, otherItemProperties.date.end)
            ) {
                hierarchy++;
            } else if (
                otherItemProperties.date.start === itemProperties.date.start
                && isDateInRange(currentDay, otherItemProperties.date.start, otherItemProperties.date.end)
            ) {
                // Verifica se o outro item começou no mesmo dia
                new Date(otherItem.createdAt) < new Date(item.createdAt) ? hierarchy++ : hierarchy;
            }
        }
    }

    return hierarchy;
}