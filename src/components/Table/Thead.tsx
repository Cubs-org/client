import { TableData } from './util'
import { getHeaderGroup } from './getHeaderGroup'

interface TheadProps {
    headerData: TableData['header']
}

export const Thead = ({ headerData }: TheadProps) => {
    return (
        <thead>
            <tr>{getHeaderGroup(headerData)}</tr>
        </thead>
    )
}
