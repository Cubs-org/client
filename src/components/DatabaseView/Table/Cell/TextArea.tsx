import clsx from "clsx";
import React from "react";

interface TextCellProps {
    classNames?: string;
    value: any;
    handle: (newValue: string) => void;
}

export const TextArea = ({ classNames, value, handle }: TextCellProps) => {
    const [inputValue, setInputValue] = React.useState(value || "");
    const [isEditing, setIsEditing] = React.useState(false);

    React.useEffect(() => {
        setInputValue(value || "");
    }, [value]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter") {
            setIsEditing(false);
            handle(inputValue);
        }
    };

    const handleClick = () => {
        setIsEditing(true);
    };

    const handleBlur = () => {
        setIsEditing(false);
        handle(inputValue);
    };

    return (
        <div
            className={clsx("w-full min-h-[32px] h-full px-2 py-1", classNames)}
            contentEditable={isEditing}
            suppressContentEditableWarning={true}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
        >
            {value}
        </div>
    );
};