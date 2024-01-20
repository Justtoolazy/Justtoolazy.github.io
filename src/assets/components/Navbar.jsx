import './StyleNavbar.css'
import PropTypes from 'prop-types'
import { useState, useEffect} from 'react'
export default function Navbar({darkMode, toggleDarkMode, restartGame}) {
  /*Styling darkMOode */
  const darkShade = 
  {
    backgroundColor: !darkMode ? '#000414' : '#ADBDFF',
    color: !darkMode ? '#E6EAFF' : '#00020A'
  }
  const darkShadeButton = 
  {
    Shade: {backgroundColor: darkMode ? '#000414' : '#ADBDFF'},
    Shade2:{backgroundColor: darkMode ? '#ADBDFF' : '#000414',
            marginLeft: darkMode ? '' : '50%'
    }
  }
  const darkMenu = {
    backgroundImage: `url(../../../public/${darkMode ? 'menu-dark.png': 'menu-light.png'})`
  }
  const darkTryAgain = {
    backgroundColor: darkMode ? '#FEE67B' : '#DEB602',
    color: darkMode ? '#000414' : 'white',
    border: darkMode && '0.1rem solid black'
  }
  const darkVolume = {
    backgroundColor: darkMode ? '#000414' : '#ADBDFF'
  }
  const darkClose = {
    backgroundImage: `url(../../../public/${darkMode ? 'x-dark.png': 'x-light.png'})`
  }

  /*toggling NavMenuSettings*/
  const [mainSetting, setMainSetting] = useState(false)
  const changeMainSet = () => {
    setMainSetting(!mainSetting)
  }
  const toggleMune = {
    display: mainSetting ? 'block' : 'none'
  }
  //for sizewidth
  const [deviceWidth, setDeviceWidth] = useState(0)
  useEffect(() => {
    const handleResize = () => {
      setDeviceWidth(window.innerWidth)
      deviceWidth >= 650 && setMainSetting(false)
    }
    window.addEventListener('resize', handleResize)
    
    return () => {
      window.removeEventListener('resize', handleResize)
    }
    
  }, [deviceWidth])

  const tryAgainNav = () => {
    changeMainSet()
    restartGame()
  }

  return(
      <div className="Navbar" style={darkShade}>

        <div className='nav--logo'></div>

        <ul className='nav--items'>
          <li>
            <div className='nav--item'>Score History</div>
          </li>
          <li>
            <div className='nav--item'>Tutorial</div>
          </li>
          <li>
            <div className='nav--item'>About</div>
          </li>
        </ul>

        <div className='nav--settings'>

          <div className = 'nav--tryAgain' 
               onClick   = {restartGame} 
               style     = {darkTryAgain}>
            <h3>Try Again</h3>
          </div>

          <div className = 'nav--volume' 
               style     = {darkVolume}/>

          <div className = 'nav--button' 
               onClick   = {toggleDarkMode} 
               style     = {darkShadeButton.Shade}>
            <div className = '--button--circle' 
                 style     = {darkShadeButton.Shade2}/>
          </div>
        </div>
        
        <div className = 'settings--menu' 
             onClick   = {changeMainSet} 
             style     ={darkMenu}/>

        <div className = 'page--menuSettings' 
             style     = {toggleMune} onClick={changeMainSet}>
        
          <div className = '--menuSettings--box' 
               onClick   = {(event) => {event.stopPropagation()}} style={darkShade}>
              <h1>MENU</h1>
              {deviceWidth <= 400  && 
              <div className = '--box--close' 
                    style    ={darkClose}  
                    onClick  = {changeMainSet}
              />}
              <nav className='box--nav'>
                {deviceWidth <= 400  && 
                <>
                <div onClick   = {tryAgainNav}
                >Try Again</div>
                <div onClick   = {toggleDarkMode}
                >Dark Mode</div>
                </>
                }
                <div>Score History</div>
                <div>Tutorial</div>
                <div>About</div>
              </nav>
          </div>
        </div>

      </div>
  )
}

Navbar.propTypes = {
  darkMode      : PropTypes.bool.isRequired,
  toggleDarkMode: PropTypes.func.isRequired,
  restartGame   : PropTypes.func.isRequired
}
