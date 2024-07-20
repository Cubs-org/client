import React from "react"
import { TextArea } from "../../../../TextArea";

interface TextCellProps extends React.HTMLProps<HTMLInputElement> {
    classNames?: string;
};

export const Text = ({ classNames, value }: TextCellProps) => {
    
    const handleSave = (saved_value) => {
        const newValue = saved_value.target.value;
        console.log(newValue);
    };

    return (
        <TextArea
            handle={handleSave}
            classNames={classNames}
            value={String(value)}
        />
    )
};