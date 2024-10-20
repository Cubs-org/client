export const Blocks = () => (
    <>
        {Array(4).fill(0).map((_, index) => (
            <div
                className="w-full min-h-[200px] rounded-lg bg-light-300 dark:bg-dark-800 border border-light-400 dark:border-dark-700 mt-2 animate-pulse"
                key={index}
            />
        ))}
    </>
)