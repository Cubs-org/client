export const Shared = () => {
    return (
        <>
            {Array(36).fill(0).map((_, index) => (
                <div
                    className="min-w-[200px] h-32 flex flex-col gap-2 rounded-lg bg-light-200 dark:bg-dark-800 border border-light-300 dark:border-dark-700 animate-pulse"
                    key={index}
                />
            ))}
        </>
    )
}