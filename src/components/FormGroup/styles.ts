import styled, { css } from 'styled-components'

interface PropStyles {
  oneOftree?: boolean
  oneOfFour?: boolean
  oneOfFive?: boolean
  passwordChange?: boolean

}

export const Container = styled.div<PropStyles>`
  & + & {
    margin-top: 0px !important;
  }

  width: 100%;
  margin-bottom: 10px;

  small {
    font-size: 11px;
    display: block;
    margin-top: 5px;
    margin-left: 10px;
    color: ${({ theme }) => theme.colors.danger.primary};
  }

  ${({ oneOftree }) => oneOftree && css`
    max-width: 31.2%;
    min-width: 300px;
  `};

  ${({ oneOfFour }) => oneOfFour && css`
    max-width: 22%;
    min-width: 200px;
  `};

  ${({ oneOfFive }) => oneOfFive && css`
    max-width: 15%;
    min-width: 200px;

/*     :nth-last-child(2) {
      margin-right: auto;
      margin-left: 20px;
    } */
  `};

  ${({ passwordChange }) => passwordChange && css`
    max-width: 15% !important;
    width: 100%;
    min-width: 200px;
  `};
`