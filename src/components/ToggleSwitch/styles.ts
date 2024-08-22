import styled, { css } from 'styled-components'

interface PropStyle {
  $checked: boolean
}

export const SwitchInput = styled.input`
  height: 0;
  width: 0;
  visibility: hidden;
`

export const SwitchLabel = styled.label<PropStyle>`
  width: 60px;
  height: 30px;
  margin-top: -10px;
  border-radius: 100px;
  border: 2px solid gray;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: background-color 0.2s;

  ${({ $checked }) => $checked && css`
    border: 2px solid ${({ theme }) => theme.colors.greens.primary};
    background: ${({ theme }) => theme.colors.greens.primary};
  `}
`

export const SwitchButton = styled.span`
  width: 25px;
  height: 22px;
  position: absolute;
  top: 2px;
  left: 2px;
  border-radius: 45px;
  transition: 0.2s;
  background: ${({ theme }) => theme.colors.grays.light};
  box-shadow: 0 0 2px 0 rgba(10, 10, 10, 0.29);

  ${SwitchInput}:checked + ${SwitchLabel} & {
    background: ${({ theme }) => theme.colors.white};
    left: calc(100% - 2px);
    transform: translateX(-100%);
  }

  ${SwitchLabel}:active & {
    width: 45px;
    background: ${({ theme }) => theme.colors.greens.primary};
  }
`
