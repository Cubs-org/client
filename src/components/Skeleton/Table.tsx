export const Table = () => {
    return (
        <div className="w-full">
            <div className="mb-2 flex flex-row gap-2 items-center justify-between overflow-hidden rounded-t-md">
                {Array(6).fill(0).map((_, index) => (
                    <div key={index} className="w-full h-10 bg-light-400 dark:bg-dark-700 animate-pulse delay-100 px-3 py-2"/>
                ))}
            </div>
            <div className="w-full grid grid-cols-6 gap-2 overflow-hidden rounded-b-md">
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