import { Row, Col, Image } from "react-bootstrap";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
interface WrapperProps {
  size?: string;
  color?: string;
  bg?: string;
  width?: string;
  height?: string;
  borderRadius?: string;
  border?: string;
  ms?: string;
  me?: string;
  mt?: string;
  mb?: string;
  ps?: string;
  pe?: string;
  pt?: string;
  pb?: string;
  p?: string;
  family?: string;
  boxShadow?: string;
  pointer?: boolean;
  position?: string;
  top?: any;
  bottom?: any;
  left?: any;
  right?: any;
  hover?: any;
  minWidth?: any;
}
const Wrapper = styled.div<WrapperProps>`
  font-size: ${(props) => (props.size ? props.size : "")};
  color: ${(props) => (props.color ? props.color : "")};
  background: ${(props) => (props.bg ? props.bg : "")};
  width: ${(props) => (props.width ? props.width : "")};
  min-width: ${(props) => (props.minWidth ? props.minWidth : "")};
  height: ${(props) => (props.height ? props.height : "")};
  border-radius: ${(props) => (props.borderRadius ? props.borderRadius : "")};
  border: ${(props) => (props.border ? props.border : "")};
  margin-left: ${(props) => (props.ms ? props.ms : "")};
  margin-right: ${(props) => (props.me ? props.me : "")};
  margin-top: ${(props) => (props.mt ? props.mt : "")};
  margin-bottom: ${(props) => (props.mb ? props.mb : "")};
  padding-left: ${(props) => (props.ps ? props.ps : "")};
  padding-right: ${(props) => (props.pe ? props.pe : "")};
  padding-top: ${(props) => (props.pt ? props.pt : "")};
  padding-bottom: ${(props) => (props.pb ? props.pb : "")};
  padding: ${(props) => (props.p ? props.p : "")};
  font-family: ${(props) => (props.family ? props.family : "")};
  box-shadow: ${(props) => (props.boxShadow ? props.boxShadow : "")};
  position: ${(props) => (props.position ? props.position : "")};
  top: ${(props) => (props.top ? props.top : "")};
  bottom: ${(props) => (props.bottom ? props.bottom : "")};
  left: ${(props) => (props.left ? props.left : "")};
  right: ${(props) => (props.right ? props.right : "")};
  cursor: ${(props) => (props.pointer ? "pointer" : "")};
  &:hover {
    background-color: ${(props) => (props.hover ? props.hover : "")};
  }
`;
const SpanWrapper = styled.span<WrapperProps>`
  font-size: ${(props) => (props.size ? props.size : "")};
  color: ${(props) => (props.color ? props.color : "")};
  background: ${(props) => (props.bg ? props.bg : "")};
  width: ${(props) => (props.width ? props.width : "")};
  height: ${(props) => (props.height ? props.height : "")};
  border-radius: ${(props) => (props.borderRadius ? props.borderRadius : "")};
  border: ${(props) => (props.border ? props.border : "")};
  margin-left: ${(props) => (props.ms ? props.ms : "")};
  margin-right: ${(props) => (props.me ? props.me : "")};
  margin-top: ${(props) => (props.mt ? props.mt : "")};
  margin-bottom: ${(props) => (props.mb ? props.mb : "")};
  padding-left: ${(props) => (props.ps ? props.ps : "")};
  padding-right: ${(props) => (props.pe ? props.pe : "")};
  padding-top: ${(props) => (props.pt ? props.pt : "")};
  padding-bottom: ${(props) => (props.pb ? props.pb : "")};
  font-family: ${(props) => (props.family ? props.family : "")};
`;
export { Row, Col, Image, Wrapper, SpanWrapper, useMediaQuery };
