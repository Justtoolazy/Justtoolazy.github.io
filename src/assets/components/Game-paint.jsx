import PropTypes from 'prop-types'
export default function Paint({colorComb})
{
  const {red, green, blue} = colorComb

  const paintColor = {
    backgroundColor: `rgb(${225 * (red/100)}, ${225 * (green/100)}, ${225 * (blue/100)})`
  }
  return(
    <div className="paint--container" style={paintColor}></div>
  )
}
Paint.propTypes = {
  colorComb: PropTypes.object.isRequired
}