import { PagePropertiesProps, PageProps } from "../../types/page";

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
import { ColumnTable } from "../Hub/ColumnTable";
import { Text } from "../Hub/Table/Cell/Text";

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
        case "selection":
            return <HiSelector size={18} />
        case "multi_selection":
            return <LuTags size={18} />
        case "checkbox":
            return <IoCheckboxOutline size={18} />
        default:
            return <BsType size={18} />
    }
}

export const renderPropertiesTitle = (
    properties:PagePropertiesProps[],
    handleDrop: (e: React.DragEvent<HTMLDivElement>) => void
) => {
    return properties
        .sort((a, b) => (a.data.loadOrder ?? 0) - (b.data.loadOrder ?? 0))
        .map((property, index) => (
            <ColumnTable 
                key={`${property.title}-${index}`} 
                title={property.title} 
                type={property.type}
                value={property.data.value}
                width={property?.data?.width || 200}
                loadOrder={property?.data?.loadOrder || 0}
                id={property.id}
                handleDrop={handleDrop}
            />
        ));
}

export const renderPropertiesData = (page:PageProps) => {
    if (page.properties) {
        return page.properties
            .sort((a, b) => (a.data.loadOrder ?? 0) - (b.data.loadOrder ?? 0))
            .map((property, index) => (
                <td key={index} className="border border-light-400 dark:border-dark-700 hover:border-light-300 hover:dark:border-dark-600 break-all">
                    {
                        property.type === "text" ? <Text value={property.data.value as string} classNames="break-words" /> :
                            property.type === "number" ? <Text value={property.data.value as string} classNames="break-words" /> :
                                property.type === "datetime" ? <Datetime dateValue={property.data} /> :
                                    property.type === "selection" ? <Select value={property.data.value} items={property.data.items} pageData={page} /> :
                                        property.type === "multi_selection" ? <MultiSelect tags={property.data.tags} items={property.data.items} pageData={page} /> :
                                            property.type === "formula" ? <Formula value={property.data.value as string} pageData={page} /> :
                                                property.type === "checkbox" ?
                                                    <span
                                                        className="w-full grid place-items-center"
                                                    ><Checkbox value={property.data.value as boolean} /></span> :
                                                    property.data.value
                    }
                </td>
            ));
    }
}