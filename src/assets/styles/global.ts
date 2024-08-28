import { styled, createGlobalStyle, css } from 'styled-components'
import { device } from './themes/devices'

const legendMobileStyles = css`
  @media ${device.mobileL}, ${device.mobileM}, ${device.mobileS} {
    text-align: center;
  }
`

interface PropStyle {
  $modal?: boolean
  $itens?: boolean
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
  align-items: ${({ $itens }) => !$itens ? 'center' : 'flex-start'};
`

export const Legend = styled.legend`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.grays.light};
  margin-left: 5px;
  margin-bottom: 3px;
  ${legendMobileStyles}

  sup {
    font-size: 12px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.danger.primary}
  }
`
