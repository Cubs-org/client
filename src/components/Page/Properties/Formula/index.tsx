import clsx from "clsx";
import parseFormula from "../../../../utils/page/formulaProperty/parseFormula";
import { PageProps } from "../../../../interfaces/page";
import { getPropRelationFromFormula } from "../../../../utils/page/formulaProperty/relations";
import { Popover } from "../../../Popover";

interface FormulaProps {
    value: string;
    pageData: PageProps;
}

export const Formula = ({ value, pageData }:FormulaProps) => {

    const formula = getPropRelationFromFormula(pageData, value);

    const formulaValue = (() => {
        try {
            return eval(formula);
        } catch (error) {
            return "text=Erro;color=red";
        }
    })();

    const { text, color } = parseFormula(formulaValue);

    return (
        <Popover
            // content={formula}
            content="formula"
            direction="top"
            width="100%"
        >
            <div className={clsx("px-2 text-normal font-medium", {
                "text-red-500": color === "red",
                "text-green-500": color === "green",
                "text-blue-500": color === "blue",
                "text-yellow-500": color === "yellow",
                "text-orange-500": color === "orange",
                "text-purple-500": color === "purple",
                "text-pink-500": color === "pink",
                "text-indigo-500": color === "indigo",
                "text-gray-500": color === "gray",
                "text-light-500": color === "light"
            })}>
                <span className="text-base font-medium">{text}</span>
            </div>
        </Popover>
    )
}