import { PagePropertiesProps, PageProps } from "../../interfaces/page";

import { BsHash, BsType } from "react-icons/bs";
import { LuSigma } from "react-icons/lu";
import { CiCalendar } from "react-icons/ci";
import { Formula } from "./Properties/Formula";

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
        default:
            return <BsType size={18} />
    }
}

export const renderPropertiesTitle = (properties:PagePropertiesProps[]) => {
    return properties.map((property, index) => (
        <th key={index} scope="col">
            <span className="w-full flex gap-2 items-center px-2 py-1">
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
                    property.type === "datetime" ? property.data.value :
                    property.type === "formula" ? <Formula value={property.data.value as string} rowPage={page}/> :
                    property.data.value
                }
            </td>
        ));
}