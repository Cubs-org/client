import clsx from "clsx";
import parseFormula from "../../../utils/page/parseFormula";
import { PageProps } from "../../../interfaces/page";
import { formatDateToPreview } from "../../../utils/datetime/formatDateToPreview";

interface FormulaProps {
    value: string;
    rowPage: PageProps;
}

export const Formula = ({ value, rowPage }:FormulaProps) => {
    // const formulaValue = eval(value);
    // const { text, color: formulaColor } = parseFormula(formulaValue);

    const getPropertyValue = (rowPage:PageProps, relationName) => {
        let relationValue;

        if (relationName === "Título")
            relationValue = rowPage.title;
        else if (relationName === "Criado em")
            relationValue = rowPage.createdAt;
        else if (relationName === "Atualizado em")
            relationValue = rowPage.updatedAt;
        else if (relationName === "Deletado")
            relationValue = rowPage.trash;
        else{
            if (rowPage.properties) {
                const property = rowPage.properties.find(property => property.title === relationName);
                switch (property?.type) {
                    case "text":
                        relationValue = property?.data?.value;
                        break;
                    case "number":
                        relationValue = property?.data?.value;
                        break;
                    case "formula":
                        relationValue = eval(property?.data?.value || "'text=Vazio;color=red'");
                        break;
                    case "datetime":
                        if (property?.data?.start && property?.data?.end) {
                            const start = formatDateToPreview(property?.data?.start || new Date().toISOString()),
                                end = formatDateToPreview(property?.data?.end || new Date().toISOString());
                            relationValue = `${start}-${end}`;
                        }
                        break;
                    default:
                        relationValue = property?.data?.value || "'text=Vazio;color=red'";
                        break;
                }
            }
        }

        return relationValue;
    }

    const getPropRelationFromFormula = (rowPage: PageProps, formula: string): string => {
        const matches = formula.match(/\|[^|]+\|/g); // Encontrar todas as ocorrências de marcadores de propriedades
    
        if (!matches) return formula; // Se não houver marcadores, retornar a fórmula original
    
        let result = formula;
    
        matches.forEach(match => {
            const relationName = match.substring(1, match.length - 1); // Extrair o nome da propriedade do marcador
            console.log(relationName);
            const relationValue = getPropertyValue(rowPage, relationName); // Obter o valor da propriedade
    
            // Substituir o marcador pelo valor correspondente
            result = result.replace(match, relationValue || "");
        });
    
        return result;
    };


    const formula = getPropRelationFromFormula(rowPage, value);

    const formulaValue = eval(formula);
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