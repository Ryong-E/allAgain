import styled from "styled-components";
import { Container } from "../common/Containers";
import LoginForm from "./LoginForm";
import { Link } from "react-router-dom";
import { ROUTE } from "../../constant/route";


const LoginWrap = styled.div`
  height: 100%;
  min-height: calc(100vh - 50px);
  padding: 200px 0 100px;
`;
const LoginTitle = styled.h2`
  font-size: 28px;
  font-weight: 700;
  text-align: center;
  margin: 0 0 60px;
`;

const RegisterLinkWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: cener;
  margin: 40px 0 0;
`;

const RegisterLinkButton = styled.button`
  color: ${({ theme }) => theme.colors.dasidaGreen};
  border-bottom: 1px solid ${({ theme }) => theme.colors.dasidaGreen};
  font-weight: 700;
  margin: 0 10px;
`;


export default function LoginBox() {
  return(
    <Container>
      <LoginWrap>
        <LoginTitle>로그인</LoginTitle>
        <LoginForm />
        <RegisterLinkWrap>아직 회원이 아니신가요?
          <Link to={ ROUTE.REGISTER.link }>
            <RegisterLinkButton>회원가입</RegisterLinkButton>
          </Link>
        </RegisterLinkWrap>
      </LoginWrap>
    </Container>
  );

}
