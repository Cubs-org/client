import clsx from "clsx";
import React from "react";

interface TextAreaProps {
    classNames?: string;
    value: any;
    placeholder?: string;
    outlineDisabled?: boolean;
    handle: (newValue: string) => void;
}

export const TextArea = ({ 
    classNames, 
    value, 
    placeholder, 
    handle,
    outlineDisabled=false 
}: TextAreaProps) => {
    const [content, setContent] = React.useState(value || "");
    const [isEditing, setIsEditing] = React.useState(false);

    React.useEffect(() => {
        setContent(value || "");
    }, [value]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter") {
            setIsEditing(false);
            handle(content);
        }
    };

    const handleClick = () => {
        setIsEditing(true);
    };

    const handleBlur = () => {
        setIsEditing(false);
        handle(content);
    };

    return (
        <div
            className={clsx("w-full min-h-[32px] h-full px-2 py-1 before:empty:content-[attr(data-placeholder)] before:text-light-500 dark:before:text-dark-500 cursor-text", {
                "outline-none": outlineDisabled
            }, classNames)}
            data-placeholder={placeholder}
            contentEditable={isEditing}
            suppressContentEditableWarning={true}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
        >
            {content !== "" && content}
        </div>
    );
};