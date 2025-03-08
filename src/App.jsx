import React, { useState } from 'react'
import './App.css'

// Data
import explorer from './data/folderData.js'

// Components
import Folder from './components/Folder.jsx'
import useTraverseTree from './hooks/useTraverseTree.js'

const App = () => {
  const [explorerData, setExplorerData] = useState(explorer)

  const { insertNode } = useTraverseTree()

  const handleInsertNode = (folderId, item, isFolder) => {
    const finalTree = insertNode(explorerData, folderId, item, isFolder)

    setExplorerData(finalTree)
  }

  return (
    <div>
      <Folder handleInsertNode={ handleInsertNode } explorer={ explorerData }/>
    </div>
  )
}

export default App