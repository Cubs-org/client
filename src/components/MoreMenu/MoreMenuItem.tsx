import { textColors } from '@/utils/colorsScheme'
import { Icon } from '@iconify/react'
import clsx from 'clsx'

export interface MoreMenuItemProps {
    name: string
    label: string
    icon: React.ReactNode
    color?: string
    onClick: () => void
    disabled?: boolean
    classNames?: string
}

// const TextField = () => {}

export const MoreMenuItem = ({ label, color }: MoreMenuItemProps) => {
    return (
        <div
            className={clsx('w-full flex items-center', {
                ...(color && textColors(color)),
            })}
        >
            <Icon icon="mdi:trash-can" className="mr-1" />
            <span>{label}</span>
        </div>
    )
}
