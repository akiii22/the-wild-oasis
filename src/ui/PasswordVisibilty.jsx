import styled from "styled-components";
import { FaEyeSlash, FaEye } from "react-icons/fa";

const StyledSpan = styled.span`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
`;

function PasswordVisibilty({ isVisible, onClick }) {
  return (
    <StyledSpan onClick={onClick}>
      {isVisible ? <FaEye /> : <FaEyeSlash />}
    </StyledSpan>
  );
}

export default PasswordVisibilty;
