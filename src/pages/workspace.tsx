import { 
  // useState, 
  Suspense 
} from "react"
import { Header } from "../components/Workspace/Header"
import { Kanban } from "../components/Kanban"
import Loading from "../components/Loading"
import { Popover } from "../components/Popover"
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
          <div className="grid place-items-center">
            <Popover 
              direction="bottom"
              content={<div>aaaa</div>}
            >
                <div className="min-w-[200px] min-h-[200px] bg-green-600"></div>
            </Popover>
          </div>
      </Suspense>
  )
}

export default Workspace
  