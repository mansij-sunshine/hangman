import { useContext } from 'react'
import { GameContext } from './GameContext'
import "./PauseMenu.css"
import type { PauseMenuProps } from '../types'


const PauseMenu = ({status, onClose}: PauseMenuProps)=>{
    const { setGameStatus} = useContext(GameContext)

    return (
    <div className="mainpausemenu" onClick={(e) => e.stopPropagation()}>
        <span>{status}</span>
        {status=="Paused" ? <button autoFocus onClick={()=>{setGameStatus('inprogress'); onClose();}}>CONTINUE</button>:
        <button autoFocus onClick={()=>{setGameStatus('play'); onClose();}}>PLAY AGAIN!</button>}
        <button onClick={()=>{setGameStatus('play'); onClose();}}>NEW CATEGORY</button>
        <button onClick={()=>{setGameStatus('menu'); onClose();}}>QUIT GAME</button>
    </div>)
}

export default PauseMenu;