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
} from "./CampaignForm.style";

interface FormType {
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
  function validation(data: FormType) {
    if (data.recruitmentEndDate < data.recruitmentStartDate) {
      setError("recruitmentEndDate", {
        type: "custom",
        message: "마감날짜가 시작날짜보다 이전입니다",
      });
      return false;
    }
    if (data.campaignEndDate < data.campaignStartDate) {
      setError("campaignEndDate", {
        type: "custom",
        message: "마감날짜가 시작날짜보다 이전입니다",
      });
      return false;
    }
    if (data.campaignStartDate < data.recruitmentStartDate) {
      setError("campaignEndDate", {
        type: "custom",
        message: "캠페인 시작 날짜가 모집 날짜보다 이전입니다",
      });
      return false;
    }
    return true;
  }
  useEffect(() => {
    const convert = content.replaceAll("&gt;", ">").replaceAll("&lt;", "<");
    console.log(convert, "변환 데이터");
    setEditorContent(convert);
    setValue("content", convert);
  }, [content]);

  const onValid = async (data: FormType) => {
    console.log(data);
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
    console.log(err);
  }

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    setError,
    formState: { errors },
  } = useForm<FormType>();

  useEffect(() => {
    const convertHtml = editorContent
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");
    setValue("content", convertHtml);
    trigger("content");
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
            </InputBlock>
            <InputBlock>
              <Label>캠페인 소개</Label>
              <Textarea
                style={{ minHeight: "140px" }}
                {...register("introduce", {
                  required: "캠페인 소개글을 작성해주세요",
                })}
                defaultValue={introduce ? (introduce as string) : ""}
              />
            </InputBlock>
          </InputBox>
        </CampaignDescription>
        <InputBlock
          style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <Label>모집 기간</Label>
            <DateFormBox>
              <div>
                <RecruitDate
                  register={register}
                  watch={watch}
                  registername="recruitmentStartDate"
                  setValue={setValue}
                  trigger={trigger}
                  errors={errors}
                  defaultvalue={recruitmentStartDate}>
                  시작날짜
                </RecruitDate>
              </div>
              <RecruitDate
                register={register}
                watch={watch}
                registername="recruitmentEndDate"
                setValue={setValue}
                trigger={trigger}
                defaultvalue={recruitmentEndDate}>
                마감날짜
              </RecruitDate>
            </DateFormBox>
          </div>
          <div>
            <Label>모집 인원</Label>
            <InputNumberBox>
              <InputNumber
                type="number"
                {...register("recruitmentNumber")}
                defaultValue={
                  recruitmentNumber ? recruitmentNumber : ""
                }></InputNumber>
              <span>명</span>
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
            </DateFormBox>
          </div>
        </InputBlock>
        <QuillEditor
          handleEditorChange={setEditorContent}
          editorContent={editorContent}
        />
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
