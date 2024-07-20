import { CgMathPlus } from "react-icons/cg"
import { Button } from "../../../Button"

export const NewTool = () => {
    return <Button
        classNames="w-full py-1 justify-start mt-3 gap-x-1 font-semibold bg-purple-600 hover:bg-purple-500 hover:shadow-full dark:shadow-purple-500"
    ><CgMathPlus /> Novo item</Button>
}