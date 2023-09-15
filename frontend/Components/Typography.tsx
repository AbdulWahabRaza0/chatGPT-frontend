import styled from "styled-components";
interface TextProps {
  tt?: string;
  weight?: string;
  lHeight?: string;
  fontSize?: string;
  fontColor?: string;
  td?: string;
  ellipsis?: boolean;
}
const H1 = styled.h1<TextProps>`
  font-style: normal;
  text-transform: ${(props) => (props.tt ? props.tt : "")};
  font-weight: ${(props) => (props.weight ? props.weight : "")};
  line-height: ${(props) => (props.lHeight ? props.lHeight : "")};
  font-size: ${(props) => (props.fontSize ? props.fontSize : "")};
  color: ${(props) => (props.fontColor ? props.fontColor : "")};
  text-decoration: ${(props) => (props.td ? props.td : "")};
`;
const H2 = styled.h2<TextProps>`
  font-style: normal;
  text-transform: ${(props) => (props.tt ? props.tt : "")};
  font-weight: ${(props) => (props.weight ? props.weight : "")};
  line-height: ${(props) => (props.lHeight ? props.lHeight : "")};
  font-size: ${(props) => (props.fontSize ? props.fontSize : "")};
  color: ${(props) => (props.fontColor ? props.fontColor : "")};
  text-decoration: ${(props) => (props.td ? props.td : "")};
`;
const H3 = styled.h3<TextProps>`
  font-style: normal;
  text-transform: ${(props) => (props.tt ? props.tt : "")};
  font-weight: ${(props) => (props.weight ? props.weight : "")};
  line-height: ${(props) => (props.lHeight ? props.lHeight : "")};
  font-size: ${(props) => (props.fontSize ? props.fontSize : "")};
  color: ${(props) => (props.fontColor ? props.fontColor : "")};
  text-decoration: ${(props) => (props.td ? props.td : "")};
`;
const H4 = styled.h4<TextProps>`
  font-style: normal;
  text-transform: ${(props) => (props.tt ? props.tt : "")};
  font-weight: ${(props) => (props.weight ? props.weight : "")};
  line-height: ${(props) => (props.lHeight ? props.lHeight : "")};
  font-size: ${(props) => (props.fontSize ? props.fontSize : "")};
  color: ${(props) => (props.fontColor ? props.fontColor : "")};
  text-decoration: ${(props) => (props.td ? props.td : "")};
`;
const H5 = styled.h5<TextProps>`
  font-style: normal;
  text-transform: ${(props) => (props.tt ? props.tt : "")};
  font-weight: ${(props) => (props.weight ? props.weight : "")};
  line-height: ${(props) => (props.lHeight ? props.lHeight : "")};
  font-size: ${(props) => (props.fontSize ? props.fontSize : "")};
  color: ${(props) => (props.fontColor ? props.fontColor : "")};
  text-decoration: ${(props) => (props.td ? props.td : "")};
`;
const P = styled.p<TextProps>`
  font-style: normal;
  text-transform: ${(props) => (props.tt ? props.tt : "")};
  font-weight: ${(props) => (props.weight ? props.weight : "")};
  line-height: ${(props) => (props.lHeight ? props.lHeight : "24px")};
  font-size: ${(props) => (props.fontSize ? props.fontSize : "16px")};
  color: ${(props) => (props.fontColor ? props.fontColor : "")};
  text-decoration: ${(props) => (props.td ? props.td : "")};

  overflow: ${(props) => (props.ellipsis ? "hidden" : "")};
  text-overflow: ${(props) => (props.ellipsis ? " ellipsis" : "")};
  display: ${(props) => (props.ellipsis ? " -webkit-box" : "")};
  -webkit-line-clamp: ${(props) => (props.ellipsis ? "2" : "")};
  -webkit-box-orient: ${(props) => (props.ellipsis ? "vertical" : "")};
`;
export { H1, H2, H3, H4, H5, P };
