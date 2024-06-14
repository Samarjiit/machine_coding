import { useState } from "react"
import Folder from "./components/Folder"
import useTraverseTree from "./hooks/use-traverse-tree"
import "./App.css"
import explorer from "./data/folderData"

export default function App() {
  const [explorerData, setExplorerData] = useState(explorer)

  const { insertNode } = useTraverseTree()

  const handleInsertNode = (folderId, item, isFolder) => {
    const finalTree = insertNode(explorerData, folderId, item, isFolder)
    setExplorerData(finalTree)
  }

  return (
    <div className="App">
      <Folder handleInsertNode={handleInsertNode} explorer={explorerData} />
    </div>
  )
}

// fix connect script in latest video
// You have to implement a Nested comments UI in React JS. ( Screenshot attached below in resources )
// - The user can add comments directly.
// - The user can add a reply to any comment.
// - The user can add a reply to any comment which is a reply.
