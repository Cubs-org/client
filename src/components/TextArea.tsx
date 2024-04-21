import clsx from "clsx";
import React from "react";

interface TextAreaProps {
    classNames?: string;
    value: any;
    placeholder?: string;
    outlineDisabled?: boolean;
    handle: (newValue: string) => void;
}

type TextAreaState = boolean | "plaintext-only";

export const TextArea = ({ 
    classNames, 
    value, 
    placeholder, 
    handle,
    outlineDisabled=false 
}: TextAreaProps) => {
    const [content, setContent] = React.useState(value || "");
    const [isEditing, setIsEditing] = React.useState<TextAreaState>(false);

    React.useEffect(() => {
        setContent(value || "");
    }, [value]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            setIsEditing(false);
            handle(e.currentTarget.textContent || "");
        }
    };

    const handleClick = () => {
        setIsEditing("plaintext-only");
    };

    const handleBlur = (e: React.ChangeEvent<HTMLDivElement>) => {
        setIsEditing(false);
        handle(e.target.textContent || "");
    };

    const handleWritting = (e: React.ChangeEvent<HTMLDivElement>) => {
        setContent(e.target.textContent || "");
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
            onChange={handleWritting}
        >
            {content !== "" && content}
        </div>
    );
};