import { styled, createGlobalStyle } from 'styled-components'

interface PropStyle {
  $modal?: boolean
  $obras?: boolean
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
export const Content = styled.section<PropStyle>`
  width: calc(100% - 50px);
  height: 100%;
  margin-left: 50px;
  display: flex;
  justify-content: center;
  align-items: ${({ $obras }) => !$obras ? 'center' : 'flex-start'};
`
