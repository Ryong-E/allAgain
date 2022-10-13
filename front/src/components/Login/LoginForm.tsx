import styled from "styled-components";
import { useForm } from "react-hook-form";
import { ButtonBlock, LargeButton } from "../common/Buttons";
import { InputBlock, InputIconText, InputIcon, InputIconBlock, InputErrorMsg } from "../common/Form";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";

import { IUser, ILoginResponse, ILoginRequiredParams } from "../../api/types";
import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import { loginUser } from "../../api/userApi";

type Inputs = {
  email: string,
  password: string,
  loginError: string,
};

const FormContainer = styled.form`
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

  // React Hook Form
  const { 
    register, 
    handleSubmit, 
    watch,
    setError,
    formState: { errors },
  } = useForm<Inputs>({
    reValidateMode: "onSubmit"
  });
  // console.log(watch());
  // console.log(watch("email"));
  // console.log(errors.password);


  // react query
  const queryClient = useQueryClient();
  const loginCount = 0;

  const loginMutation: UseMutationResult<ILoginResponse, Error, ILoginRequiredParams> = useMutation<
    ILoginResponse,
    Error,
    ILoginRequiredParams
    >(async ({ email, password }) => loginUser({email, password}), {
      onMutate: (variables) => {
        console.log("loginCount", loginCount);
      },
      onError: (error, variable, context) => {
        console.log("error: ", error, variable, context);
        setError("loginError", {message: error.message});
      },
      onSuccess: (data, variables, context) => {
        console.log("success: ", data, variables, context);
        // queryClient.invalidateQueries("loginUser");
      },
      onSettled: () => {
        console.log("end");
      }
    });

  const handleLoginVaildate = ({ email, password }: IUser) => {
    loginMutation.mutate({ email, password });
  }


  return(
    <FormContainer onSubmit={ handleSubmit(handleLoginVaildate) }>
      <InputBlock>
        <InputIconBlock>
          <InputIconText 
            {...register("email", { 
              required: "이메일이 입력되지 않았습니다.",
              pattern: { value: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i, message: "이메일 형식으로 작성해주세요" }
            })}
            placeholder="이메일을 입력하세요" 
          />
          <InputIcon iconStyle="user" />
        </InputIconBlock>
      </InputBlock>
      <InputBlock>
        <InputIconBlock>
          <InputIconText
            {...register("password", { 
              required: "비밀번호가 입력되지 않았습니다.", 
              minLength: { value: 6, message: "비밀번호를 6자 이상 입력하세요." }
            })}
            placeholder="비밀번호를 입력하세요" 
          />
          <InputIcon iconStyle="password" />
        </InputIconBlock>
        <FindPassword>
          <Link to="">
            비밀번호를 잊으셨나요?
          </Link>
        </FindPassword>
      </InputBlock>
      <InputErrorMsg>{errors.email?.message || errors.password?.message || errors.loginError?.message }</InputErrorMsg>
      <ButtonBlock>
        <LargeButton>로그인</LargeButton>
      </ButtonBlock>
    </FormContainer>
  );

}
