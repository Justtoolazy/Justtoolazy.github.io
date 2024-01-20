import PropTypes from 'prop-types'
import './StyleMainMenu.css'
export default function MainMenu({restartGame}){
  return(
    <div className="MainMenu">
      <div className='popup--box'>
      <div className='--box--content'>
            <p>&ldquo;As I ventured to uncover the beauty of the universe and beyond, I encountered an uncertainty I couldn&apos;t resolve. I yearned to paint the endless void; can you assist me in choosing the perfect palette to breathe life into it?&rdquo; - ME</p>
          </div>
          <div className='--box--buttons'>
            <div className='--box--Play' onClick={restartGame}><h4>Play</h4></div>
          </div>
      </div>
    </div>
  )
}

MainMenu.propTypes = {
  restartGame: PropTypes.func.isRequired
}
