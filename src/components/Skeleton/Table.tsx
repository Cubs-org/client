export const Table = () => {
    return (
        <div className="w-full">
            <div className="w-full grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-2 overflow-hidden rounded-b-md">
                {Array(36).fill(0).map((_, index) => (
                    <div 
                        className="w-full h-8 bg-light-300 dark:bg-dark-800 px-3 py-1.5 animate-pulse delay-300"
                        key={index}
                    />
                ))}
            </div>
        </div>
    )
}