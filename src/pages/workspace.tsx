import { DatabaseView } from "../components/DatabaseView"
import { Popover } from "../components/Popover"
import { Search } from "../components/Search"
import { useState } from "react"
import { WorkspaceFilterOptions } from "../components/Workspace/WorkspaceFilterOptions"
import { FaEllipsisVertical } from "react-icons/fa6"
  
function Workspace () {

  const [search, setSearch] = useState("")

  const [options, setOptions] = useState(false)

  const toggleOptions = () => setOptions(!options);

  return (
      <div>
          <header className="w-full flex flex-col-reverse gap-3 md:flex-row justify-between items-center px-2 py-3">
            
            <div className="w-full md:w-fit flex flex-col justify-center">
                <h1 
                    className="text-2xl md:text-3xl font-extrabold text-dark-400 dark:text-light-300"
                >Área de trabalho</h1>
                <span 
                    className="text-sm md:text-base text-dark-300 dark:text-light-500"
                >Total de projetos: 3</span>
            </div>

            <div className="w-full md:w-fit flex justify-end gap-2 items-center">

                <Search 
                    type="text"
                    placeholder="Pesquisar.." 
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)} 
                    iconVisible={search !== "" ? false : true}
                    classNames="w-full md:w-[300px]"
                />

                <Popover
                    direction="bottom-start"
                    content={<WorkspaceFilterOptions />}
                >
                    <div className="w-fit p-2">
                        <FaEllipsisVertical size={24} className="cursor-pointer" onClick={toggleOptions} />
                    </div>
                </Popover>


            </div>
        </header>

        <DatabaseView 
          view="grid" 
          data={{title: "Projetos", subdata: [
            {id: "1", title: "Projeto 1", ownerId: "Lucas", createdAt: "2021-09-01", updatedAt: "2021-09-01", trash: false, properties: [
                {id: "1", type: "text", title: "Descrição", data: {value: "Valor 1"}, trash: false},
                {id: "1", type: "number", title: "Valor 1", data: {value: "1"}, trash: false},
                {id: "1", type: "number", title: "Valor 2", data: {value: "1"}, trash: false},
                {id: "1", type: "formula", title: "Resultado", data: {value: "let n1=Number('|Valor 1|');let n2=Number('|Valor 2|');'text='+`Valor 1 + Valor 2 = ${n1+n2}`+';color=yellow'"}, trash: false},
            ]},
            {id: "2", title: "Projeto 2", ownerId: "Lucas", createdAt: "2021-09-01", updatedAt: "2021-09-01", trash: false, properties: [
                {id: "1", type: "text", title: "Descrição", data: {value: "Valor 2"}, trash: false},
                {id: "1", type: "number", title: "Valor 1", data: {value: "2"}, trash: false},
                {id: "1", type: "number", title: "Valor 2", data: {value: "2"}, trash: false},
                {id: "1", type: "formula", title: "Resultado", data: {value: "let n1=Number('|Valor 1|');let n2=Number('|Valor 2|');'text='+`Valor 1 + Valor 2 = ${n1+n2}`+';color=yellow'"}, trash: false},
            ]},
            {id: "3", title: "Projeto 3", ownerId: "Lucas", createdAt: "2021-09-01", updatedAt: "2021-09-01", trash: false, properties: [
                {id: "1", type: "text", title: "Descrição", data: {value: "Valor 3"}, trash: false},
                {id: "1", type: "number", title: "Valor 1", data: {value: "3"}, trash: false},
                {id: "1", type: "number", title: "Valor 2", data: {value: "3"}, trash: false},
                {id: "1", type: "formula", title: "Resultado", data: {value: "let n1=Number('|Valor 1|');let n2=Number('|Valor 2|');'text='+`Valor 1 + Valor 2 = ${n1+n2}`+';color=yellow'"}, trash: false},
            ]},
          ]}} 
          search={search} 
        //   notDisplayTitle 
        />
      </div>
  )
}

export default Workspace
  