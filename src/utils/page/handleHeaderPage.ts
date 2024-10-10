import { ChangeAction, PageData } from "../../types/page";

export default function handlePage(pageData:PageData, setPageData:ChangeAction) {
    switch (setPageData.type) {
        case "title":
            // console.log("title", setPageData.payload)
            return {
                ...pageData,
                title: setPageData.payload
            }
        case "icon":
            // console.log("icon", setPageData.payload)
            return {
                ...pageData,
                data: {
                    ...pageData.data,
                    icon: setPageData.payload
                }
            }
        default:
            return pageData;
    }
}