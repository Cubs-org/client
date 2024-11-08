import clsx from 'clsx'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    variant?: 'outline' | 'filled'
}

export const Input = ({
    value,
    placeholder,
    className,
    variant,
    ...props
}: InputProps) => {
    return (
        <input
            {...props}
            value={value}
            placeholder={placeholder || 'Escreva aqui...'}
            className={clsx(
                'w-full px-2 py-1 focus:outline-none rounded-md focus:border-purple-500 text-dark-700 dark:text-light-300',
                {
                    'border border-light-300 dark:border-dark-800 bg-transparent':
                        variant === 'outline',
                    'bg-light-200 dark:bg-dark-800 border border-light-400 dark:border-dark-700':
                        variant === 'filled',
                },
                className
            )}
        />
    )
}
