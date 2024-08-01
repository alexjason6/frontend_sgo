import styled, { keyframes, css } from 'styled-components'

interface PropStyles {
  $light?: boolean
}

const load = keyframes`
  0%,
  5%,
  95%,
  100% {
    box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
  }
  10%,
  59% {
    box-shadow: 0 -0.83em 0 -0.4em, -0.087em -0.825em 0 -0.42em, -0.173em -0.812em 0 -0.44em, -0.256em -0.789em 0 -0.46em, -0.297em -0.775em 0 -0.477em;
  }
  20% {
    box-shadow: 0 -0.83em 0 -0.4em, -0.338em -0.758em 0 -0.42em, -0.555em -0.617em 0 -0.44em, -0.671em -0.488em 0 -0.46em, -0.749em -0.34em 0 -0.477em;
  }
  38% {
    box-shadow: 0 -0.83em 0 -0.4em, -0.377em -0.74em 0 -0.42em, -0.645em -0.522em 0 -0.44em, -0.775em -0.297em 0 -0.46em, -0.82em -0.09em 0 -0.477em;
  }
`

const round = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

export const Container = styled.div<PropStyles>`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.colors.grays.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999999;
  color: ${({ theme }) => theme.colors.white};

  ${({ theme, $light }) =>
    $light &&
    css`
      color: ${theme.colors.primary.dark};
      background: ${theme.colors.white};
    `};
`

export const Loader = styled.div<PropStyles>`
  color: ${({ theme }) => theme.colors.oranges.primary};
  font-size: 30px;
  text-indent: -9999em;
  overflow: hidden;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  margin: 72px auto;
  position: relative;
  transform: translateZ(0);
  animation: ${load} 1.7s infinite ease, ${round} 1.7s infinite ease;
`

export const Message = styled.p<PropStyles>`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
`
