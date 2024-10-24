import {
    Popover as PopoverContainer,
    PopoverHandler,
    PopoverContent,
    Button,
} from '@material-tailwind/react'
import clsx from 'clsx'

interface PopoverProps {
    children: React.ReactNode
    content: React.ReactNode
    direction?:
        | 'top'
        | 'bottom'
        | 'left'
        | 'right'
        | 'top-start'
        | 'top-end'
        | 'bottom-start'
        | 'bottom-end'
        | 'left-start'
        | 'left-end'
        | 'right-start'
        | 'right-end'
    width?: string
    height?: string
    offset?: number
    classNames?: string
    btnProps?: any
}

export const Popover = ({
    children,
    content,
    direction,
    width,
    height,
    offset,
    classNames,
    btnProps,
}: PopoverProps) => (
    <PopoverContainer
        placement={direction}
        animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0, y: 25 },
        }}
        offset={offset || 10}
    >
        <PopoverHandler>
            <Button
                style={{
                    width: width || 'fit-content',
                    minHeight: height || 'fit-content',
                }}
                className={clsx(
                    'p-0 shadow-none text-dark-600 dark:text-light-300',
                    classNames
                )}
                {...btnProps}
            >
                {children}
            </Button>
        </PopoverHandler>
        <PopoverContent className="text-dark-700 border-light-600 dark:border-dark-600 dark:text-light-300 bg-glass-light dark:bg-glass-dark backdrop-blur-md shadow-full z-10 p-0">
            {content}
        </PopoverContent>
    </PopoverContainer>
)
