import { 
  // useState, 
  Suspense 
} from "react"

import { Kanban } from "./components/Kanban"
import Loading from "./components/Loading"
import { Header } from "./components/Workspace/Header"
// import { EmojiPicker } from "../src/components/EmojiPicker"

function App () {

  // const [emoji, setEmoji] = useState("🚀")

  return (
      <Suspense fallback={<Loading />}>
          <Header />
          <Kanban />
          {/* <EmojiPicker 
            emoji={emoji} 
            setEmoji={setEmoji} 
          /> */}
      </Suspense>
  )
}

export default App
