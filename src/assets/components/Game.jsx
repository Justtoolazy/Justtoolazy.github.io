import  './StyleGame.css'
import Clues from './Game-clues'
import Paint from './Game-paint'
import PropTypes from 'prop-types'

export default function Game({storeQuestions, colorComb, userInput, updateUserInput, updateQuestion, score, highScore, Heart, giveCheck, checker, darkMode}) {
  const darkHeart = {
    color: !darkMode && "#00020A",
  }
  const darkHeartPic = {
    filter: !darkMode && "drop-shadow(0px 0px 10px red)"
  }
  const darkScore = {
    color: !darkMode && "white",
    textShadow: !darkMode && "0px 0px 20px rgba(0, 0, 0)"
  }
  return(
    <div className = "game--container">

      <div className = 'game--valued'>
        <div className = 'valued--heart' style={darkHeart}><h1>{Heart}</h1>
        <div className='--heart' style={darkHeartPic}></div>
        </div>
        <div className = 'valued--score'><h1 style={darkScore}>{score}</h1></div>
        <div className = 'valued--highScore'><h1 style={darkScore} >High Score: {highScore}</h1></div>
      </div>

      <div className = '--game'>
        <Paint 
          colorComb       = {colorComb}
        />
        <Clues 
          storeQuest      = {storeQuestions}
          colorComb       = {colorComb}
          userInput       = {userInput}
          updateQuestion  = {updateQuestion}
          updateUserInput = {updateUserInput}
          giveCheck       = {giveCheck}
          checker         = {checker}
          darkMode        = {darkMode}
        />
      </div>
    </div>
  )
}
Game.propTypes = {
  darkMode       : PropTypes.bool.isRequired,
  storeQuestions : PropTypes.array.isRequired,
  colorComb      : PropTypes.object.isRequired,
  userInput      : PropTypes.object.isRequired,
  updateQuestion : PropTypes.func.isRequired,
  updateUserInput: PropTypes.func.isRequired,
  score          : PropTypes.number.isRequired,
  highScore      : PropTypes.number.isRequired,
  Heart          : PropTypes.number.isRequired,
  giveCheck      : PropTypes.func.isRequired,
  checker        : PropTypes.object.isRequired
}