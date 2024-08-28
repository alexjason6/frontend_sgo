import styled, { css } from 'styled-components'

interface PropStyle {
  $type: 'default' | 'success' | 'danger'
}

const containerVariants = {
  default: css`
    background: ${({ theme }) => theme.colors.oranges.primary};
  `,
  success: css`
    background: ${({ theme }) => theme.colors.greens.primary};
  `,
  danger: css`
    background: ${({ theme }) => theme.colors.danger.primary};
  `
}

export const Container = styled.div<PropStyle>`
  font-size: 14px;
  padding: 16px 32px;
  border-radius: 4px;
  color: white;
  ${({ $type }) => containerVariants[$type] ?? containerVariants.default}
  box-shadow: 0px 20px 20px -16px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  & + & {
    margin-top: 12px;
  }
`
