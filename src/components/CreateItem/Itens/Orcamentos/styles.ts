/* eslint-disable @typescript-eslint/no-unused-vars */
import styled, { css } from 'styled-components'
import { FiEdit } from 'react-icons/fi'
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

export const Edit = styled.div`
  width: 100%;
  padding-bottom: 20px;
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.oranges.light};

  p {
    margin-right: 10px;
    color: ${({ theme }) => theme.colors.grays.primary};
    cursor: pointer;

    &:hover {
      color: ${({ theme }) => theme.colors.grays.light};
      transition: 200ms all ease-in;
    }
  }
`
export const EditIcon = styled(FiEdit)`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.oranges.primary};
  cursor: pointer;
`

export const ButtonContainer = styled.div`
  width: 100%;
  text-align: right;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid ${({ theme }) => theme.colors.grays.lighter};
  margin-top: 20px;

  span {
    font-size: 14px;
    text-align: left;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.grays.light};
  }

  p {
    font-size: 18px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.danger.primary};
  }
`
export const AddItem = styled.span`
  width: fit-content;
  text-align: right;
  padding: 0px 30px;

  p {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;
    cursor: pointer;
  }
`

export const AddSubitem = styled.span`
  width: fit-content;
  text-align: left;
  padding: 0px 30px;

  p {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    cursor: pointer;
  }
`

export const Divisor = styled.hr`
  width: 100%;
  height: 0px;
  margin-top: 20px;
  border-top: 1px solid ${({ theme }) => theme.colors.grays.lighter} !important;
`
