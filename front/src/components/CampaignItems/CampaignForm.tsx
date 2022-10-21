import ImageUpload from "./ImageUpload";
import styled from "styled-components";
import {
  ButtonBlock,
  ClsButton,
  ConfirmButton,
} from "../../components/common/Buttons";
import {
  InputBlock,
  InputErrorMsg,
  InputText,
  Label,
  Textarea,
} from "../../components/common/Form";
import RecruitDate from "./RecruitDate";
import QuillEditor from "./QuillEditor";
import { FieldValues, useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCampaign, updateCampaign } from "../../api/campaignApi";
import {
  CampaignDescription,
  ThumbnailBox,
  InputBox,
  InputNumberBox,
  InputNumber,
  DateFormBox,
  ButtonBox,
  InputErrorText,
  InputErrorBox,
} from "./CampaignForm.style";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GET_CAMPAIGNLIST } from "../../constant/queryKeys";
import { FormPropType, FormType } from "../../types/campaignTypes";
import { onCheckEnter } from "../../utils/enterPrevent";
import ErrorAlertModal from "../Modals/ErrorAlertModal";

export default function CampaignForm({
  thumbnail,
  title,
  content,
  recruitmentStartDate,
  recruitmentEndDate,
  campaignStartDate,
  campaignEndDate,
  recruitmentNumber,
  introduce,
  updateMod,
  campaignId,
}: FormPropType): JSX.Element {
  const [editorContent, setEditorContent] = useState<string>("");
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    setError,
    formState: { errors },
  } = useForm<FormType>();

  const updateCampainMutaion = useMutation(updateCampaign, {
    onError: (error: any) => {
      setShowModal(true);
    },
    onSuccess: (data: any) => {
      alert("캠페인 수정이 완료되었습니다");
      queryClient.invalidateQueries([GET_CAMPAIGNLIST]);
      queryClient.invalidateQueries(["detailCampaign"]);
      navigate(`/campaign/${campaignId}`);
    },
  });

  const createCampainMutaion = useMutation(createCampaign, {
    onError: (error: any) => {
      setShowModal(true);
    },
    onSuccess: (data: any) => {
      alert("캠페인 생성이 완료되었습니다");
      queryClient.invalidateQueries([GET_CAMPAIGNLIST]);
      navigate(`/campaign/${campaignId}`);
    },
  });

  function validation(data: FormType) {
    let isError = false;
    const re = data.content
      .replaceAll(/&lt;[a-z]*[0-9]?&gt;/g, "")
      .replaceAll(/&lt;\/[a-z]*[0-9]?&gt;/g, "");
    if (re.length < 1) {
      setError("content", {
        type: "custom",
        message: "캠페인 상세 설명을 입력해주세요",
      });
      isError = true;
    }
    if (data.recruitmentEndDate < data.recruitmentStartDate) {
      setError("recruitmentEndDate", {
        type: "custom",
        message: "모집 마감날짜가 모집 시작날짜보다 이전입니다",
      });
      isError = true;
    }
    if (data.campaignEndDate < data.campaignStartDate) {
      setError("campaignEndDate", {
        type: "custom",
        message: "캠페인 마감날짜가 캠페인 시작날짜보다 이전입니다",
      });
      isError = true;
    }
    if (data.campaignStartDate < data.recruitmentEndDate) {
      setError("campaignEndDate", {
        type: "custom",
        message: "캠페인 시작 날짜가 모집 마감날짜보다 이전입니다",
      });
      isError = true;
    }
    if (!updateMod) {
      if (data.thumbnail.length < 1) {
        setError("thumbnail", {
          type: "required",
          message: "썸네일 이미지를 삽입해주세요",
        });
        return false;
      }
    }
    return isError ? false : true;
  }
  const onValid = async (data: FormType) => {
    if (validation(data)) {
      const formData = new FormData();
      for (let [key, value] of Object.entries(data)) {
        if (key == "thumbnail") {
          formData.append("thumbnail", data.thumbnail[0]);
        } else if (key == "title") {
          formData.append("title", data.title.trim());
        } else {
          formData.append(key, value);
        }
      }
      if (updateMod) {
        formData.append("campaignId", `${campaignId}`);
        updateCampainMutaion.mutate({ formData, campaignId });
      } else {
        createCampainMutaion.mutate(formData);
      }
    }
  };

  useEffect(() => {
    const convert = content.replaceAll("&gt;", ">").replaceAll("&lt;", "<");
    setEditorContent(convert);
    setValue("content", convert);
  }, [content]);

  useEffect(() => {
    const convertHtml = editorContent
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");
    setValue("content", convertHtml);
  }, [editorContent]);

  return (
    <>
      <form encType="multipart/form-data" onSubmit={handleSubmit(onValid)} onKeyDown={onCheckEnter}>
        <CampaignDescription>
          <ThumbnailBox>
            <ImageUpload
              register={register}
              watch={watch}
              defaultvalue={thumbnail}
            />
            {errors.thumbnail && (
              <InputErrorBox>
                <InputErrorText>{errors.thumbnail.message}</InputErrorText>
              </InputErrorBox>
            )}
          </ThumbnailBox>
          <InputBox>
            <InputBlock>
              <Label>캠페인 이름</Label>
              <InputText
                {...register("title", {
                  required: "캠페인 이름을 입력해주세요",
                })}
                defaultValue={title ? (title as string) : ""}
              />
              {errors.title && (
                <InputErrorText>{errors.title.message}</InputErrorText>
              )}
            </InputBlock>
            <InputBlock>
              <Label>캠페인 간단 소개</Label>
              <Textarea
                style={{ minHeight: "140px" }}
                {...register("introduce", {
                  required: "캠페인 소개글을 작성해주세요",
                })}
                defaultValue={introduce ? (introduce as string) : ""}
                onKeyDown={(event)=>{event.stopPropagation();}}
              />
              {errors.introduce && (
                <InputErrorText>{errors.introduce.message}</InputErrorText>
              )}
            </InputBlock>
          </InputBox>
        </CampaignDescription>
        <InputBlock
          style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <Label>모집 기간</Label>
            <DateFormBox>
              <RecruitDate
                register={register}
                watch={watch}
                registername="recruitmentStartDate"
                setValue={setValue}
                trigger={trigger}
                errors={errors}
                defaultvalue={recruitmentStartDate}>
                시작 날짜
              </RecruitDate>
              <RecruitDate
                register={register}
                watch={watch}
                registername="recruitmentEndDate"
                setValue={setValue}
                trigger={trigger}
                defaultvalue={recruitmentEndDate}>
                마감 날짜
              </RecruitDate>
              {errors.recruitmentStartDate?.message ||
              errors.recruitmentEndDate?.message ? (
                <InputErrorBox>
                  <InputErrorText>
                    {errors.recruitmentStartDate?.message ||
                      errors.recruitmentEndDate?.message}
                  </InputErrorText>
                </InputErrorBox>
              ) : (
                ""
              )}
            </DateFormBox>
          </div>
          <div>
            <Label>모집 인원</Label>
            <InputNumberBox>
              <InputNumber
                type="number"
                {...register("recruitmentNumber", {
                  required: "모집 인원을 입력해주세요",
                })}
                defaultValue={
                  recruitmentNumber ? recruitmentNumber : ""
                }></InputNumber>
              <span>명</span>
              {errors.recruitmentNumber?.message && (
                <div>
                  <InputErrorText>
                    {errors.recruitmentNumber.message}
                  </InputErrorText>
                </div>
              )}
            </InputNumberBox>
          </div>
          <div>
            <Label>캠페인 기간</Label>
            <DateFormBox>
              <RecruitDate
                register={register}
                watch={watch}
                registername="campaignStartDate"
                setValue={setValue}
                trigger={trigger}
                defaultvalue={campaignStartDate}>
                시작 날짜
              </RecruitDate>
              <RecruitDate
                register={register}
                watch={watch}
                registername="campaignEndDate"
                setValue={setValue}
                trigger={trigger}
                defaultvalue={campaignEndDate}>
                마감 날짜
              </RecruitDate>
              {errors.campaignEndDate?.message ||
              errors.campaignStartDate?.message ? (
                <InputErrorBox>
                  <InputErrorText>
                    {errors.campaignEndDate?.message ||
                      errors.campaignStartDate?.message}
                  </InputErrorText>
                </InputErrorBox>
              ) : (
                ""
              )}
            </DateFormBox>
          </div>
        </InputBlock>
        <div style={{ position: "relative" }}>
          <QuillEditor
            handleEditorChange={setEditorContent}
            editorContent={editorContent}
            register={register}
          />
          {errors.content?.message && (
            <InputErrorBox style={{ bottom: "-50px" }}>
              <InputErrorText>{errors.content.message}</InputErrorText>
            </InputErrorBox>
          )}
        </div>
        <ButtonBox>
          <ClsButton
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              navigate(-1);
            }}>
            취소
          </ClsButton>
          <ConfirmButton type="submit">
            {updateMod ? "수정하기" : "생성하기"}
          </ConfirmButton>
        </ButtonBox>
      </form>
      {showModal && <ErrorAlertModal  content={`${updateMod ? "수정하기" : "생성하기"}가 실패하였습니다. 다시 한번 확인해주세요`} showModal={showModal} setShowModal={setShowModal}/>}
    </>
  );
}

CampaignForm.defaultProps = {
  campaignId: "",
  title: "",
  content: "",
  thumbnail: "",
  recruitmentStartDate: "",
  recruitmentEndDate: "",
  campaignStartDate: "",
  campaignEndDate: "",
  recruitmentNumber: "",
  introduce: "",
  status: "",
  writer: {
    nickname: "",
    imageUrl: "",
  },
  updateMod: false,
};
