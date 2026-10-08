import { useContext } from 'react'
import { GameContext } from './GameContext'
import { instructions } from './constants'
import './PlayInstructions.css'

const PlayInstructions = () => {
     const {setGameStatus} = useContext(GameContext)
    return (
        <div>
                <div className='categorymain'>
                    <span onClick={()=>setGameStatus('menu')}></span>
                    <p>How to Play</p>
                </div>
                <div className='helpdetails'> 
                    {instructions.map(i=><div key={i.id}><p>{i.id}</p><p>{i.name}</p><p>{i.details}</p></div>)}
                </div>
        </div>
    )
}

export default PlayInstructions;