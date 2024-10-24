import React from 'react'
import { Divider } from '../Divider'
import { MoreMenuItem, MoreMenuItemProps } from './MoreMenuItem'
import { Sizes } from '@/types/stylesPresets'

export interface MoreMenuProps {
    width?: Sizes
    items: MoreMenuItemProps[]
}

export const MoreMenu = ({ items, width }: MoreMenuProps) => {
    return (
        <ul
            className={'flex flex-col gap-1 px-1.5 py-1 w-32'}
            style={{ width }}
        >
            {items.map((item, _i) => (
                <React.Fragment key={_i}>
                    <li className="w-full px-1.5 py-1 rounded-md hover:bg-light-300  hover:dark:border-dark-700 cursor-pointer">
                        <MoreMenuItem {...item} />
                    </li>
                    {_i + 1 !== items.length && <Divider />}
                </React.Fragment>
            ))}
        </ul>
    )
}
