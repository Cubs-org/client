import { TableContent } from './Table'
import { TableData } from './util'

interface TabsProps {
    children: React.ReactNode
    data: TableData
}

export const Table = ({ data }: TabsProps) => {
    return <TableContent tableData={data} />
}
