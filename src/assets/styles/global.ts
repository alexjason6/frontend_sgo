import { styled, createGlobalStyle } from 'styled-components'

interface PropStyle {
  $modal?: boolean
}

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

  .no-scroll {
    overflow: hidden;
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

export const GlobalContainer = styled.main<PropStyle>`
  display: flex;
  height: ${({ $modal }) => $modal ? '100%' : '100vh'};
  flex-direction: column;
  background: ${({ theme }) => theme.colors.background};
`
