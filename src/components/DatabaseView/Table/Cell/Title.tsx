import React from "react"
import { TextArea } from "./TextArea";
import { twMerge } from "tailwind-merge";

interface TextCellProps extends React.HTMLProps<HTMLInputElement> {
    classNames?: string;
};

export const Title = ({ classNames, value }: TextCellProps) => {
    
    const handleSave = (saved_value) => {
        const newValue = saved_value.target.value;
        console.log(newValue);
    };

    return (
        <TextArea
            handle={handleSave}
            classNames={twMerge("outline-none", classNames)}
            value={value}
        />
    )
};