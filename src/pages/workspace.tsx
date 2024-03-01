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
                {id: "1", type: "datetime", title: "Data", data: {start: "2024-02-29 00:00:00.000", end: "2024-03-01 00:00:00.000"}, trash: false},
                {id: "1", type: "select", title: "Categoria", data: { value: "Despesas", items:[
                    {name: "Salário", color: "green"},
                    {name: "Despesas", color: "red"},
                    {name: "Investimentos", color: "blue"},
                ]}, trash: false},
                {id: "1", type: "multiselect", title: "Tags", data: { tags: [
                    {name: "Salário", color: "green"},
                    {name: "Investimentos", color: "blue"},
                ], items:[
                    {name: "Salário", color: "green"},
                    {name: "Despesas", color: "red"},
                    {name: "Investimentos", color: "blue"},
                ]}, trash: false},
                {id: "1", type: "formula", title: "Resultado", data: {value: "'AAA'"}, trash: false},
                {id: "1", type: "checkbox", title: "Feito", data: {value: true}, trash: false}
            ]},
          ]}} 
          search={search} 
          notDisplayTitle 
        />
      </div>
  )
}

export default Workspace
  