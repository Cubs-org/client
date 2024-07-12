import { Button } from "../../../components/Button";

import { FaAngleLeft, FaBell, FaCommentDots } from "react-icons/fa6";
import { PageLocation } from "./Location";
import { Members } from "./Members";
import { Badge } from "../../../components/Badge";
import updatedAtFormat from "../../../utils/datetime/updatedAtFormat";

export const Header = () => {

    // const { pathname } = useLocation();
    // const pageId = pathname.split("/").pop();

    const updatedAt = new Date();

    return (
        <header className="flex justify-between items-center gap-1 pb-2 lg:pb-1 border-b border-light-300 dark:border-dark-700">
            <section className="flex gap-2 md:gap-3 items-center">
                <PageLocation />

                <span
                    className="w-8 h-8 flex md:hidden items-center justify-center rounded-full cursor-pointer bg-light-300 dark:bg-dark-700 text-light-900 dark:text-dark-100"
                ><FaAngleLeft /></span>

                <span className="font-semibold text-sm text-light-900 dark:text-dark-100">{updatedAtFormat(`${updatedAt}`)}</span>
            </section>

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