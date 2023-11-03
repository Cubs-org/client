import { Suspense } from "react";
import { Kanban } from "./components/Kanban";
import Loading from "./components/Loading";

function App () {
  return (
      <Suspense fallback={<Loading />}>
          <div className="p-2">
            <h1 className="text-4xl font-extrabold text-dark-400 dark:text-light-300">Meus Projetos</h1>
            <h3 className="text-base font-bold text-dark-400 dark:text-light-700">{"03 para fazer | 10 em andamento | 05 concluídos | Total: 18"}</h3>
            <Kanban />
          </div>
      </Suspense>
  )
}

export default App
