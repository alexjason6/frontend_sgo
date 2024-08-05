import styled from 'styled-components'
import { FiChevronDown } from 'react-icons/fi'

interface PropStyle {
  $obras?: boolean
  $open?: boolean
}

export const Content = styled.main<PropStyle>`
  width: calc()(100% - 50px);
  margin-left: 50px;
  background: ${({ theme }) => theme.colors.white};
  display: flex;
  padding: ${({ $obras }) => $obras ? '0px 70px 0px 70px' : 0};
  align-items: ${({ $obras }) => $obras ? 'flex-start' : 'center'};
  justify-content: ${({ $obras }) => $obras ? 'flex-start' : 'center'};
  flex-direction: column;
`

export const Itens = styled.section`
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  padding-top: 20px;
`
export const More = styled.div`
  width: 100%;
  height: 30px;
  margin: 30px 0px;
  padding-top: 30px;
  border-top: 1px solid ${({ theme }) => theme.colors.oranges.lighter};

  p {
    font-size: 12px;
    font-weight: 500;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: ${({ theme }) => theme.colors.oranges.primary};
    cursor: pointer;

    &:hover {
      color: ${({ theme }) => theme.colors.oranges.dark};
      transition: color 0.4s;
    }
  }
`

export const Chevron = styled(FiChevronDown)<PropStyle>`
  font-size: 14px;
  rotate: ${({ $obras }) => $obras && '-180deg'};
  transition: rotate 1s;
`
