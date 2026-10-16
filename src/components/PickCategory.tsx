
import './PickCategory.css'
import { useContext } from 'react'
import { GameContext } from './GameContext'
import {categories} from './constants'

const PickCategory = () => {
    const {setGameStatus, setCategory, setSelectedWord} = useContext(GameContext)
    const startGame = (userCategory:{id:number,name:string})=>{
    setCategory(userCategory.name.charAt(0).toUpperCase()+userCategory.name.slice(1).toLowerCase())
    setGameStatus('inprogress')
    setSelectedWord(undefined)
    }

    return (
        <div className='pickCategory'>
        <div className='categorymain'>
            <button autoFocus onClick={()=>setGameStatus('menu')}></button>
            <p>Pick a Category</p>
        </div>
        <div className='allCategories'> 
            {categories.map(category=> <button key={category.id} className='category' onClick={()=>
            startGame(category)}
            >{category.name} </button>)}
        </div>
    </div>
)}

export default PickCategory;