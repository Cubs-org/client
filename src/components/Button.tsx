import { Icon } from '@iconify/react/dist/iconify.js'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Popover } from './Popover'

export interface ButtonProps
    extends React.DetailedHTMLProps<
            React.ButtonHTMLAttributes<HTMLButtonElement>,
            HTMLButtonElement
        >,
        React.AriaAttributes {
    classNames?: string
    variant?: 'filled' | 'outlined' | 'split'
    startIcon?: string
    endIcon?: string
}

export const Button = ({ ...props }: ButtonProps) => {
    const { children, variant = 'filled', classNames, ...rest } = props
    return variant === 'split' ? (
        <SplitButton {...props} />
    ) : (
        <button
            type="button"
            className={twMerge(
                clsx(
                    'flex flex-row items-center justify-center gap-2 rounded-md font-bold text-light-200',
                    {
                        'bg-violet-500 hover:bg-violet-600':
                            variant === 'filled',
                        'border border-violet-500 hover:border-violet-600':
                            variant === 'outlined',
                    },
                    classNames
                ),
                classNames
            )}
            {...rest}
        >
            {children}
        </button>
    )
}

const SplitButton = ({ children, classNames, ...props }: ButtonProps) => (
    <div
        className={clsx(
            'flex flex-row-reverse gap-0.5 h-8 justify-between rounded-md font-bold text-light-200 overflow-clip'
        )}
    >
        <Popover
            content={'Hello World'}
            direction="bottom-end"
            classNames={twMerge(
                'flex flex-grow items-center justify-center w-8 h-full text-light-200 rounded-none font-bold bg-violet-500 hover:bg-violet-600',
                classNames
            )}
        >
            <Icon icon={'fa-solid:angle-down'} fontSize={18} />
        </Popover>
        <button
            type="button"
            className={twMerge(classNames, 'pl-3 flex flex-grow h-full')}
            {...props}
        >
            {children}
        </button>
    </div>
)
