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

interface FormType{
    image:File[];
    content:string;
    recruitStart:string;
    recruitEnd:string;
    progressStart:string;
    progressEnd:string;
    volume:number;
    campaignDesc:string;
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
        if(data.recruitEnd < data.recruitStart){
            setError('recruitEnd',{type:"custom",message:"마감날짜가 시작날짜보다 이전입니다"})
            return false
        }
        if(data.progressEnd < data.progressStart){
            return false
        }
        return true
    }

    const onValid = (data : FieldValues) => {
        console.log(data)
        if(validation(data)){
            console.log('에러없음')
        };

    }

    useEffect(()=>{
        setValue('content',editorContent);
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
                                    <InputText/>
                                </InputBlock>
                                <InputBlock>
                                    <Label>캠페인 소개</Label>
                                    <Textarea style={{minHeight:"140px"}} {...register('campaignDesc')}/>
                                </InputBlock>
                            </InputBox>
                        </CampaignDescription>
                            <InputBlock style={{display:"flex", justifyContent:"space-between"}}>
                                <div>
                                    <Label>모집 기간</Label>
                                    <DateFormBox>
                                        <RecruitDate register={register} watch={watch} registername="recruitStart" setValue={setValue} trigger={trigger}>시작날짜</RecruitDate>
                                        <RecruitDate register={register} watch={watch} registername="recruitEnd" setValue={setValue} trigger={trigger}>마감날짜</RecruitDate>
                                        {errors.recruitEnd && <span>{errors.recruitEnd.message}</span>}
                                    </DateFormBox>
                                </div>
                                <div>
                                    <Label>모집 인원</Label>
                                    <InputNumberBox>
                                        <InputNumber type="number" {...register('volume')}></InputNumber>
                                        <span>명</span>
                                    </InputNumberBox>
                                </div>
                                <div>
                                    <Label>캠페인 기간</Label>
                                    <DateFormBox>
                                        <RecruitDate register={register} watch={watch} registername="progressStart" setValue={setValue} trigger={trigger}>시작 날짜</RecruitDate>
                                        <RecruitDate register={register} watch={watch} registername="progressEnd" setValue={setValue} trigger={trigger}>마감 날짜</RecruitDate>
                                    </DateFormBox>
                                </div>
                            </InputBlock>
                        <Editor handleEditorChange={setEditorContent} value={editorContent}/>
                        <div>
                            <pre>{editorContent}</pre>
                        </div>
                        <div>
                            <button type="submit">제출하기</button>
                        </div>
                    </form>
                </Container1300>
            </Container>
        </>
    )
}