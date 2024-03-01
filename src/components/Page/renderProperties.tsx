import { PagePropertiesProps, PageProps } from "../../interfaces/page";

import { BsHash, BsType } from "react-icons/bs";
import { LuSigma } from "react-icons/lu";
import { CiCalendar } from "react-icons/ci";
import { LuTags } from "react-icons/lu";
import { HiSelector } from "react-icons/hi";
import { IoCheckboxOutline } from "react-icons/io5";

import { Formula } from "./Properties/Formula";
import { Select } from "./Properties/Select";
import { MultiSelect } from "./Properties/MultiSelect";
import { Datetime } from "./Properties/Datetime";
import { Checkbox } from "./Properties/Checkbox";

export const renderIcon = (type) => {
    switch (type) {
        case "text":
            return <BsType size={18} />
        case "number":
            return <BsHash size={18} />
        case "datetime":
            return <CiCalendar size={18} />
        case "formula":
            return <LuSigma size={18} />
        case "select":
            return <HiSelector size={18} />
        case "multiselect":
            return <LuTags size={18} />
        case "checkbox":
            return <IoCheckboxOutline size={18} />
        default:
            return <BsType size={18} />
    }
}

export const renderPropertiesTitle = (properties:PagePropertiesProps[]) => {
    return properties.map((property, index) => (
        <th key={index} scope="col" className="cursor-col-resize text-left ring-1 ring-light-400 dark:ring-dark-700 px-2 py-1">
            <span className="w-full flex gap-2 items-center px-2 py-1 cursor-pointer">
                {renderIcon(property.type)}
                {property.title}
            </span>
        </th>
    ));
}

export const renderPropertiesData = (page:PageProps) => {
    if (page.properties)
        return page.properties.map((property, index) => (
            <td key={index} className="ring-1 ring-light-400 dark:ring-dark-700 px-3 py-1">
                {
                    property.type === "text" ? property.data.value :
                    property.type === "number" ? property.data.value :
                    property.type === "datetime" ? <Datetime dateValue={property.data} /> :
                    property.type === "select" ? <Select value={property.data.value} items={property.data.items} pageData={page} /> :
                    property.type === "multiselect" ? <MultiSelect value={property.data.tags} items={property.data.items} pageData={page} /> :
                    property.type === "formula" ? <Formula value={property.data.value as string} pageData={page}/> :
                    property.type === "checkbox" ? <Checkbox value={property.data.value} /> :
                    property.data.value
                }
            </td>
        ));
}