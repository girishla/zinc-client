import * as React from 'react'

function ErrorMessage(props: any) {
  return (
    <div className='form__error-wrapper js-form__err-animation'>
      <p className='form__error'>
        {props.error}
      </p>
    </div>
  )
}

// ErrorMessage.propTypes = {
//   error: React.PropTypes.string
// }

export default ErrorMessage
