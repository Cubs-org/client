import { Suspense } from "react";
import { Kanban } from "./components/Kanban";
import Loading from "./components/Loading";
import { Header } from "./components/Workspace/Header";

function App () {
  return (
      <Suspense fallback={<Loading />}>
          <Header />
          <Kanban />
      </Suspense>
  )
}

export default App
