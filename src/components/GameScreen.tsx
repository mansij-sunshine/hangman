
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
    
    const {category, selectedWord, setSelectedWord, setGameStatus} = useContext(GameContext)
    const hasWon = !!selectedWord &&
    [...selectedWord.toLowerCase()].every(c => c === ' ' || correctLetters.includes(c))
    const isSpecialChar = (ch:string) => /[^\p{L}\p{N}\s]/u.test(ch);

    useEffect(()=>{
        const selectedCategory:string = Object.keys(wordList.categories).find(x=>category.toLowerCase()==x.toLowerCase()) || ''
        const selectedCategoryWords = selectedCategory ? wordList.categories[selectedCategory as keyof typeof wordList.categories].map(w=>w.name) : undefined

        selectedCategoryWords && setSelectedWord(selectedCategoryWords[Math.floor(Math.random()*selectedCategoryWords.length)])
    }, [category])
    
    useEffect(()=>{
        health==0 && setStatus("You Lose") && setGameStatus('menu')
    },[health])

    useEffect(()=>{
        hasWon && health>0 && setStatus("You Win")
    },[hasWon])
   const isUsedLetter =(a:string)=> guessedLetters.includes(a.toLowerCase())||correctLetters.includes(a.toLowerCase()) 
    const handleKeyNav=(e:React.KeyboardEvent<HTMLButtonElement>)=>{
        if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) return;
        e.preventDefault();

        const buttons = (Array.from(e.currentTarget.parentElement!.children) as HTMLButtonElement[]).filter((b) => !b.disabled);

        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            const index = buttons.indexOf(e.currentTarget);
            buttons[index + (e.key === 'ArrowRight' ? 1 : -1)]?.focus();
            return;
        }

        const top = e.currentTarget.offsetTop;
        let target: HTMLButtonElement | undefined;
        if (e.key === 'ArrowDown') {
            target = buttons.find((b) => b.offsetTop > top);
        } else {
            const prevTop = Math.max(...buttons.map((b) => b.offsetTop).filter((t) => t < top));
            target = buttons.find((b) => b.offsetTop === prevTop);
        }
        target?.focus();
};
    return (
        <div className='maingamediv'> 
        <div className='burgermenu'>
            <button autoFocus onClick={()=>setStatus('Paused')}></button>
            <p>{category.toUpperCase()}</p>
            <ProgressBar health={health}/>
            <span></span>
        </div>
        <div className='answer'>
           {selectedWord && selectedWord.split(' ').map((word,wordIndex)=> {  return (
            <div className='mainanswer' key={wordIndex}>
            {word.split('').map((letter,letterIndex) => {
                return (
                    correctLetters.includes(letter.toLowerCase())||isSpecialChar(letter) ? <span key={letterIndex} className='correctLetters'>{letter.toUpperCase()}</span>:<span key={letterIndex} className='correctLetters'></span>
                )
            })}
             </div>
     
            )})}
        </div>
        <div className='letterOptions'>
           {allLetters.map((a,id)=> <button className={`allLetters ${isUsedLetter(a)? 'usedLetter':''}`} key={id} disabled={isUsedLetter(a)} onClick={()=>{
            setGuessedLetters((prev)=>[...prev,a.toLowerCase()])
            !selectedWord?.toLowerCase().includes(a.toLowerCase())&& setHealth((prev)=>prev-1)
            selectedWord && selectedWord.toLowerCase().includes(a.toLowerCase()) && setCorrectLetters((prev)=>[...prev,a.toLowerCase()])
           }}
            onKeyDown={(e)=>handleKeyNav(e)}
           >{a}</button>)}
        </div>
        {status.length>0 && ReactDOM.createPortal(<div className='overlay' onClick={()=>{
            status=="Paused" ? setStatus(''): setGameStatus('menu')}}><PauseMenu status={status} onClose={()=>setStatus('')}/></div>,document.body)}
        </div>
    )
}

export default GameScreen;