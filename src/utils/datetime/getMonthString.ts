export const getMonthByNumber = (month) => {
    const month_name = new Date(1999, month, 0)
                        .toLocaleString(
                            'pt-br', { month: 'long' }
                        );

    return month_name;
}