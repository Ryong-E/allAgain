import styled from "styled-components";
import { useForm } from "react-hook-form";
import { ButtonBlock, LargeButton } from "../common/Buttons";
import { InputBlock, InputIconText, InputIcon, InputIconBlock, InputErrorMsg, Label } from "../common/Form";
import { RegisterRequiredParams } from "../../api/types";
import { useMutation } from "@tanstack/react-query";
import { createUser } from "../../api/userApi";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "../../constant/route";


const FormContainer = styled.form`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;

  ${ButtonBlock} {
    padding: 20px 0 0;
  }
`;

type Inputs = {
  email: string,
  password: string,
  passwordConfirm: string,
  name: string,
  nickname: string,
  RegisterError: string,
};


export default function RegisterForm() {

  const navigate = useNavigate();
  
  // React Hook Form
  const { 
    register, 
    handleSubmit, 
    watch,  // 아이콘 투명도조절할 때 사용할거
    setError,
    getValues,
    formState: { errors },
  } = useForm<Inputs>({
  });

  const onRegisterSubmit = (data: RegisterRequiredParams) => {
    RegisterMutation.mutate(data);
  }


  // React query
  const RegisterMutation = useMutation(createUser, {
    onError: (error:any) => {
      console.log(error);
      // setError("RegisterError", {message: error.message});  // 실패 시 원인에 따른 에러메세지 출력 필요 - 백엔드에 에러구분 요청
    },
    onSuccess: (data) => {
      console.log("success", data);
      navigate(ROUTE.LOGIN.path);
    },
  });


  return(
    <FormContainer onSubmit={ handleSubmit(onRegisterSubmit) }>
      <InputBlock>
        <Label>이메일</Label>
        <InputIconBlock>
          <InputIconText 
            {...register("email", { 
              required: "이메일이 입력되지 않았습니다.",
              pattern: { value: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i, message: "이메일 형식으로 작성해주세요." }
            })}
            placeholder="이메일을 입력하세요" />
          <InputIcon iconStyle="user" />
        </InputIconBlock>
        {errors.email && <InputErrorMsg>{errors.email.message}</InputErrorMsg>}
      </InputBlock>
      <InputBlock>
        <Label>비밀번호</Label>
        <InputIconBlock>
          <InputIconText 
            {...register("password", { 
              required: "비밀번호가 입력되지 않았습니다.", 
              minLength: { value: 6, message: "비밀번호를 6자 이상 입력하세요." }
            })}
            type="password"
            placeholder="비밀번호를 입력하세요" />
          <InputIcon iconStyle="password" />
        </InputIconBlock>
        {errors.password && <InputErrorMsg>{errors.password.message}</InputErrorMsg>}
      </InputBlock>
      <InputBlock>
        <Label>비밀번호 확인</Label>
        <InputIconBlock>
          <InputIconText 
            {...register("passwordConfirm", { 
              required: "비밀번호를 확인해주세요.", 
              validate: (passwordConfirm?: string) => {
                const originPassword = getValues("password");
                return passwordConfirm === originPassword || "비밀번호가 일치하지 않습니다.";
              }
            })}
            type="password" 
            placeholder="비밀번호를 한번 더 입력하세요" />
          <InputIcon iconStyle="password" />
        </InputIconBlock>
        {errors.passwordConfirm && <InputErrorMsg>{errors.passwordConfirm.message}</InputErrorMsg>}
      </InputBlock>
      <InputBlock>
        <Label>이름</Label>
        <InputIconBlock>
          <InputIconText 
            {...register("name", { 
              required: "이름이 입력되지 않았습니다.",
            })}
            placeholder="이름을 입력하세요" />
          <InputIcon iconStyle="name" />
        </InputIconBlock>
        {errors.name && <InputErrorMsg>{errors.name.message}</InputErrorMsg>}
      </InputBlock>
      <InputBlock>
        <Label>닉네임</Label>
        <InputIconBlock>
          <InputIconText 
              {...register("nickname", { 
              required: "닉네임이 입력되지 않았습니다.",
            })}
            placeholder="닉네임을 입력하세요" />
          <InputIcon iconStyle="nick" />
        </InputIconBlock>
        {errors.nickname && <InputErrorMsg>{errors.nickname.message}</InputErrorMsg>}
      </InputBlock>
      {errors.RegisterError && <InputErrorMsg>{errors.RegisterError.message}</InputErrorMsg>}
      <ButtonBlock>
        <LargeButton>회원가입</LargeButton>
      </ButtonBlock>
    </FormContainer>
  );

};