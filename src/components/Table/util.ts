import { PagePropertyType, PageViewer } from '@/types/page'

export type TableData = {
    header: {
        [key: string]: {
            type: PagePropertyType
            width: number
        }
    }
    body: Array<PageViewer>
}

export const tableData: TableData = {
    header: {
        id: {
            type: 'number',
            width: 80,
        },
        title: {
            type: 'text',
            width: 300,
        },
        verified: {
            type: 'checkbox',
            width: 120,
        },
        author: {
            type: 'text',
            width: 130,
        },
        'created At': {
            type: 'date',
            width: 140,
        },
        'updated At': {
            type: 'date',
            width: 140,
        },
    },
    body: [
        {
            id: '$1',
            title: 'Primeiro item',
            createdAt: '2023-10-01T12:00:00Z',
            updatedAt: '2023-10-01T12:00:00Z',
            owner: {
                name: 'Owner 1',
                email: 'owner1@example.com',
                icon: '/public/animals/aguia.png',
            },
            trash: false,
            properties: [
                // 'id'
                // 'title'
                // 'verified'
                // 'author'
                // 'created At'
                // 'updated At'
                {
                    id: '1-1',
                    type: 'text',
                    title: 'id',
                    data: {
                        value: '1',
                    },
                    trash: false,
                },
                {
                    id: '1-2',
                    type: 'checkbox',
                    title: 'verified',
                    data: {
                        value: true,
                    },
                    trash: false,
                },
                {
                    id: '1-3',
                    type: 'text',
                    title: 'author',
                    data: {
                        value: 'Autor 1',
                    },
                    trash: false,
                },
                {
                    id: '1-4',
                    type: 'date',
                    title: 'created At',
                    data: {
                        value: '2023-10-01',
                    },
                    trash: false,
                },
                {
                    id: '1-5',
                    type: 'date',
                    title: 'updated At',
                    data: {
                        value: '2023-10-01',
                    },
                    trash: false,
                },
            ],
        },
        {
            id: '$2',
            title: 'Segundo item',
            createdAt: '2023-10-01T12:00:00Z',
            updatedAt: '2023-10-01T12:00:00Z',
            owner: {
                name: 'Owner 2',
                email: 'owner2@example.com',
                icon: '/public/animals/aguia.png',
            },
            trash: false,
            properties: [
                {
                    id: '2-2',
                    type: 'checkbox',
                    title: 'verified',
                    data: {
                        value: true,
                    },
                    trash: false,
                },
                {
                    id: '2-1',
                    type: 'text',
                    title: 'id',
                    data: {
                        value: '2',
                    },
                    trash: false,
                },
                {
                    id: '2-3',
                    type: 'text',
                    title: 'author',
                    data: {
                        value: 'Autor 2',
                    },
                    trash: false,
                },
                {
                    id: '2-5',
                    type: 'date',
                    title: 'updated At',
                    data: {
                        value: '2023-10-01',
                    },
                    trash: false,
                },
                {
                    id: '2-4',
                    type: 'date',
                    title: 'created At',
                    data: {
                        value: '2023-10-01',
                    },
                    trash: false,
                },
            ],
        },
        {
            id: '$3',
            title: 'Terceiro item',
            createdAt: '2023-10-01T12:00:00Z',
            updatedAt: '2023-10-01T12:00:00Z',
            owner: {
                name: 'Owner 3',
                email: 'owner3@example.com',
                icon: '/public/animals/aguia.png',
            },
            trash: false,
            properties: [
                {
                    id: '3-1',
                    type: 'text',
                    title: 'id',
                    data: {
                        value: '3',
                    },
                    trash: false,
                },
                {
                    id: '3-3',
                    type: 'text',
                    title: 'author',
                    data: {
                        value: 'Autor 3',
                    },
                    trash: false,
                },
                {
                    id: '3-4',
                    type: 'date',
                    title: 'created At',
                    data: {
                        value: '2023-10-01',
                    },
                    trash: false,
                },
                {
                    id: '3-2',
                    type: 'checkbox',
                    title: 'verified',
                    data: {
                        value: false,
                    },
                    trash: false,
                },
                {
                    id: '3-5',
                    type: 'date',
                    title: 'updated At',
                    data: {
                        value: '2023-10-01',
                    },
                    trash: false,
                },
            ],
        },
    ],
}
