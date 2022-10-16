import styled from "styled-components";
import LoginForm from "./LoginForm";
import { Link } from "react-router-dom";
import { ROUTE } from "../../constant/route";


const LoginTitle = styled.h2`
  font-family: "RIDIBatang";
  font-size: 32px;
  text-align: center;
  margin: 0 0 80px;
`;

const RegisterLinkWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: cener;
  margin: 40px 0 0;
`;

const RegisterLinkButton = styled.button`
  color: ${({ theme }) => theme.colors.dasidaGreen};
  font-weight: 700;
  margin: 0 10px;

  &:hover { 
    border-bottom: 1px solid ${({ theme }) => theme.colors.dasidaGreen};
  }
`;


export default function LoginBox() {
  return(
    <div>
      <LoginTitle>다시, 다 사용해볼 준비가 되셨나요?</LoginTitle>
      <LoginForm />
      <RegisterLinkWrap>아직 회원이 아니신가요?
        <Link to={ ROUTE.REGISTER.link }>
          <RegisterLinkButton>회원가입</RegisterLinkButton>
        </Link>
      </RegisterLinkWrap>
    </div>
  );

}
