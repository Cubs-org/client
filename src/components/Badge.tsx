import clsx from 'clsx'
import React from 'react'

interface BadgeProps {
    children: React.ReactNode
    content: string | number
    color?: string
}

export const Badge = ({ children, content, color = 'red' }: BadgeProps) => {
    return (
        <div className="relative group">
            <span
                className={clsx(
                    'absolute w-[18px] h-[18px] top-0 right-0 rounded-full text-[.7rem] text-light-300 flex justify-center items-center ring ring-light-100 dark:ring-dark-900 cursor-pointer',
                    {
                        'bg-red-500': color === 'red',
                        'bg-green-500': color === 'green',
                        'bg-blue-500': color === 'blue',
                        'bg-yellow-500': color === 'yellow',
                        'bg-orange-500': color === 'orange',
                        'bg-violet-500': color === 'purple',
                        'bg-pink-500': color === 'pink',
                        'bg-indigo-500': color === 'indigo',
                        'bg-gray-500': color === 'gray',
                    }
                )}
            >
                {typeof content === 'number'
                    ? content > 99
                        ? 99
                        : content
                    : content}
            </span>

            {children}
        </div>
    )
}
