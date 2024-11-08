export type TableData = {
    header: {
        [key: string]: {
            type: string
            width: number
        }
    }
    body: Array<{
        [key: string]: string | number | boolean | Date
    }>
}

export const tableData = {
    header: {
        id: {
            type: 'number',
            width: 100,
        },
        title: {
            type: 'text',
            width: 300,
        },
        verified: {
            type: 'checkbox',
            width: 100,
        },
        author: {
            type: 'text',
            width: 130,
        },
        'created At': {
            type: 'date',
            width: 120,
        },
        'updated At': {
            type: 'date',
            width: 100,
        },
    },
    body: [{}],
}
