

import { useState } from 'react'
import PickCategory from './components/PickCategory'
import PlayInstructions from './components/PlayInstructions'
import './App.css'
import { GameContext } from './components/GameContext'
import GameScreen from './components/GameScreen'


function App() {

const [gameStatus, setGameStatus] =  useState('menu')
const [endGameStatus, setEndGameStatus]=useState('');
const [selectedWord, setSelectedWord] = useState<string|undefined>(undefined);
const [category, setCategory]=useState('')

  return (
    <GameContext value={{gameStatus, setGameStatus, endGameStatus, setEndGameStatus, category,setCategory,selectedWord,setSelectedWord}}>
   <div className='mainbody'>
         {gameStatus == 'menu' &&
    <div className='startblock'>
        <div className='start'>
            <span className='logospan'></span>
            <span onClick={()=>setGameStatus('play')} className='playbutton'></span>
            <span className='instructions' onClick={()=>setGameStatus('help')}></span>
        </div>
    </div>
      }
      {gameStatus=='play' && <PickCategory/> }
      {gameStatus=='help' && <PlayInstructions/>}
      {gameStatus=='inprogress' && <GameScreen/>}

   </div>
   </GameContext>
  )
}

export default App
