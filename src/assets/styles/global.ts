import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
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

  .leaflet-attribution-flag {
    display: none !important;
  }
`
