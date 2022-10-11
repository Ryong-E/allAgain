import styled from "styled-components";
import { Container } from "../common/Containers";
import { ButtonBlock, LargeButton } from "../common/Buttons";
import { InputBlock, InputIconText, InputIcon, InputIconBlock, Label } from "../common/Form";
import { Link } from "react-router-dom";


const RegisterWrap = styled.div`
  padding: 150px 0 100px;
`;
const RegisterTitle = styled.h2`
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


export default function LoginForm() {
  return(
    <Container>
      <RegisterWrap>
        <RegisterTitle>회원가입</RegisterTitle>
        <FormContainer>
          <InputBlock>
            <Label>이메일</Label>
            <InputIconBlock>
              <InputIconText placeholder="아이디를 입력하세요" />
              <InputIcon iconStyle="user" />
            </InputIconBlock>
          </InputBlock>
          <InputBlock>
            <Label>비밀번호</Label>
            <InputIconBlock>
              <InputIconText placeholder="비밀번호를 입력하세요" />
              <InputIcon iconStyle="password" />
            </InputIconBlock>
          </InputBlock>
          <InputBlock>
            <Label>비밀번호 확인</Label>
            <InputIconBlock>
              <InputIconText placeholder="비밀번호를 입력하세요" />
              <InputIcon iconStyle="password" />
            </InputIconBlock>
          </InputBlock>
          <InputBlock>
            <Label>이름</Label>
            <InputIconBlock>
              <InputIconText placeholder="이름을 입력하세요" />
              <InputIcon iconStyle="name" />
            </InputIconBlock>
          </InputBlock>
          <InputBlock>
            <Label>닉네임</Label>
            <InputIconBlock>
              <InputIconText placeholder="닉네임을 입력하세요" />
              <InputIcon iconStyle="nick" />
            </InputIconBlock>
          </InputBlock>
          <ButtonBlock>
            <LargeButton>회원가입</LargeButton>
          </ButtonBlock>
        </FormContainer>
      </RegisterWrap>
    </Container>
  );

}
