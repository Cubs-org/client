import clsx from "clsx";
import parseFormula from "../../utils/page/parseFormula";

export const Formula = ({ value }) => {
    const formulaValue = eval(value);
    const { text, color: formulaColor } = parseFormula(formulaValue);
    return (
        <div className={clsx("text-normal font-medium", {
            "text-red-500": formulaColor === "red",
            "text-green-500": formulaColor === "green",
            "text-blue-500": formulaColor === "blue",
            "text-yellow-500": formulaColor === "yellow",
            "text-orange-500": formulaColor === "orange",
            "text-purple-500": formulaColor === "purple",
            "text-pink-500": formulaColor === "pink",
            "text-indigo-500": formulaColor === "indigo",
            "text-gray-500": formulaColor === "gray",
            "text-light-500": formulaColor === "light",
        })}>
            {text}
        </div>
    )
}