import styled from "styled-components";
import RegisterForm from "./RegisterForm";

const RegisterWrap = styled.div`
  padding: 150px 0 100px;
`;
const RegisterTitle = styled.h2`
  font-size: 28px;
  font-weight: 700;
  text-align: center;
  margin: 0 0 60px;
`;


export default function LoginForm() {
  return(
    <RegisterWrap>
      <RegisterTitle>회원가입</RegisterTitle>
      <RegisterForm />
    </RegisterWrap>
  );

}
