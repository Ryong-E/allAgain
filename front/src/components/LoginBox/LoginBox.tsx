import styled from "styled-components";
import { Container } from "../common/Containers";
import { ButtonBlock, LargeButton } from "../common/Buttons";
import { InputBlock, InputIconText, InputIcon, InputIconBlock } from "../common/Form";
import { Link } from "react-router-dom";


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
const FormContainer = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;

  ${ButtonBlock} {
    padding: 20px 0 0;
  }
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

const FindPassword = styled.div`
  color: ${({ theme }) => theme.colors.dasidaGreen};
  text-align: right;
  font-size: 14px;
  margin: 20px 0 0;
`


export default function LoginForm() {
  return(
    <Container>
      <LoginWrap>
        <LoginTitle>로그인</LoginTitle>
        <FormContainer>
          <InputBlock>
            <InputIconBlock>
              <InputIconText placeholder="아이디를 입력하세요" />
              <InputIcon iconStyle="user" />
            </InputIconBlock>
          </InputBlock>
          <InputBlock>
            <InputIconBlock>
              <InputIconText placeholder="비밀번호를 입력하세요" />
              <InputIcon iconStyle="password" />
            </InputIconBlock>
            <FindPassword>
              <Link to="">
                비밀번호를 잊으셨나요?
              </Link>
            </FindPassword>
          </InputBlock>
          <ButtonBlock>
            <LargeButton>로그인</LargeButton>
          </ButtonBlock>
        </FormContainer>
        <RegisterLinkWrap>아직 회원이 아니신가요?
          <Link to="/register">
            <RegisterLinkButton>회원가입</RegisterLinkButton>
          </Link>
        </RegisterLinkWrap>
      </LoginWrap>
    </Container>
  );

}
