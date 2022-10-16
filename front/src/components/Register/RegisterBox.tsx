import styled from "styled-components";
import RegisterForm from "./RegisterForm";

const RegisterWrap = styled.div`
`;

const RegisterTitle = styled.h2`
  font-family: "RIDIBatang";
  font-size: 32px;
  text-align: center;
  margin: 0 0 80px;
`;


export default function LoginForm() {
  return(
    <RegisterWrap>
      <RegisterTitle>반가워요. 업사이클링 같이 해보실래요?</RegisterTitle>
      <RegisterForm />
    </RegisterWrap>
  );

}
