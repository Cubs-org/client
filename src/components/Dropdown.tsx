import { SelectHTMLAttributes } from "react";

interface DropdownProps extends SelectHTMLAttributes<HTMLSelectElement> {
    items: {
        name: string;
        onClick?: () => void;
    }[];
    props?: any;
}
 
export const Dropdown = ({ items, ...props }:DropdownProps) => {
    return (
        <select {...props}>
            {items.map((item, index) => (
                <option 
                    key={`${index}-${item.name}`} 
                    value={item.name || index || "value"}
                    onClick={item.onClick}
                >
                    {item.name}
                </option>
            ))}
        </select>
    );
}