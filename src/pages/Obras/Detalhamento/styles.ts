import styled, { keyframes } from "styled-components";

interface PropStyle {
  $oneOfThree?: boolean;
  $bars?: boolean;
  $color?: string;
  $width?: string;
  $size?: number;
  $fullWidth?: boolean;
  $animate?: boolean;
}

const getBarColor = (theme: any, props: PropStyle) => {
  const { $color } = props;

  if ($color && theme.colors[$color]) {
    return theme.colors[$color].primary;
  }

  return theme.colors.oranges.primary;
};

const setWidth = (props: PropStyle) => {
  const { $width } = props;

  if ($width) {
    return `${$width}%`;
  }
  return "100%";
};

const setSize = (props: PropStyle) => {
  const { $size } = props;

  if ($size !== undefined) {
    if ($size >= 0 && $size <= 10) {
      return `${$size + 50}px`;
    }

    if ($size >= 11 && $size <= 100) {
      return "auto";
    }

    if ($size === 0) {
      return "100px";
    }

    return "auto";
  }

  return "auto";
};

const animateWidth = (props: PropStyle) => keyframes`
  from {
    width: 0%;
  }
  to {
    width: ${setWidth(props)};
  }
`;

export const Content = styled.section`
  width: calc(100% -50px);
  margin-left: 50px;
  padding: 0px 30px;
`;

export const CardsInfos = styled.section<PropStyle>`
  width: 100%;
  margin: 30px 0px 40px 0px;
  padding: 0px 50px;
  display: flex;
  flex-direction: ${({ $bars }) => $bars && "column"};
  flex-wrap: wrap;
  gap: 20px;
`;

export const Infos = styled.div<PropStyle>`
  max-width: ${({ $oneOfThree, $fullWidth }) =>
    $oneOfThree ? "36%" : $fullWidth ? "100%" : "60%"};
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

export const Title = styled.span`
  width: 100%;
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.grays.primary};
`;

export const Bar = styled.div<PropStyle>`
  width: 0%;
  background: ${({ theme, ...props }) => getBarColor(theme, props)};
  padding: ${({ $size }) => ($size! < 40 ? "5px 0px" : "5px 20px")};
  color: ${({ theme, $size }) =>
    $size! < 40 ? theme.colors.grays.primary : theme.colors.white};
  animation: ${({ $animate, ...props }) => $animate && animateWidth(props)} 1.5s
    forwards;

  & + & {
    margin-top: -20px;
  }

  p {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: -5px;
    margin-left: ${({ ...props }) => setSize(props)};
    color: ${({ theme, $size }) =>
      $size! < 10 ? theme.colors.grays.primary : theme.colors.white} !important;
  }

  .bargray {
    color: ${({ theme }) => theme.colors.grays.primary} !important;
  }
`;

export const Var = styled.var<PropStyle>`
  font-size: 10px;
  margin-left: ${({ ...props }) => setSize(props)};
  color: ${({ theme, $size }) =>
    $size! < 10 ? theme.colors.grays.primary : theme.colors.white} !important;
`;
