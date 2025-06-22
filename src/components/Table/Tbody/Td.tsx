import { PagePropertyType } from '@/types/page'

type TdExtends = {
    value?: string
    data?:
        | {
              value?: string
          }
        | any
}

interface TdProps extends Partial<TdExtends> {
    type: PagePropertyType
}

const TdText = ({ ...props }) => (
    <span className="text-dark-700 dark:text-light-300">
        {props.value || props.data.value}
    </span>
)

const TdDateTime = ({
    data: { value },
}: {
    data: { value: Date | string }
}) => <span className="text-dark-700 dark:text-light-300">{String(value)}</span>

const typesTd: {
    [K in PagePropertyType]?: React.FC<any>
} = {
    text: TdText,
    number: TdText,
    date: TdDateTime,
}

const TypedTd = ({ type, ...props }: TdProps) => {
    const Component = typesTd[type]

    if (!Component) return null

    return <Component {...props} />
}

export const Td = ({ type, ...props }: TdProps) => {
    return (
        <td className="border border-light-300 dark:border-dark-800 px-2 py-1 text-sm text-dark-700 dark:text-light-300">
            <TypedTd type={type} {...props} />
        </td>
    )
}
