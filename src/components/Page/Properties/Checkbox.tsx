export const Checkbox = ({ value }) => {
    return (
        <div className="flex gap-1 items-center">
            <input type="checkbox" id="check" name="check" value="check" checked={value} />
            <label htmlFor="check" className="text-sm md:text-base text-dark-300 dark:text-light-500">
                {value}
            </label>
        </div>
    )
};