import { Button } from '../Button'
import { Thead } from './Thead'
import { TableData } from './util'

interface TableContentProps {
    tableData: TableData
}

export const TableContent = ({ tableData }: TableContentProps) => {
    const headerData = tableData.header
    return (
        <div className="max-w-full h-auto flex gap-1 items-start overflow-x-scroll md:scrollbar scrollbar-thumb-light-300 dark:scrollbar-thumb-dark-700 scrollbar-track-transparent">
            <div className="flex flex-col">
                <table className="border-collapse border-spacing-0 border border-light-300 dark:border-dark-800">
                    <Thead headerData={headerData} />
                </table>
                <Button classNames="bg-light-300 hover:bg-light-400 text-dark-700 py-0.5 text-sm mt-1">
                    + Adicionar nova linha
                </Button>
            </div>
            <Button classNames="bg-light-300 hover:bg-light-400 text-dark-700 px-1.5">
                +
            </Button>
        </div>
    )
}
