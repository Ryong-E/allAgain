import styled from "styled-components";
import { ButtonBlock, LargeButton } from "../common/Buttons";
import { InputBlock, InputIconText, InputIcon, InputIconBlock } from "../common/Form";
import { Link } from "react-router-dom";


const FormContainer = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;

  ${ButtonBlock} {
    padding: 20px 0 0;
  }
`;

const FindPassword = styled.div`
  color: ${({ theme }) => theme.colors.dasidaGreen};
  text-align: right;
  font-size: 14px;
  margin: 20px 0 0;
`

export default function LoginForm() {
  return(
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
  );

}
