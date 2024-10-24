import { useEffect, useRef, useState } from 'react'
import { MoreMenu, MoreMenuProps } from './MoreMenu'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'

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
    const popoverRef = useRef<HTMLDivElement | null>(null) // Reference for the popover

    const handleOpen = (e: React.MouseEvent) => {
        e.preventDefault()
        setIsOpen(!isOpen)
    }

    const closePopover = () => {
        setIsOpen(false)
    }

    const handleClickOutside = (event: MouseEvent) => {
        // Check if the click was outside of the popover and trigger
        if (
            popoverRef.current &&
            !popoverRef.current.contains(event.target as Node)
        ) {
            closePopover()
        }
    }

    useEffect(() => {
        if (isOpen) {
            // Attach the click event listener to the document when the popover is open
            document.addEventListener('mousedown', handleClickOutside)
        } else {
            // Cleanup the event listener
            document.removeEventListener('mousedown', handleClickOutside)
        }

        return () => {
            // Cleanup on component unmount
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isOpen])

    const triggers = {
        onClick: handleOpen,
        onContextMenu: handleOpen,
    }

    return (
        <Popover open={isOpen}>
            <PopoverTrigger {...triggers}>
                <div {...btnProps}>{children}</div>
            </PopoverTrigger>
            <PopoverContent ref={popoverRef}>
                <MoreMenu {...props} />
            </PopoverContent>
        </Popover>
    )
}
