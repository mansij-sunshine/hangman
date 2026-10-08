
import './PickCategory.css'
import { useContext } from 'react'
import { GameContext } from './GameContext'
import {categories} from './constants'

const PickCategory = () => {
    const {setGameStatus,setCategory} = useContext(GameContext)

    return (
        <div>
        <div className='categorymain'>
            <span onClick={()=>setGameStatus('menu')}></span>
            <p>Pick a Category</p>
        </div>
        <div className='allCategories'> 
            {categories.map(c=> <div key={c.id} className='category' onClick={()=>setCategory(c.name)}>{c.name} </div>)}
        </div>
    </div>
)}

export default PickCategory;