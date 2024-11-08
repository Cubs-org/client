import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

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

// TODO: CREATE A VARIANT PROP
export const Button = ({
    classNames,
    variant = 'filled',
    ...props
}: ButtonProps) => (
    <button
        type="button"
        className={twMerge(
            clsx(
                'flex flex-row items-center justify-center gap-2 p-2 rounded-md font-bold text-light-200',
                {
                    'bg-purple-500 hover:bg-purple-600': variant === 'filled',
                    'border border-purple-500 hover:border-purple-600':
                        variant === 'outlined',
                },
                classNames
            ),
            classNames
        )}
        {...props}
    />
)
