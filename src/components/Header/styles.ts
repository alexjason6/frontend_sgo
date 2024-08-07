import { FiChevronLeft } from 'react-icons/fi'
import styled from 'styled-components'

interface PropStyle {
  $subHeader?: boolean
}

export const Container = styled.header<PropStyle>`
  width: calc(100% - 50px);
  background: ${({ theme }) => theme.colors.white};
  padding: ${({ $subHeader }) => !$subHeader ? '50px 50px 10px 50px' : '20px 50px 10px 50px'};
  margin-left: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`

export const Title = styled.h3`
  font-size: 20px;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.grays.primary};
  margin-bottom: 10px;
`

export const Divisor = styled.hr<PropStyle>`
  width: 100%;
  border: none;
  margin-bottom: 20px;
  border-top: ${({ $subHeader }) => $subHeader ? '1px' : '3px'} solid
    ${({ theme, $subHeader }) =>
      $subHeader ? theme.colors.grays.light : theme.colors.oranges.primary};
`

export const GoBack = styled.span`
  font-size: 2rem;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.grays.primary};
  cursor: pointer !important;

  &:hover {
    color: ${({ theme }) => theme.colors.oranges.dark};
    transition: 300ms color ease-in;
  }
`

export const Back = styled(FiChevronLeft)`
  font-size: 25px;
  color: ${({ theme }) => theme.colors.oranges.dark};
`
