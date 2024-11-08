import { useState } from 'react'
import { Tabs } from '../Tabs'
import { Table } from '../Table'

type HubAvailableViews = 'board' | 'table' | 'list' | 'grid'

type HubTabProps = {
    id: number
    type: HubAvailableViews
    title: string
}

type HubProps = {
    tabs: HubTabProps[]
    body: any
}

interface HubViewProps {
    type: HubAvailableViews
    body: any
}

const Placeholder = () => <div>PlaceHolder</div>

export const HubView = ({ type, body }: HubViewProps) => {
    const view = {
        board: Placeholder,
        table: Table,
        list: Placeholder,
        grid: Placeholder,
    }

    const Component = view[type]

    // @ts-ignore
    return <Component data={body} />
}

export const Hub = ({ tabs, body }: HubProps) => {
    const [type, setType] = useState<HubAvailableViews>('board')

    const onChangeTab = (tabId: number) => {
        const tab = tabs.find((tab) => tab.id === tabId)
        if (tab) setType(tab.type)
    }

    return (
        <Tabs tabs={tabs} onChangeTab={onChangeTab}>
            <HubView type={type} body={body} />
        </Tabs>
    )
}
