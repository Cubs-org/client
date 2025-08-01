import { UserViewer } from './user'

export interface PageProps {
    id: string
    title: string
    ownerId: string
    createdAt: string
    updatedAt: string
    trash: boolean

    properties: PagePropertiesProps[]
}

export type PageViewer = Omit<PageProps, 'ownerId'> & {
    owner: UserViewer
}

type Data = {
    // default
    value?: string | number | boolean | string[]

    icon?: string
    width?: number
    loadOrder?: number

    // datetime
    start?: string
    end?: string

    color?: string

    // select | multiselect
    items?: { name: string; color: string }[]
    tags?: { name: string; color: string }[]
} & Object

export interface PagePropertiesProps {
    id: string
    type: PagePropertyType
    title: string
    data: Data
    trash: boolean
}

export type PageData = {
    id: string
    title: string
    data: {
        icon: string
        prev?: string | undefined | null
        next?: string | undefined | null
    }
}

export type PagePropertyType =
    | 'text'
    | 'number'
    | 'date'
    | 'datetime'
    | 'formula'
    | 'selection'
    | 'multi_selection'
    | 'relation'
    | 'rollup'
    | 'assign'
    | 'checkbox'
    | 'status'
    | 'button'
    | 'calendar'

export type ChangeAction = {
    type: 'title' | 'icon'
    payload: string
}

export type BlockData = {
    width?: number
    align?: 'left' | 'right' | 'center'
}

export type DataBlocks = {
    id: string
    type: string
    orderX: number
    orderY: number
    row: number
    data?: BlockData
    content?: any
    url?: string
}

export type GroupedBlocks = DataBlocks[][][]
