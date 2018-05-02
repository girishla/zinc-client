import * as React from 'react'
import styles from './styles';
import styled, { keyframes } from 'styled-components'

const shake = keyframes
  `
      0% {
        transform: translateX(0);
      }
      25% {
        transform: translateX(10px);
      }
      75% {
        transform: translateX(-10px);
      }
      100% {
        transform: translateX(0);
}
`

const ErrorDiv = styled.div`
  justify-content: center;
  max-width: 80%;
  margin: 0 auto;
  margin-bottom: 1em;
  animation: ${shake} 150ms ease-in-out;
  `

function ErrorMessage(props: any) {
  return (
    <ErrorDiv>
      <p style={styles.errorMessage}>
        {props.error}
      </p>
    </ErrorDiv>
  )
}

export default ErrorMessage
