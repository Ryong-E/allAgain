import * as StyledProfile from "./Profile.style";
import { getUserProfile, updateUserProfile } from '../../api/userApi';
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from "react";
import { MyProfile, MyProfileEditParams } from "../../types/userTypes"
import { useForm } from "react-hook-form";
import { InputErrorMsg } from "../common/Form";
import ProfileFormLoading from "./ProfileFormLoading";
import { 
  GET_PROFILE,
  UPDATE_PROFILE
} from "../../constant/queryKeys"

type Inputs = {
  nickname: string,
  currentPassword: string,
  password: string,
  passwordConfirm: string,
  UpdateError: string,
};


export default function ProfileForm() {
  // const myProfileInfo = useRecoilState(myProfileState);

  const { 
    data, 
    isLoading,
    isSuccess,
    isError, 
    error,
  } = useQuery<MyProfile, Error>([GET_PROFILE], getUserProfile, {
      // staleTime: 5 * 1000,  // 5초간 fresh상태 유지 후 stale됨
      refetchOnWindowFocus: true, // window에 포커스되면 refetch됨,
      onSuccess: (data) => {
        setNickInput(data.nickname);
        setValue("nickname", data.nickname);
      }
  });


  // 닉네임 state
  const [nickInput, setNickInput] = useState<string | undefined>("");

  const handleNickChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickInput(e.target.value);
  }


  // 프로필 수정 form 유효성 검사
  const { 
    register, 
    handleSubmit, 
    getValues,
    setError,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    reValidateMode: "onSubmit",
    defaultValues: {
      nickname: nickInput,
      currentPassword: "",
      password: "",
      passwordConfirm: ""
    },
  });


  // 프로필 수정 Mutation 정의
  const queryClient = useQueryClient();

  const updateProfileMutation = useMutation([UPDATE_PROFILE], updateUserProfile, {
    onMutate: variable => {
      console.log("onMutate", variable);
    },
    onError: (error: any, variable, context) => {
      // console.log(error);
      setError("UpdateError", {message: error.data.errorMessage});
    },
    onSuccess: (data: any, variables, context) => {
      console.log("success", data, variables, context);
      queryClient.invalidateQueries([GET_PROFILE]);
      setValue("currentPassword", "");
      setValue("password", "");
      setValue("passwordConfirm", "");
    },
  });


  // 프로필 수정 submit 시
  const handleProfileSubmit = ({ nickname, currentPassword, password, passwordConfirm }: MyProfileEditParams) => {
    console.log("리액트훅폼", nickname, currentPassword, password, passwordConfirm);
    clearErrors("UpdateError");

    // 현재 비밀번호값을 입력했으면 새 비밀번호도 입력 필요
    if((getValues("currentPassword") !== "") && (getValues("password") == "")) {
      return setError("UpdateError", {message: "새 비밀번호를 입력하세요"});
    }

    // 비밀번호 변경 시 현재 비밀번호 필수로 입력
    else if((getValues("password") !== "") && (getValues("currentPassword") === "")) {
      return setError("UpdateError", {message: "현재 비밀번호를 입력하세요"});
    }
    updateProfileMutation.mutate({ nickname, currentPassword, password, passwordConfirm });
  }

  return (
      <>
        {isSuccess ? (
          <StyledProfile.FormContainer onSubmit={ handleSubmit(handleProfileSubmit) }>
            <StyledProfile.Container400>
              <StyledProfile.NickNameInput 
                {...register("nickname", { 
                  required: "닉네임은 필수입니다.",
                })}
                onChange={handleNickChange}
              />
              {errors.nickname && <InputErrorMsg>{errors.nickname.message}</InputErrorMsg>}
            </StyledProfile.Container400>
            <StyledProfile.InfoListWrap>
              <StyledProfile.InfoList>
                <li>
                  <span>이메일</span>
                  <p>{data.email}</p>
                </li>
                <li>
                  <span>이름</span>
                  <p>{data.name}</p>
                </li>
                <li>
                  <span>비밀번호</span>
                  <StyledProfile.PwChangeBlock>
                    <StyledProfile.PwChangeInput 
                      {...register("currentPassword", {
                        minLength: { value: 6, message: "비밀번호를 6자 이상 입력하세요." }
                      })}
                      type="password"
                      placeholder="현재 비밀번호
                    "/>
                    <StyledProfile.PwChangeInput 
                      {...register("password", {
                        minLength: { value: 6, message: "비밀번호를 6자 이상 입력하세요." }
                      })}
                      type="password"
                      placeholder="새 비밀번호"/>
                    <StyledProfile.PwChangeInput 
                      {...register("passwordConfirm", {
                        validate: (passwordConfirm?: string) => {
                          const originPassword = getValues("password");
                          return passwordConfirm === originPassword || "비밀번호가 일치하지 않습니다.";
                        }
                      })}
                      type="password" 
                      placeholder="새 비밀번호 확인"/>
                    {errors.currentPassword && <InputErrorMsg>{errors.currentPassword.message}</InputErrorMsg>}
                    {errors.password && <InputErrorMsg>{errors.password.message}</InputErrorMsg>}
                    {!errors.password && errors.passwordConfirm && <InputErrorMsg>{errors.passwordConfirm.message}</InputErrorMsg>}
                    {!errors.passwordConfirm && errors.UpdateError && <InputErrorMsg>{errors.UpdateError.message}</InputErrorMsg>}
                  </StyledProfile.PwChangeBlock>
                </li>
              </StyledProfile.InfoList>
            </StyledProfile.InfoListWrap>
            <StyledProfile.SubmitButton>저장</StyledProfile.SubmitButton>
          </StyledProfile.FormContainer>
        ) : (
          <ProfileFormLoading />
        )}
      </> 
  )
}

