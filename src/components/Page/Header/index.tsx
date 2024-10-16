import { Button } from "../../Button";

import { FaAngleLeft, FaBell, FaCommentDots } from "react-icons/fa6";
import { PageLocation } from "./Location";
import { Members } from "./Members";
import { Badge } from "../../Badge";
import updatedAtFormat from "../../../utils/datetime/updatedAtFormat";
import { usePage } from "../../../contexts/pageContext";
import { TextArea } from "../../TextArea";

export const Header = () => {
    
    const updatedAt = new Date();

    const { currentPage, setPageData, titleVisible } = usePage();

    const handleChangeTitle = (text: string) => {
        setPageData({ ...currentPage, title: text });
    }

    const { title } = currentPage;

    return (
        <header className="flex flex-nowrap justify-between items-center gap-1 pb-2 lg:pb-1 mb-3 border-b border-light-300 dark:border-dark-700">
            <section className="flex gap-2 md:gap-3 items-center flex-nowrap">
                <PageLocation />

                <span
                    className="w-8 h-8 flex md:hidden items-center justify-center rounded-full cursor-pointer bg-light-300 dark:bg-dark-700 text-light-900 dark:text-dark-100"
                ><FaAngleLeft /></span>

                <span className="font-semibold text-sm text-light-900 dark:text-dark-100 whitespace-nowrap">{updatedAtFormat(`${updatedAt}`)}</span>
            </section>

            {!titleVisible && (
                <div className="!max-w-[40%]">
                    <TextArea value={title} handle={handleChangeTitle} classNames="font-bold truncate underline underline-offset-8 text-center" outlineDisabled />
                </div>
            )}

            <div className="flex items-center gap-3">

                <Badge content={101}>
                    <Button
                        classNames="bg-transparent text-dark-700 dark:text-light-300 text-xl md:text-2xl rounded-md group-hover:bg-light-300 dark:group-hover:bg-dark-700 p-2 cursor-pointer"
                    >
                        <FaBell />
                    </Button>
                </Badge>
                <Badge content={20}>
                    <Button
                        classNames="bg-transparent text-dark-700 dark:text-light-300 text-xl md:text-2xl rounded-md group-hover:bg-light-300 dark:group-hover:bg-dark-700 p-2 cursor-pointer"
                    >
                        <FaCommentDots />
                    </Button>
                </Badge>

                {/* Members */}
                <Members />
            </div>
        </header>
    )
}