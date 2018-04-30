import * as React from 'react'
import LoadingIndicator from './LoadingIndicator'

function LoadingButton(props: any) {
  return (
    <a href='#' className={props.className + ' btn btn--loading'} >
      <LoadingIndicator />
    </a>
  )
}

// LoadingButton.propTypes = {
//   className: React.PropTypes.string
// }

export default LoadingButton
