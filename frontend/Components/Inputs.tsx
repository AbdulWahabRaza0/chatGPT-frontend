import styled from "styled-components";
interface InputProps {
  border?: string;
  height?: string;
  position?: string;
  borderRadius?: string;
  bg?: string;
}
const PrimaryInput = styled.input<InputProps>`
  background: ${(props) => (props.bg ? props.bg : "white")};
  color: black;
  border: ${(props) => (props.border ? props.border : "0px")};
  height: ${(props) => (props.height ? props.height : "50px")};
  padding: 20px;

  border-radius: ${(props) =>
    props.borderRadius ? props.borderRadius : "7px"};
  font-size: 16px;
  position: ${(props) => (props.position ? props.position : "")};
  /* position: relative; */
  width: 100%;
`;
const PrimaryTextarea = styled.textarea<InputProps>`
  background: white;
  color: black;
  border: ${(props) => (props.border ? props.border : "0px")};
  height: ${(props) => (props.height ? props.height : "50px")};
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  padding-left: 20px;
  padding-right: 14px;
  padding-top: 15px;
  padding-bottom: 14px;
  border-radius: 11px;
  resize: 0;
  font-size: 16px;
  position: ${(props) => (props.position ? props.position : "")};
  /* position: relative; */
  width: 100%;
`;
export { PrimaryInput, PrimaryTextarea };
