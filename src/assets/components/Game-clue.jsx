
import PropTypes from 'prop-types'

export default function Clue({clueQuestion, colorPercentage, colorName, updateUserInput, userInput, checker, showChecker, darkMode})
{
  const paintColor  = {
    backgroundColor: `rgb(${colorPercentage})`
  }
  const chekcerColor= {
    backgroundImage: `url(../../../public/${checker ? 'ClueCorrect' : 'ClueWrong'}.png)`
  }
  const clueDark = {
    backgroundColor: !darkMode && "#00020abe",
    color: !darkMode && "white"
  }
  return(
    
    <div className="clues--clue">

      {showChecker && <div style={chekcerColor} className="--clue--checker"></div>}

      <div className='--clues--cont'>
        <div className="--clue" style={clueDark}> 
          <h1>{clueQuestion}</h1>
        </div>

        <div className = "paint--percentage" 
            style     = {paintColor}>{userInput}</div>
      </div>

      <input className = '--clue--range' 
             type      = "range" 
             min       = "0" 
             max       = "100" 
             step      = "10" 
             value     = {userInput} 
             name      = {colorName} 
             onChange  = {updateUserInput}>       
     </input>

    </div>
  )
}

Clue.propTypes = {
  clueQuestion   : PropTypes.any.isRequired,
  colorPercentage: PropTypes.string.isRequired,
  colorName      : PropTypes.string.isRequired,
  updateUserInput: PropTypes.func.isRequired,
  userInput      : PropTypes.number.isRequired,  
  checker        : PropTypes.bool.isRequired,
  showChecker    : PropTypes.bool.isRequired,
  darkMode       : PropTypes.bool.isRequired
}