import { useEffect, useRef, useState } from 'react'
import { MoreMenu, MoreMenuProps } from './MoreMenu'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'

interface ContextMenuProps extends MoreMenuProps {
    btnProps?: any
    children: React.ReactNode
    classNames?: string
}

export const ContextMenu = ({
    children,
    btnProps,
    classNames,
    ...props
}: ContextMenuProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const popoverRef = useRef<HTMLDivElement | null>(null) // Reference for the popover
    const triggerRef = useRef<HTMLDivElement | null>(null) // Reference for the trigger

    const handleOpen = (e: React.MouseEvent) => {
        e.preventDefault()
        setIsOpen((prev) => !prev)
    }

    const closePopover = () => {
        setIsOpen(false)
    }

    const handleClickOutside = (event: MouseEvent) => {
        if (
            popoverRef.current &&
            !popoverRef.current.contains(event.target as Node) &&
            triggerRef.current &&
            !triggerRef.current.contains(event.target as Node)
        ) {
            closePopover()
        }
    }

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        } else {
            document.removeEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isOpen])

    const triggers = {
        onClick: handleOpen,
        onContextMenu: handleOpen,
    }

    return (
        <Popover open={isOpen}>
            <PopoverTrigger
                /* @ts-ignore */
                ref={triggerRef}
                className={classNames}
                {...triggers}
            >
                <div {...btnProps}>{children}</div>
            </PopoverTrigger>
            <PopoverContent ref={popoverRef}>
                <MoreMenu {...props} />
            </PopoverContent>
        </Popover>
    )
}
