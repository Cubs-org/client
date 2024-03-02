export const Checkbox = ({ value }) => {
    return (
        <div className="w-full flex gap-1 items-center justify-center">
            <input 
                className="w-4 h-4"
                type="checkbox" 
                id="check" 
                name="check" 
                value="check" 
                checked={value} 
                readOnly 
            />
        </div>
    )
};