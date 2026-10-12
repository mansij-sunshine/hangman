
import { useContext, useState,useEffect } from 'react'
import { GameContext } from './GameContext'
import './GameScreen.css'
import { allLetters } from './constants'
import wordList from "../../data.json"
import PauseMenu from './PauseMenu'
import ReactDOM from 'react-dom'
import ProgressBar from './ProgressBar'

const GameScreen = () =>{
    const [guessedLetters, setGuessedLetters] = useState<String[]>([])
    const [correctLetters, setCorrectLetters] = useState<String[]>([])
  
    const [health,setHealth] = useState(8)
    const [status,setStatus] = useState('')
    
    const {category, selectedWord, setSelectedWord} = useContext(GameContext)
    const hasWon = !!selectedWord &&
    [...selectedWord.toLowerCase()].every(c => c === ' ' || correctLetters.includes(c))


    useEffect(()=>{
        const selectedCategory:string = Object.keys(wordList.categories).find(x=>x==category.charAt(0).toUpperCase()+category.slice(1).toLowerCase()) || ''
        const selectedCategoryWords = selectedCategory ? wordList.categories[selectedCategory as keyof typeof wordList.categories].map(w=>w.name) : undefined
        selectedCategoryWords && setSelectedWord(selectedCategoryWords[Math.floor(Math.random()*selectedCategoryWords.length)])
    }, [category])

    useEffect(()=>{
        health==0 && setStatus("You Lose")
    },[health])

    useEffect(()=>{
        hasWon && health>0 && setStatus("You Win")
    },[hasWon])
   
    return (
        <div className='maingamediv'> 
        <div className='burgermenu'>
            <span onClick={()=>setStatus('Paused')}></span>
            <p>{category.toUpperCase()}</p>
            <ProgressBar health={health}/>
            <span></span>
        </div>
        <div className='answer'>
           {selectedWord && selectedWord.split(' ').map((word,wordIndex)=> {  return (
            <div className='mainanswer' key={wordIndex}>

            {word.split('').map((letter,letterIndex) => {
                return (
                <div key={letterIndex}>
                    {correctLetters.includes(letter.toLowerCase()) ? <div className='rotated correctLetters'><div>{letter.toUpperCase()}</div></div>:<div className='rotated correctLetters'></div>}        
                  </div>
                )
               
               
            })}
            {wordIndex < selectedWord.split(' ').length - 1 && (<span className='spaceLetter'></span>
    )}
             </div>
     
            )})}
            {/* {selectedWord && selectedWord.split(' ').map((word,wordIndex)=> ( 
            <div key={wordIndex}>
            {word.split('').map((letter,letterIndex)=>(
            <div key={letterIndex}>
            {correctLetters.includes(letter.toLowerCase()) && checkWin?.splice(checkWin?.indexOf(letter.toLowerCase()),1) ? <div className='rotated correctLetters'><div>{letter.toUpperCase()}</div></div>:<div className='rotated correctLetters'></div>}
            </div>
          
            
            ))}
            {wordIndex < selectedWord.split(' ').length - 1 && <span className='spaceLetter'></span>}
            </div>
            ))} */}
             {/* // (word==' ')?<span className='spaceLetter'></span>: */}
{/* <span className='spaceLetter'></span> */}
        </div>
        <div className='letterOptions'>
           {allLetters.map((a,id)=> <div className={`allLetters ${guessedLetters.includes(a.toLowerCase())||correctLetters.includes(a.toLowerCase()) ? 'usedLetter':''}`} key={id} onClick={()=>{
            setGuessedLetters((prev)=>[...prev,a.toLowerCase()])
            !selectedWord?.toLowerCase().includes(a.toLowerCase())&& setHealth((prev)=>prev-1)
            selectedWord && selectedWord.toLowerCase().includes(a.toLowerCase()) && setCorrectLetters((prev)=>[...prev,a.toLowerCase()])

           }}>{a}</div>)}
        </div>
        {status.length>0 && ReactDOM.createPortal(<div className='overlay' onClick={()=>setStatus('')}><PauseMenu status={status} onClose={()=>setStatus('')}/></div>,document.body)}
        </div>
    )
}

export default GameScreen;