import { FaRegCircle, FaRegCircleDot, FaRegCircleCheck } from 'react-icons/fa6'
import formatDatetime from '../../utils/datetime/formatDatetime'
import { Progress } from '../Progress'
import { RadialProgressBar } from '../RadialProgressBar'
import clsx from 'clsx'
import { Avatar } from '../Avatar'
import parseFormula from '../../utils/page/formulaProperty/parseFormula'

export const Properties = ({ properties }) => {
    const renderProps = () => {
        properties.sort((a, b) => a.data.loadOrder - b.data.loadOrder)
        return properties?.map((prop, index) => {
            switch (prop.type) {
                case 'text':
                    return (
                        <div
                            key={`${prop.name}-${index}`}
                            className="text-xs font-medium text-dark-600 dark:text-light-300"
                        >
                            {prop.data.value}
                        </div>
                    )
                case 'number':
                    const format = prop.data.format
                    const value = Number(prop.data.value.replace(',', '.'))
                    return (
                        <div
                            key={`${prop.name}-${index}`}
                            className="text-xs font-medium text-dark-600 dark:text-light-300"
                        >
                            {format === 'number' && value}
                            {format === 'progress' && (
                                <Progress value={value} size={5} />
                            )}
                            {format === 'radial' && (
                                <RadialProgressBar value={value} size={18} />
                            )}
                        </div>
                    )
                case 'datetime':
                    return (
                        <span
                            key={`${prop.name}-${index}`}
                            className="text-[.6rem] font-normal"
                        >
                            {formatDatetime(prop.data.start)} até{' '}
                            {formatDatetime(prop.data.end)}
                        </span>
                    )
                case 'checkbox':
                    return (
                        <div
                            key={`${prop.name}-${index}`}
                            className="w-full flex gap-1 items-center"
                        >
                            <input
                                type="checkbox"
                                checked={prop.data.value}
                                className="w-4 h-4 rounded-md border-2 border-light-200 dark:border-dark-600"
                                readOnly
                            />
                            <span className="text-xs font-normal">
                                {prop.name}
                            </span>
                        </div>
                    )
                case 'status':
                    return (
                        <div
                            key={`${prop.name}-${index}`}
                            className={clsx(
                                'w-fit flex gap-2 items-center text-white text-xs font-normal rounded-full pl-2 pr-3 py-0.5',
                                {
                                    'bg-slate-500':
                                        prop.data.value === 'Não iniciado',
                                    'bg-yellow-500':
                                        prop.data.value === 'Em andamento',
                                    'bg-green-500':
                                        prop.data.value === 'Concluído',
                                }
                            )}
                        >
                            <span
                                className={clsx(
                                    'rounded-full grid place-items-center',
                                    {
                                        'bg-slate-300 text-slate-800':
                                            prop.data.value === 'Não iniciado',
                                        'bg-yellow-300 text-yellow-800':
                                            prop.data.value === 'Em andamento',
                                        'bg-green-300 text-green-800':
                                            prop.data.value === 'Concluído',
                                    }
                                )}
                            >
                                {prop.data.value === 'Não iniciado' ? (
                                    <FaRegCircle />
                                ) : prop.data.value === 'Em andamento' ? (
                                    <FaRegCircleDot />
                                ) : (
                                    <FaRegCircleCheck />
                                )}
                            </span>
                            {prop.data.value}
                        </div>
                    )
                case 'assign':
                    return (
                        <div
                            key={`${prop.name}-${index}`}
                            className="flex flex-wrap gap-1 items-center"
                        >
                            {prop.data.members.map((member, _i) => (
                                <div
                                    key={_i}
                                    className="flex gap-2 items-center rounded-full pl-1 pr-2 py-1 bg-light-300 dark:bg-dark-500"
                                >
                                    <Avatar
                                        size={20}
                                        icon={member.icon}
                                        name={member.name}
                                    />
                                    <span className="text-xs font-medium">
                                        {member.email}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )
                case 'select':
                    const color = prop.data.items.find(
                        (item) => prop.data.value === item.name
                    )?.color
                    return (
                        <div
                            key={`${prop.name}-${index}`}
                            className={clsx(
                                'w-fit text-sm font-medium text-light-200 px-2 py-1 rounded-md',
                                {
                                    'bg-red-500': color === 'red',
                                    'bg-green-500': color === 'green',
                                    'bg-blue-500': color === 'blue',
                                    'bg-yellow-500': color === 'yellow',
                                    'bg-orange-500': color === 'orange',
                                    'bg-violet-500': color === 'purple',
                                    'bg-pink-500': color === 'pink',
                                    'bg-indigo-500': color === 'indigo',
                                    'bg-gray-500': color === 'gray',
                                    'bg-light-500': color === 'light',
                                }
                            )}
                        >
                            {prop.data.value}
                        </div>
                    )
                case 'multi-select':
                    return (
                        <div
                            key={`${prop.name}-${index}`}
                            className="flex flex-wrap gap-1"
                        >
                            {prop.data.items.map((item, _i) => (
                                <span
                                    key={_i}
                                    className={clsx(
                                        'text-xs text-light-200 font-medium px-2 py-1 rounded-md',
                                        {
                                            'bg-red-500': item.color === 'red',
                                            'bg-green-500':
                                                item.color === 'green',
                                            'bg-blue-500':
                                                item.color === 'blue',
                                            'bg-yellow-500':
                                                item.color === 'yellow',
                                            'bg-orange-500':
                                                item.color === 'orange',
                                            'bg-violet-500':
                                                item.color === 'purple',
                                            'bg-pink-500':
                                                item.color === 'pink',
                                            'bg-indigo-500':
                                                item.color === 'indigo',
                                            'bg-gray-500':
                                                item.color === 'gray',
                                            'bg-light-500':
                                                item.color === 'light',
                                        }
                                    )}
                                >
                                    {item.name}
                                </span>
                            ))}
                        </div>
                    )
                case 'formula':
                    const formula = eval(prop.data.value)
                    const { text, color: formulaColor } = parseFormula(formula)
                    return (
                        <div
                            key={index}
                            className={clsx('text-xs font-medium', {
                                'text-red-500': formulaColor === 'red',
                                'text-green-500': formulaColor === 'green',
                                'text-blue-500': formulaColor === 'blue',
                                'text-yellow-500': formulaColor === 'yellow',
                                'text-orange-500': formulaColor === 'orange',
                                'text-violet-500': formulaColor === 'purple',
                                'text-pink-500': formulaColor === 'pink',
                                'text-indigo-500': formulaColor === 'indigo',
                                'text-gray-500': formulaColor === 'gray',
                                'text-light-500': formulaColor === 'light',
                            })}
                        >
                            {text}
                        </div>
                    )
            }
        })
    }

    return renderProps()
}
