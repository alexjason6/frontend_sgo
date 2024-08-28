import styled from 'styled-components'

interface PropStyle {
  $data?: boolean
}

export const Content = styled.section<PropStyle>`
  width: calc(100% - 50px);
  height: 100%;
  margin-left: 50px;
  display: flex;
  justify-content: center;
  align-items: ${({ $data }) => !$data ? 'center' : 'flex-start'};
`

export const Itens = styled.div`
  width: 100%;
`

export const ContentPage = styled.div`
  width: 100%;
  display: grid;
`

export const ButtonContainer = styled.div`
  margin: 0 50px;
  display: flex;
  justify-content: flex-end;
`
