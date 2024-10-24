import { useState } from 'react'
import { MoreMenu, MoreMenuProps } from './MoreMenu'
import { Popover } from './Popover'

interface ContextMenuProps extends MoreMenuProps {
    btnProps: any
    children: React.ReactNode
}

export const ContextMenu = ({
    children,
    btnProps,
    ...props
}: ContextMenuProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const handleOpen = (e: React.MouseEvent) => {
        e.preventDefault()
        setIsOpen(!isOpen)
    }

    return (
        <Popover
            open={isOpen}
            onContextMenu={handleOpen}
            content={<MoreMenu {...props} />}
            direction="right-start"
            btnProps={btnProps}
        >
            {children}
        </Popover>
    )
}
