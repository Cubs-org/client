import isSunday from "../datetime/isSunday";
import isDateInRange from "./isDateInRange";
import rangeDifferenceBetweenDates from "./rangeDifferenceBetweenDays";

export function addTimelinesInItems(items: any, data: any) {
    let _items = items as any[];

    for (let k = 0; k < _items.length; k++) {
        let item = _items[k];
        let timeline = [] as any;

        if (item?.startDate && item?.endDate) {
            for (let i = 0; i < data.length; i++) {
                const week = data[i];

                for (let j = 0; j < week.length; j++) {
                    const day = week[j];

                    if (
                        isDateInRange(day, item?.startDate, item?.endDate)
                        && (isSunday(day) || item?.startDate === day)
                    ) {
                        // Calcula a hierarchy com base nas tarefas que começam depois no mesmo dia
                        const hierarchy = calculateHierarchy(_items, k, day);

                        timeline.push({
                            day,
                            range: rangeDifferenceBetweenDates({ initialDate: day, finalDate: item.endDate }),
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

            // Verifica se o outro item começou antes e está no mesmo dia
            if (
                otherItem.startDate < item.startDate 
                && isDateInRange(currentDay, otherItem.startDate, otherItem.endDate)
            ) {
                hierarchy++;
            } else if (
                otherItem.startDate === item.startDate
                && isDateInRange(currentDay, otherItem.startDate, otherItem.endDate)
            ) {
                // Verifica se o outro item começou no mesmo dia
                new Date(otherItem.createdAt) < new Date(item.createdAt) ? hierarchy++ : hierarchy;
            }
        }
    }

    return hierarchy;
}