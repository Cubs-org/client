import clsx from "clsx";
import React from "react";

interface TextAreaProps {
    classNames?: string;
    value: string;
    placeholder?: string;
    outlineDisabled?: boolean;
    handle: (newValue: string) => void;
    updateOnChange?: boolean;
}

type TextAreaState = boolean | "plaintext-only";

export const TextArea = ({ 
    classNames, 
    value, 
    placeholder, 
    handle,
    outlineDisabled = false,
    updateOnChange = false
}: TextAreaProps) => {
    const [content, setContent] = React.useState<string>(value || "");
    const [isEditing, setIsEditing] = React.useState<TextAreaState>(false);
    const divRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        setContent(value);
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

    const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
        setIsEditing(false);
        handle(e.currentTarget.textContent || "");
    };

    const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
        const newValue = e.currentTarget.textContent || "";
        setContent(newValue);
        if (updateOnChange) {
            handle(newValue);
            // window.alert(newValue);
        }
    };

    React.useEffect(() => {
        if (isEditing && divRef.current) {
            const range = document.createRange();
            const sel = window.getSelection();
            const textNode = divRef.current.childNodes[0];
            if (textNode && textNode.nodeType === Node.TEXT_NODE) {
                range.setStart(textNode, content.length);
                range.collapse(true);
                sel?.removeAllRanges();
                sel?.addRange(range);
            }
        }
    }, [isEditing, content]);

    return (
        <div
            ref={divRef}
            className={clsx(
                "w-full min-h-[32px] h-full px-2 py-1 before:empty:content-[attr(data-placeholder)] before:text-light-500 dark:before:text-dark-500 cursor-text",
                { "outline-none": outlineDisabled },
                classNames
            )}
            data-placeholder={placeholder}
            // @ts-ignore
            contentEditable={isEditing}
            suppressContentEditableWarning={true}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            onInput={handleInput}
        >
            {content}
        </div>
    );
};
