import { useContext } from 'react'
import { GameContext } from './GameContext'
import "./PauseMenu.css"
import type { PauseMenuProps } from '../types'


const PauseMenu = ({status, onClose}: PauseMenuProps)=>{
    const { setGameStatus} = useContext(GameContext)

    return (
    <div className="mainpausemenu" onClick={(e) => e.stopPropagation()}>
        <span>{status}</span>
        {status=="Paused" ? <div onClick={()=>{setGameStatus('inprogress'); onClose();}}>CONTINUE</div>:
        <div onClick={()=>{setGameStatus('play'); onClose();}}>PLAY AGAIN!</div>}
        <div onClick={()=>{setGameStatus('play'); onClose();}}>NEW CATEGORY</div>
        <div onClick={()=>{setGameStatus('menu'); onClose();}}>QUIT GAME</div>
    </div>)
}

export default PauseMenu;