import { textColors } from '@/utils/colorsScheme'
import { Icon } from '@iconify/react'
import clsx from 'clsx'

export interface MoreMenuItemProps {
    name: string
    label: string
    icon?: string
    color?: string
    onClick?: () => void
    disabled?: boolean
    classNames?: string
}

// const TextField = () => {}

export const MoreMenuItem = ({
    label,
    color,
    icon = 'mdi:trash-can',
}: MoreMenuItemProps) => {
    return (
        <div
            className={clsx('w-full flex items-center', {
                ...(color && textColors(color)),
            })}
        >
            <Icon icon={icon} className="mr-1" />
            <span>{label}</span>
        </div>
    )
}
