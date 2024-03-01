import { PageProps } from "../../../interfaces/page";
import { formatDateToPreview } from "../../datetime/formatDateToPreview";

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
                    relationValue = eval(property?.data?.value as string || "'text=Vazio;color=red'");
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

export const getPropRelationFromFormula = (rowPage: PageProps, formula: string): string => {
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