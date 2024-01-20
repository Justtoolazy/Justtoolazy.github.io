/*Main-Logic*/
import { useCallback, useState, useEffect } from 'react'
import Navbar    from './assets/components/Navbar'
import Game      from './assets/components/Game'
import Data      from './Data-Clues'
import Loading   from './assets/components/AppLoading'
import MainMenu  from './assets/components/MainMenu'
import FinalScore from './assets/components/FinalScore.jsx'

export default function App() 
{
 /*     state/variables declaration     */ 
//Darkmode
  const [darkMode, setDarkMode] = useState(true)
//Loading
  const [isLoading, setIsLoading] = useState(true)
//sound source
  const [sound] = useState([
    'sound0Heart.wav',
    'soundBG.mp3',
    'soundHScore.wav',
    'soundSolved.wav',
    'soundWrong.mp3',
    'soundScore.wav'
  ])
//sound Effect for highscore/justScored and gameover
  const [soundHS, setSoundHS] = useState(false)
//RunGame function purposes 
  const [runGame, setRunGame] = useState(false)
//Switch Menu
  const [switchMenu, setSwitch] = useState (false)
//Data-Questions
  const [Questions, setQuestions] = useState([])
//Heart 
  const [Heart, setHeart] = useState(5)
//Scoring
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [hSFalsity, setHSFalsity] = useState(false)
//3 questions will be stored here
  const [storeQuestions, setStoreQuestions] = useState([
    {id: 0, question: ""},
    {id: 0, question: ""},
    {id: 0, question: ""}
  ])
//User Color Combination state
  const [userInput, setUserInput] = useState({
    red: 0, green: 0, blue: 0
  })
//Color Combination state
  const [colorComb, setColorComb] = useState({
    red: 0, green: 0, blue: 0 
  })
//Checker the 3 right and wrong
  const [checker, setChecker] = useState({
    red: false,  green: false, blue: false
  })


 /*     functionality     */ 
//isLoading
  useEffect(() => 
  {
    setTimeout(() => { setIsLoading(false); }, 4500); 
  }, []);
//soundEffect
  const soundEffect = useCallback((indexSound) => 
  {
    const audio =  
    new Audio(`../public/${sound[indexSound]}`)
    audio.play()
  }, [sound])
//Data-Questions - storing
  useEffect(() => 
  {
    const newQuestions = Data.map(questioning => 
      {return(
        {
          id      : questioning.id,
          question: questioning.question
        })})
    setQuestions(newQuestions)
  }, [])
//darkMode toggling
  const toggleDarkMode = () => 
  {
    setDarkMode(prevDarkMode => !prevDarkMode)
  }
//Heart
  const handleHeart = (red, green, blue) => 
  {
    const rgbfalsety = red & green & blue
    !rgbfalsety && setHeart(prevHeart => 
     {const preventN0 = Heart < 1 ? 0 : 1
      return( prevHeart -= preventN0)}
    )
    // solved : not solved
    rgbfalsety ? soundEffect(3) : soundEffect(4)
  }
  useEffect(() => 
  {
    if (Heart === 0) {
      setRunGame(false)
      setSwitch(true)
      setUserInput({red: 0, green: 0, blue: 0})
      setColorComb({red: 0, green: 0, blue: 0})
      soundHS ? soundEffect(2) : soundEffect(5)
    }
  }, [Heart, soundHS, soundEffect]);
//Heart-End
//randomizer function for 3 questions
  const updateQuestion = () => 
  {
    const arrContainerQ = []
    const readyStoreQ   = []
    /* RGB */
    const idToColor     = []
    //arrContainerQ
    for(let nQ = 0; nQ < 3; nQ++) {
      let randQuest = Math.round((Math.random()*10));
      arrContainerQ.push((Questions && Questions[randQuest]))
    }
    //readyStoreQ and idToColor
    for(let cont of arrContainerQ)
    {
      const {id, question} = cont
      const pickQuestion   = Math.round((Math.random()*question.length));
      /* RGB */
      readyStoreQ.push({id: id, question: question[pickQuestion] || `${id} + 10 + 50 + 5 + 9 + 6 + 20`})
      idToColor.push(id)
    }
    setStoreQuestions(readyStoreQ)
    setColorComb({ red: idToColor[0], green: idToColor[1], blue: idToColor[2]})
  }
//function for updating users input
  const updateUserInput = (event) => 
  {
    setUserInput(prevUserInput => 
    {
      const {value, name} = event.target
      const parsedValue = parseInt(value);
      return({
            ...prevUserInput,
          [name]: parsedValue
              })
    })
  }
//adding a 10 pts score 
  const funcScore = useCallback(() => 
  {
    let storeScore = 0
    const {red, green, blue} = checker
    red   ? storeScore += 10: storeScore += 0
    green ? storeScore += 10: storeScore += 0
    blue  ? storeScore += 10: storeScore += 0
    setScore(prevScore => {
      return( prevScore += storeScore)})
  }, [checker])
  useEffect(()=> {
    funcScore()
  }, [checker, funcScore])
//Comparing the Userinputs and Color combination
  const giveCheck = () => 
  {
    const {red, green, blue} = userInput
    const redCc              = colorComb.red
    const greenCc            = colorComb.green
    const blueCc             = colorComb.blue
    
    const contRed = red === redCc ? true : false
    const contGreen = green === greenCc ? true : false
    const contBlue = blue === blueCc ? true : false
    setChecker({
      red  : contRed,
      green : contGreen,
      blue: contBlue
    })
    handleHeart(contRed, contGreen, contBlue)

    if(contRed & contGreen & contBlue) {
      updateQuestion()
      setUserInput({red: 0, green: 0, blue: 0})
    }
  }
//funtion to restart
  const restartGame = () => {
    soundEffect(0)
    updateQuestion()
    setScore(0)
    setHeart(5)
    setUserInput({red: 0, green: 0, blue: 0})
    setRunGame(true)
  }

// Main backgroundSound
const [bgAudio] = useState(new Audio(`../public/${sound[1]}`));
const playBGSound = useCallback(() => {
  bgAudio.play()
}, [bgAudio]);

useEffect(() => {
  if (runGame) {
    playBGSound();
  } else {
    bgAudio.pause();
    bgAudio.currentTime = 0;
  }
}, [runGame, bgAudio, playBGSound]);

//highscore
useEffect(() => {
  setHighScore(highScore <= score ? score : highScore, setSoundHS(score === 0 ? false 
          : (score > highScore ? false : true)))
  highScore <= score ? setHSFalsity(true) : setHSFalsity(false) 
}, [score, highScore, soundHS]);
// Loop
useEffect(() => {
  const handleAudioEnded = () => {
    if (runGame) {
      bgAudio.currentTime = 0;
      playBGSound();
    }
  };
    bgAudio.addEventListener('ended', handleAudioEnded);
    // Cleanup: Remove the event listener 
    return () => {
      bgAudio.removeEventListener('ended', handleAudioEnded);
    };
  }, [runGame, bgAudio, playBGSound]);

  const Emptyfunct = () => {
    /* To disable function */
  }
  /*Background DarkMode */
  const body = document.body
  body.style.backgroundImage = `url(../public/${!darkMode ? 'GameBGDark.jpg' : 'GameBGLight.jpg'})`

  return(
    <div>
        {isLoading ? (<Loading />) : (
        <div>
          {!switchMenu ? (!runGame  && <MainMenu 
              restartGame    = {restartGame}
          />)
          :
          (!runGame  && <FinalScore 
            restartGame    = {restartGame}
            finalScore     = {score}
            highScore      = {soundHS}
            hSFalsity      = {hSFalsity}
        />)
          }
          <Navbar 
            darkMode       = {darkMode}
            toggleDarkMode = {toggleDarkMode}
            restartGame    = {!runGame ? Emptyfunct : restartGame}
          />
          <Game 
            darkMode       = {darkMode}
            storeQuestions = {storeQuestions}
            colorComb      = {colorComb}
            updateQuestion = {!runGame ? Emptyfunct : updateQuestion}
            userInput      = {userInput}
            updateUserInput= {!runGame ? Emptyfunct : updateUserInput}
            score          = {score}
            highScore      = {highScore} 
            Heart          = {Heart}
            giveCheck      = {!runGame ? Emptyfunct : giveCheck}
            checker        = {checker}
          />
        </div>
        )}
    </div>
  )
}
