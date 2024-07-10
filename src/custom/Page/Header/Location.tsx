import { Link } from "react-router-dom";
import { Popover } from "../../../components/Popover";
import clsx from "clsx";
import minimizeText from "../../../utils/minimizeText";
import { usePage } from "../../../contexts/pageContext";
import { PageData } from "../../../interfaces/page";

export const PageLocation = () => {

    const {
        currentPage: { id },
        branch,
        setPageData
    } = usePage();

    const handleUpdatePageData = (page:PageData) => {
        setPageData(page);
    };

    return (
        <nav className="hidden md:flex items-center gap-0.5 text-sm">
            {(branch ?? []).length > 3 && (
                <Popover
                    direction="bottom-end"
                    classNames="font-normal"
                    content={
                        <ul className="p-1">
                            {branch.map((page, index) => {
                                // const prev_page = arr[index - 1] ?? {};

                                return (
                                    <li key={`${page.id}-${index}`}>
                                        <Link
                                            to={`/page/${page.id}`}
                                            onClick={() => handleUpdatePageData(page)}
                                            className={clsx("pr-2 p-1 flex items-center gap-1", {
                                                "text-light-900 dark:text-dark-100 underline": (id === page.id),
                                                "hover:bg-light-300 dark:hover:bg-dark-700 rounded-md cursor-pointer": (id !== page.id)

                                            })}
                                        >
                                            <div
                                                style={{
                                                    marginLeft: `${index}rem`
                                                }}
                                                className="text-xs"
                                            >└─ </div>
                                            {minimizeText(page.title, 40)}
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    }
                >.. /</Popover>
            )}

            {(branch ?? []).map((page, index) => {

                const _length: number = branch.length,
                    _limit: boolean = ([_length, (_length - 1)].includes(index + 1));

                return (
                    <div key={page.id} className="flex items-center gap-1">
                        {_limit && (
                            <Link
                                to={`/page/${page.id}`}
                                onClick={() => handleUpdatePageData(page)}
                                className={clsx("font-normal px-1 py-0.5 rounded-md", {
                                    "hover:bg-light-300 dark:hover:bg-dark-700 cursor-pointer": (index < ((page as any).length - 1))
                                })}
                            >{minimizeText(page.title, 15)}</Link>
                        )}
                        {_limit && (index < _length - 1) && "/"}
                    </div>
                )
            })}
        </nav>
    )
}