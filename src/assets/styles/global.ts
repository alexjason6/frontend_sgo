import { styled, createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Open Sans', sans-serif;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    background-color: ${({ theme }) => theme.colors.background};
    font-size: 16px;
  }

  button {
    cursor: pointer;
  }

  a, a:hover, a:visited, a:active {
    text-decoration: none;
  }

  p {
    font-size: 12px;
  }
`

export const GlobalContainer = styled.main`
  display: flex;
  height: 100vh;
  flex-direction: column;
  padding-bottom: 30px;
`
