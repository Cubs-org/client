import { ContextMenu } from '@/components/ContextMenu'
import { Icon } from '@/components/IconPicker'
import clsx from 'clsx'

export interface NavTabProps {
    id: number
    title: string
    type: 'table' | 'grid' | 'list' | 'board'
    active?: boolean
    onChangeTab?: (tabId: number) => void
}

export const Tab = ({ id, title, active, onChangeTab }: NavTabProps) => (
    <ContextMenu
        items={[
            { label: 'item-1', name: 'item_1' },
            { label: 'item-2', name: 'item_2' },
        ]}
        direction="start"
        disableClick
    >
        <div
            className={clsx(
                'flex items-center gap-1.5 whitespace-nowrap text-ellipsis px-2 py-0.5 rounded-md border border-light-900 text-light-900 text-sm cursor-pointer',
                {
                    'bg-light-300 !text-dark-700 dark:bg-dark-600': active,
                    'hover:bg-light-200 dark:hover:bg-dark-500': !active,
                }
            )}
            onClick={() => onChangeTab?.(id)}
        >
            <Icon icon="1f355" size={18} />
            <span className="truncate">{title}</span>
        </div>
    </ContextMenu>
)
