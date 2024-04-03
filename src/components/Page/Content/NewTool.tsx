import { CgMathPlus } from "react-icons/cg"
import { Button } from "../../Button"

export const NewTool = () => {
    return <Button
        classNames="w-full py-1 justify-start gap-1 font-semibold bg-purple-600 hover:bg-purple-700"
    ><CgMathPlus /> Novo item</Button>
}