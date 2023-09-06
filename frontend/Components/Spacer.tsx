import styled from "styled-components";
interface SpacerProps {
  width?: string;
  height?: string;
}
const Spacer = styled.div<SpacerProps>`
  width: ${(props: any) => (props.width ? props.width : "auto")};
  height: ${(props: any) => (props.height ? props.height : "auto")};
`;
export { Spacer };
