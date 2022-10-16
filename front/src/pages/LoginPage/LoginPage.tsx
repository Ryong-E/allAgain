import styled from "styled-components";
import { Container } from "../../components/common/Containers";
import LoginBox from "../../components/Login/LoginBox";

const LoginWrap = styled.div`
  min-height: calc(100vh - 50px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function LoginPage() {
  return (
    <LoginWrap>
      <LoginBox />
    </LoginWrap>
  );

}