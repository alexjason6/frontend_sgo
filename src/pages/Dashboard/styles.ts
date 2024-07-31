import styled from 'styled-components'

interface PropStyle {
  obras: boolean
}

export const Content = styled.header<PropStyle>`
  width: calc()(100% - 50px);
  height: 100%;
  margin-left: 50px;
  background: ${({ theme }) => theme.colors.white};
  display: flex;
  padding: ${({ obras }) => obras ? '0px 70px 0px 70px' : 0};
  align-items: ${({ obras }) => obras ? 'flex-start' : 'center'};
  justify-content: ${({ obras }) => obras ? 'flex-start' : 'center'};
  flex-direction: column;
`
