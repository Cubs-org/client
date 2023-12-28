import { 
  // useState, 
  Suspense 
} from "react"
import { Header } from "../components/Workspace/Header"
import { Kanban } from "../components/Kanban"
import Loading from "../components/Loading"
// import { EmojiPicker } from "../src/components/EmojiPicker"
  
function Workspace () {

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

export default Workspace
  