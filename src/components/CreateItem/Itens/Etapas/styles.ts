import styled, { css } from 'styled-components'
import { device } from '../../../../assets/styles/themes/devices'

interface PropStyle {
  $create?: boolean
  $items?: boolean
  $total?: boolean
  $fullwidth?: boolean
}

const mobileStyles = css`
  @media ${device.mobileL}, ${device.mobileM}, ${device.mobileS} {
    flex-direction: column;
  }
`

const formContainerMobileStyles = css`
  @media ${device.mobileL}, ${device.mobileM}, ${device.mobileS}  {
    max-width: 300px !important;
    grid-template-columns: repeat(1, 1fr);
  }
`

const formContainerTablesStyles = css`
  @media ${device.tablet}  {
    grid-template-columns: repeat(3, 1fr);
  }
`

export const Container = styled.div`
  width: 95%;
  margin: 0 auto;
  padding: 20px 30px;
  background: ${({ theme }) => theme.colors.white};
  display: flex;
  align-items: center;
  flex-direction: column;

  ${mobileStyles}
`

export const Content = styled.section<PropStyle>`
  width: ${({ $fullwidth }) => !$fullwidth ? 'calc(100% - 50px)' : '100%'};
  margin-left: ${({ $fullwidth }) => !$fullwidth && '50px'};
`

export const Form = styled.form`
  width: 100%;
  display: grid;
  flex-wrap: wrap;
  gap: 10px;
  ${formContainerMobileStyles}
  ${formContainerTablesStyles}
`

export const FormContent = styled.section<PropStyle>`
  margin: 0px 30px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;

  ${({ $items, theme }) => $items && css`
    padding: 0;
    border-bottom: 1px solid ${theme.colors.grays.lighter};
  `}

  ${({ $total }) => $total && css`
    justify-content: flex-end;
  `}

  p {
    text-align: left;
  }
`

export const Title = styled.span`
  width: calc(100% - 50px);
  margin: 30px;
  color: ${({ theme }) => theme.colors.grays.light};
  padding-bottom: 10px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grays.light};
`

export const ButtonContainer = styled.div<PropStyle>`
  width: 100%;
  text-align: left;

  ${({ $fullwidth }) => $fullwidth && css`
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid ${({ theme }) => theme.colors.grays.lighter};
  `}

  p {
    font-size: 14px;
    text-align: right;
    text-decoration: underline;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.danger.primary};
    cursor: pointer;
  }
`
