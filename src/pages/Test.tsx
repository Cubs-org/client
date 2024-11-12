import { Hub } from '@/components/Hub'
import { tableData } from '@/components/Table/util'
import { NavTabProps } from '@/components/Tabs/Tab'

const tabs: NavTabProps[] = [
    { id: 1, title: 'Kanban', type: 'board' },
    { id: 2, title: 'Table', type: 'table' },
    { id: 3, title: 'List', type: 'list' },
    { id: 4, title: 'Grid', type: 'grid' },
    { id: 5, title: 'Metas (Financeiras)', type: 'table' },
]

function Test() {
    return (
        <div className="bg-light-100 dark:bg-dark-900 text-dark-800 dark:text-light-300 w-full min-h-screen">
            <main className="w-full md:w-4/5 lg:w-4/6 mx-auto pt-[30vh]">
                <Hub tabs={tabs} body={tableData} />
            </main>
        </div>
    )
}

export default Test
