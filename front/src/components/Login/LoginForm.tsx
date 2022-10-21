import styled from "styled-components";
import { useForm } from "react-hook-form";
import { ButtonBlock, LargeButton } from "../common/Buttons";
import {
  InputBlock,
  InputIconText,
  InputIcon,
  InputIconBlock,
  InputErrorMsg,
} from "../common/Form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ROUTE } from "../../constant/route";
import { useRecoilState } from "recoil";

import { LoginRequiredParams } from "../../types/userTypes";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../api/userApi";
import { LOGIN } from "../../constant/queryKeys";
import { loggedInUserId, loggedInUserImgUrl } from "../../atoms/atoms";
import { useEffect } from "react";

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

  &:hover {
    font-weight: 500;
    color: ${({ theme }) => theme.colors.bodyText};
  }
`;

type Inputs = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [loggedInUser, setLoggedInUser] = useRecoilState(loggedInUserId);
  const [loggedInUserImg, setLoggedInUserImg] =
    useRecoilState(loggedInUserImgUrl);
  // 로그인 Form 유효성 검사
  const {
    register,
    handleSubmit,
    watch, // 아이콘 투명도조절할 때 사용할거
    setError,
    formState: { errors },
  } = useForm<Inputs>({
    reValidateMode: "onSubmit",
  });

  // useEffect(() => {
  //   console.log("loggedInUserImg", loggedInUserImg);
  // }, [loggedInUserImg]);

  // 로그인 Mutation 정의
  const loginMutation = useMutation([LOGIN], loginUser, {
    onMutate: (variable) => {
      console.log("onMutate", variable);
    },
    onError: (error: any) => {
      console.log(error.data.errorMessage);
      setError("email", { message: "아이디 또는 비밀번호를 확인해주세요." });
    },
    onSuccess: (data: any, variables, context) => {
      console.log("success", data, variables, context);
      sessionStorage.setItem("jwtToken", data.token);
      setLoggedInUser(data.userId);
      setLoggedInUserImg(data.imageUrl);
      if (state) {
        navigate(state);
      } else {
        navigate(ROUTE.HOME.link);
      }
    },
    onSettled: () => {
      console.log("end");
    },
  });

  useEffect(() => {
    console.log("loginPageMounted");
  }, []);

  // 로그인 Form 제출 시 로그인 요청
  const handleLoginVaildate = ({ email, password }: LoginRequiredParams) => {
    loginMutation.mutate({ email, password });
  };

  return (
    <FormContainer onSubmit={handleSubmit(handleLoginVaildate)}>
      <InputBlock>
        <InputIconBlock>
          <InputIconText
            {...register("email", {
              required: "이메일이 입력되지 않았습니다.",
              pattern: {
                value:
                  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                message: "이메일 형식으로 작성해주세요.",
              },
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
              minLength: {
                value: 6,
                message: "비밀번호를 6자 이상 입력하세요.",
              },
            })}
            type="password"
            placeholder="비밀번호를 입력하세요"
          />
          <InputIcon iconStyle="password" />
        </InputIconBlock>
        <FindPassword>
          <Link to="">비밀번호를 잊으셨나요?</Link>
        </FindPassword>
      </InputBlock>
      <InputErrorMsg>
        {errors.email?.message || errors.password?.message}
      </InputErrorMsg>
      <ButtonBlock>
        <LargeButton>로그인</LargeButton>
      </ButtonBlock>
    </FormContainer>
  );
}
