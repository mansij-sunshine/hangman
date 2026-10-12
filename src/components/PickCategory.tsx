
import './PickCategory.css'
import { useContext } from 'react'
import { GameContext } from './GameContext'
import {categories} from './constants'

const PickCategory = () => {
    const {setGameStatus, setCategory} = useContext(GameContext)
    const startGame = (userCategory:{id:number,name:string})=>{
    setCategory(userCategory.name.charAt(0).toUpperCase()+userCategory.name.slice(1).toLowerCase())
    setGameStatus('inprogress')
    }

    return (
        <div>
        <div className='categorymain'>
            <span onClick={()=>setGameStatus('menu')}></span>
            <p>Pick a Category</p>
        </div>
        <div className='allCategories'> 
            {categories.map(category=> <div key={category.id} className='category' onClick={()=>
            startGame(category)}
            >{category.name} </div>)}
        </div>
    </div>
)}

export default PickCategory;