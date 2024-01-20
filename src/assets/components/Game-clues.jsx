import Clue      from "./Game-clue"
import PropTypes from 'prop-types'

export default function Clues({storeQuest, userInput, updateUserInput, giveCheck, checker, darkMode}) 
{
  const {red, green, blue} = userInput
  const showChecker = checker.red & checker.green & checker.blue
  const clueDark = {
    backgroundColor: !darkMode && " #00020A",
    color: !darkMode && "white"
  }
  return(
    <div className="clues--container">
      <Clue 
        clueQuestion    = {storeQuest[0].question}
        colorPercentage ={`${225 * (red/100)}, 0, 0`}
        colorName       ={'red'}
        userInput       ={red/1}
        updateUserInput ={updateUserInput}
        checker         ={checker.red}
        showChecker     ={!showChecker}
        darkMode        ={darkMode}
      />
      <Clue 
        clueQuestion    ={storeQuest[1].question}
        colorPercentage ={`0, ${225 * (green/100)}, 0`}
        colorName       ={'green'}
        userInput       ={green/1}
        updateUserInput ={updateUserInput}
        checker         ={checker.green}
        showChecker     ={!showChecker}
        darkMode        ={darkMode}
      />
      <Clue 
        clueQuestion    = {storeQuest[2].question}
        colorPercentage ={`0, 0, ${225 * (blue/100)}`}
        colorName       ={'blue'}
        userInput       ={blue/1}
        updateUserInput ={updateUserInput}
        checker         ={checker.blue}
        showChecker     ={!showChecker}
        darkMode        ={darkMode}      
      />
      <div className='check--result'
            style = {clueDark} 
           onClick ={giveCheck}>Check</div>
    </div>
  )
}

Clues.propTypes = {
  storeQuest     : PropTypes.array.isRequired,
  colorComb      : PropTypes.object.isRequired,
  userInput      : PropTypes.object.isRequired,
  updateUserInput: PropTypes.func.isRequired,
  giveCheck      : PropTypes.func.isRequired,
  checker        : PropTypes.object.isRequired,
  darkMode       : PropTypes.bool.isRequired
}