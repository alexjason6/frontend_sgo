import styled from 'styled-components'
import { FiEdit } from 'react-icons/fi'

export const Container = styled.div`
  width: 95%;
  margin: 0 auto;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 30px;
  padding-right: auto;
  background: ${({ theme }) => theme.colors.white};
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`
export const Legend = styled.legend`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.grays.light};
  margin-left: 5px;
  margin-bottom: 3px;
  font-style: italic;
`
export const Edit = styled.div`
  width: 98%;
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
`
