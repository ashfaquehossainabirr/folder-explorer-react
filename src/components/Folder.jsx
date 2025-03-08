import React, { useState } from 'react'

const Folder = ({ handleInsertNode, explorer }) => {
    console.log(explorer)
    const [expand, setExpand] = useState(false)
    const [showInput, setShowInput] = useState({
        visible: false,
        isFolder: null,
    })

    const handleNewFolder = (e, isFolder) => {
        e.stopPropagation()

        setExpand(true)

        setShowInput({
            visible: true,
            isFolder
        })
    }

    const onAddFolder = (e) => {
        if(e.keyCode === 13 && e.target.value) {
            handleInsertNode(explorer.id, e.target.value, showInput.isFolder)
            setShowInput({ ...showInput, visible: false })
        }
    }
    
    if(explorer.isFolder) {
        return (
            <>
                <div style={{ marginTop: 15, paddingLeft: 20, paddingRight: 20 }}>
                    <div className='folder' onClick={ () => setExpand(!expand) }>
                        <span>📁 { explorer.name }</span>

                        <div>
                            <button onClick={ (e) => handleNewFolder(e, true) }>Folder +</button>
                            <button onClick={ (e) => handleNewFolder(e, false) }>File +</button>
                        </div>
                    </div>
                </div>
    
                <div style={{ display: expand ? "block" : "none", paddingLeft: 45 }}>
                    {
                        showInput.visible && (
                            <div className="inputContainer">
                                <span>{ showInput.isFolder ? "📁" : "📄" }</span>

                                <input
                                    type="text" 
                                    className="inputContainer__input" 
                                    autoFocus 
                                    onKeyDown={ onAddFolder }
                                    onBlur={ () => setShowInput({ ...showInput, visible: false }) }
                                />
                            </div>
                        )
                    }
                    {
                        explorer.items.map((exp) => {
                            return(
                                // <span>{ exp.name }</span>
                                <Folder handleInsertNode={ handleInsertNode } explorer={ exp } key={ exp.id }/>
                            )
                        })
                    }
                </div>
            </>
        )
    } else {
        return(
            <span className='file'>📄 { explorer.name }</span>
        )
    }
}

export default Folder