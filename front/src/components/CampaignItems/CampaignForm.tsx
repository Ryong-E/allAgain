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
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CampaignItemType,
  createCampaign,
  updateCampaign,
} from "../../api/campaignApi";
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

export interface FormType {
  thumbnail: File[];
  title: string;
  content: string;
  recruitmentStartDate: string;
  recruitmentEndDate: string;
  campaignStartDate: string;
  campaignEndDate: string;
  recruitmentNumber: string;
  introduce: string;
}
interface FormPropType {
  campaignId: Number;
  title: String;
  content: String;
  thumbnail?: String | null | undefined;
  recruitmentStartDate: Date;
  recruitmentEndDate: Date;
  campaignStartDate: Date;
  campaignEndDate: Date;
  recruitmentNumber: number;
  introduce: String;
  status: String;
  writer: {
    nickname: String;
    imageUrl?: String;
  };
  updateMod: Boolean;
}
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
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    setError,
    formState: { errors },
  } = useForm<FormType>();

  function validation(data: FormType) {
    console.log(/^\&lt\;([a-z])*\&gt\;$/.exec("&lt;p&gt;"))
    console.log(data.content.replaceAll(/^&lt;[a-z]*&gt;$/g , ""))
    if(data.content.length<32){
        return false
    }
    if (data.recruitmentEndDate < data.recruitmentStartDate) {
      console.log('마감날짜 시작날짜보다 오류')
      setError("recruitmentEndDate", {
        type: "custom",
        message: "마감날짜가 시작날짜보다 이전입니다",
      });
      return false
    }
    if (data.campaignEndDate < data.campaignStartDate) {
      setError("campaignEndDate", {
        type: "custom",
        message: "캠페인마감날짜가 시작날짜보다 이전입니다",
      });
      return false
    }
    if (data.campaignStartDate < data.recruitmentStartDate) {
      setError("campaignEndDate", {
        type: "custom",
        message: "캠페인 시작 날짜가 모집 시작날짜보다 이전입니다",
      });
      return false
    }
    if(!updateMod){
        console.log(data)
        if(data.thumbnail.length < 1){
            setError('thumbnail',{
                type:"required",
                message:"썸네일 이미지를 삽입해주세요"
            })
            return false
        }
    }
    return true;
  }
  const onValid = async (data: FormType) => {
    console.log(data);
    console.log('확인절차 시작')
    if (validation(data)) {
      const formData = new FormData();
      for (let [key, value] of Object.entries(data)) {
        if (key == "thumbnail") {
          formData.append("thumbnail", data.thumbnail[0]);
        } else {
          formData.append(key, value);
        }
      }
      if (updateMod) {
        formData.append("campaignId", `${campaignId}`);
        await updateCampaign(formData);
        alert("캠페인 수정이 완료 되었습니다.");
        navigate("/campaign");
      } else {
        await createCampaign(formData);
        alert("캠페인 생성이 완료 되었습니다.");
        navigate("/campaign");
      }
    }
  };

  function onInvalid(err: any) {
    console.log('제출 오류 모음')
    console.log(err);
  }


  useEffect(() => {
    const convert = content.replaceAll("&gt;", ">").replaceAll("&lt;", "<");
    console.log(convert, "변환 데이터");
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
      <form
        encType="multipart/form-data"
        onSubmit={handleSubmit(onValid, onInvalid)}>
        <CampaignDescription>
          <ThumbnailBox>
            <ImageUpload
              register={register}
              watch={watch}
              defaultvalue={thumbnail}
            />
            {errors.thumbnail && <InputErrorBox><InputErrorText>{errors.thumbnail.message}</InputErrorText></InputErrorBox>}
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
              {errors.title && <InputErrorText>{errors.title.message}</InputErrorText>}
            </InputBlock>
            <InputBlock>
              <Label>캠페인 간단 소개</Label>
              <Textarea
                style={{ minHeight: "140px" }}
                {...register("introduce", {
                  required: "캠페인 소개글을 작성해주세요",
                })}
                defaultValue={introduce ? (introduce as string) : ""}
              />
              {errors.introduce && <InputErrorText>{errors.introduce.message}</InputErrorText>}
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
                  defaultvalue={recruitmentStartDate}
                  >
                  시작 날짜
                </RecruitDate>
              <RecruitDate
                register={register}
                watch={watch}
                registername="recruitmentEndDate"
                setValue={setValue}
                trigger={trigger}
                defaultvalue={recruitmentEndDate}
                >
                마감 날짜
              </RecruitDate>
              {errors.recruitmentStartDate?.message || errors.recruitmentEndDate?.message ? <InputErrorBox><InputErrorText>{errors.recruitmentStartDate?.message || errors.recruitmentEndDate?.message}</InputErrorText></InputErrorBox> : ""}
            </DateFormBox>
          </div>
          <div>
            <Label>모집 인원</Label>
            <InputNumberBox>
              <InputNumber
                type="number"
                {...register("recruitmentNumber",{
                    required:"모집 인원을 입력해주세요"
                })}
                defaultValue={
                  recruitmentNumber ? recruitmentNumber : ""
                }></InputNumber>
              <span>명</span>
              {errors.recruitmentNumber?.message && <div><InputErrorText>{errors.recruitmentNumber.message}</InputErrorText></div>}
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
              {errors.campaignEndDate?.message || errors.campaignStartDate?.message ? <InputErrorBox><InputErrorText>{errors.campaignEndDate?.message || errors.campaignStartDate?.message}</InputErrorText></InputErrorBox> : ""}
            </DateFormBox>
          </div>
        </InputBlock>
        <div style={{position:"relative"}}>
        <QuillEditor
          handleEditorChange={setEditorContent}
          editorContent={editorContent}
          register={register}
        />
        {errors.content?.message && <InputErrorBox><InputErrorText>{errors.content.message}</InputErrorText></InputErrorBox>}
        </div>
        <ButtonBox>
          <ClsButton
            onClick={(e) => {
              e.preventDefault();
              navigate("/campaign");
            }}>
            취소
          </ClsButton>
          <ConfirmButton type="submit">생성하기</ConfirmButton>
        </ButtonBox>
      </form>
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
