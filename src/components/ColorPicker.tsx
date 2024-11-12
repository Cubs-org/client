import clsx from 'clsx'

interface IColorPicker {
    color: string
    handleSetColor: (color: string) => void
}

const colors = ['red', 'green', 'blue', 'yellow', 'pink', 'purple', 'orange']

export const ColorPicker = ({ color, handleSetColor }: IColorPicker) => (
    <div className="flex items-center justify-between gap-2">
        {colors.map((item, key) => (
            <span
                key={`${color}-${key}`}
                onClick={() => handleSetColor(item)}
                className={clsx('w-[20px] h-[20px] rounded-md cursor-pointer', {
                    'bg-red-400': item == 'red',
                    'bg-green-400': item == 'green',
                    'bg-blue-400': item == 'blue',
                    'bg-yellow-400': item == 'yellow',
                    'bg-pink-400': item == 'pink',
                    'bg-violet-400': item == 'purple',
                    'bg-orange-400': item == 'orange',
                    'ring-2 ring-dark-100 dark:ring-light-300': item == color,
                })}
            />
        ))}
    </div>
)
