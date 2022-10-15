import { useEffect, useState } from "react";
import { FieldValues, useForm, UseFormResetField } from "react-hook-form";
import { Container, Container1300 } from "../../components/common/Containers";
import ImageUpload from "../../components/CampaignItems/ImageUpload";
import parse from 'html-react-parser';
import { InputBlock, InputText, Label, Textarea } from "../../components/common/Form";
import styled from "styled-components";
import Editor from "../../components/CampaignItems/testEditor";
import RecruitDate from "../../components/CampaignItems/RecruitDate";
import axios from "axios";
import QuillEditor from "../../components/CampaignItems/QuillEditor";
import { useParams } from "react-router-dom";
import { createCampaign } from "../../api/campaignApi";
import { idText } from "typescript";

const CampaignDescription = styled.div`
    display:flex;
    width:100%;
    height:300px;
    margin-bottom:20px;
    margin-top:200px;
    justify-content:space-between;
`
const ThumbnailBox = styled.div`
`
const InputBox = styled.div`
    width:880px;
    height:100%;
`
const InputNumber = styled(InputText)`
    width:150px;
    padding-right:30px;
    text-align:right;
    &::-webkit-outer-spin-button{
        -webkit-appearance:none;
    }
    &::-webkit-inner-spin-button{
        -webkit-appearance:none;
    }
`
const InputNumberBox = styled.div`
    position:relative;
    & span{
        position:absolute;
        right:10px;
        top:50%;
        transform:translateY(-50%);
        color:black;
    }
`
const DateFormBox = styled.div`
    display:flex;
    justify-content:space-between;
    width:350px;
`

export interface FormType{
    thumbnail:File[];
    title:string;
    content:string;
    recruitmentStartDate:string;
    recruitmentEndDate:string;
    campaignStartDate:string;
    campaignEndDate:string;
    recruitmentNumber:string;
    introduce:string;
}
export default function CampaignCreatePage(){
    const [editorContent,setEditorContent] = useState<string>("");
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        trigger,
        setError,
        formState:{errors}
    } = useForm<FormType>();
    function validation(data : FieldValues){
        if(data.recruitmentEndDate < data.recruitmentStartDate){
            setError('recruitmentEndDate',{type:"custom",message:"마감날짜가 시작날짜보다 이전입니다"})
            return false
        }
        if(data.campaignEndDate < data.campaignStartDate){
            setError('campaignEndDate',{type:"custom",message:"마감날짜가 시작날짜보다 이전입니다"})
            return false
        }
        if(data.campaignStartDate < data.recruitmentStartDate){
            setError('campaignEndDate',{type:"custom",message:"캠페인 시작 날짜가 모집 날짜보다 이전입니다"})
            return false
        }
        return true
    }

    const onValid = async (data : FormType) => {
        console.log(data)
        if(validation(data)){
            const formData = new FormData()
            // formData.append('title',data.title);
            // formData.append('thumbnail',data.thumbnail[0]);
            // formData.append('recruitmentStartDate',data.recruitmentStartDate);
            // formData.append('recruitmentEndDate',data.recruitmentEndDate);
            // formData.append('recruitmentNumber',data.recruitmentNumber);
            // formData.append('introduce',data.introduce);
            // formData.append('content',data.content);
            // formData.append('campaignStartDate',data.campaignStartDate);
            // formData.append('campaignEndDate',data.campaignEndDate);
            for (let [key,value] of Object.entries(data)){
                if(key == 'thumbnail'){
                    formData.append('thumbnail',data.thumbnail[0]);
                }
                else{
                    formData.append(key,value);
                }
            }
            await createCampaign(formData)
            alert('캠페인 생성이 완료 되었습니다.');
        };

    }

    useEffect(()=>{
        const convertHtml = editorContent.replaceAll("<", "&lt;").replaceAll(">","&gt;");
        setValue('content',convertHtml);
        trigger('content')
    },[editorContent])


    return (
        <>
            <Container>
                <Container1300>
                    <form encType="multipart/form-data" onSubmit={handleSubmit(onValid)}>
                        <CampaignDescription>
                            <ThumbnailBox>
                                <ImageUpload register={register} watch={watch}/>
                            </ThumbnailBox>
                            <InputBox>
                                <InputBlock>
                                    <Label>캠페인 이름</Label>
                                    <InputText {...register('title',{required:"캠페인 이름을 입력해주세요"})}/>
                                </InputBlock>
                                <InputBlock>
                                    <Label>캠페인 소개</Label>
                                    <Textarea style={{minHeight:"140px"}} {...register('introduce',{required:"캠페인 소개글을 작성해주세요"})}/>
                                </InputBlock>
                            </InputBox>
                        </CampaignDescription>
                            <InputBlock style={{display:"flex", justifyContent:"space-between"}}>
                                <div>
                                    <Label>모집 기간</Label>
                                    <DateFormBox>
                                        <RecruitDate register={register} watch={watch} registername="recruitmentStartDate" setValue={setValue} trigger={trigger}>시작날짜</RecruitDate>
                                        <RecruitDate register={register} watch={watch} registername="recruitmentEndDate" setValue={setValue} trigger={trigger}>마감날짜</RecruitDate>
                                        {errors.recruitmentEndDate && <span>{errors.recruitmentEndDate.message}</span>}
                                    </DateFormBox>
                                </div>
                                <div>
                                    <Label>모집 인원</Label>
                                    <InputNumberBox>
                                        <InputNumber type="number" {...register('recruitmentNumber')}></InputNumber>
                                        <span>명</span>
                                    </InputNumberBox>
                                </div>
                                <div>
                                    <Label>캠페인 기간</Label>
                                    <DateFormBox>
                                        <RecruitDate register={register} watch={watch} registername="campaignStartDate" setValue={setValue} trigger={trigger}>시작 날짜</RecruitDate>
                                        <RecruitDate register={register} watch={watch} registername="campaignEndDate" setValue={setValue} trigger={trigger}>마감 날짜</RecruitDate>
                                    </DateFormBox>
                                </div>
                            </InputBlock>
                        {/* <Editor handleEditorChange={setEditorContent} value={editorContent} readStatus={false}/> */}
                        <QuillEditor handleEditorChange={setEditorContent} readStatus={false} editorContent={editorContent}/>
                        <div>
                            <button type="submit">제출하기</button>
                        </div>
                    </form>
                </Container1300>
            </Container>
        </>
    )
}