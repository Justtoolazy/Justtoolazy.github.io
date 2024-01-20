import './StyleFinalScore.css'
import PropTypes from 'prop-types'

export default function ScoreMenu({restartGame, finalScore, hSFalsity}) {
  return(
    <div className='container--ScoreMenu'>
      <div className='exit--container' onClick={restartGame}>X</div>
      <div className='score--Container'>
      <h1>{finalScore}</h1>
      {hSFalsity && <h2>High Score</h2>}
      </div>
    </div>
  )
}
ScoreMenu.propTypes = {
  restartGame: PropTypes.func.isRequired,
  finalScore : PropTypes.number.isRequired,
  hSFalsity  : PropTypes.bool.isRequired
}