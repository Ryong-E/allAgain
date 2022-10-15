import { useEffect, useState } from "react";
import { FieldValues, useForm, } from "react-hook-form";
import { Container, Container1300 } from "../../components/common/Containers";
import ImageUpload from "../../components/CampaignItems/ImageUpload";
import { InputBlock, InputErrorMsg, InputText, Label, Textarea } from "../../components/common/Form";
import styled from "styled-components";
import RecruitDate from "../../components/CampaignItems/RecruitDate";
import QuillEditor from "../../components/CampaignItems/QuillEditor";
import { useNavigate, useParams } from "react-router-dom";
import { CampaignItemType, createCampaign, getCampaignItem } from "../../api/campaignApi";
import { ButtonBlock, ClsButton, ConfirmButton } from "../../components/common/Buttons";
import { useQuery } from "@tanstack/react-query";
import { ppid } from "process";

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
const ButtonBox = styled(ButtonBlock)`
    justify-content:center;
    margin-top:100px;
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
    const [campaignUpdateData,setCampaignUpdateData] = useState<CampaignItemType>();
    const navigate = useNavigate();
    const {id} = useParams();
    const {isLoading} = useQuery(["userCampaign"], () => getCampaignItem(Number(id!)),{
        onSuccess(data){
            setCampaignUpdateData(data);
        }
    });

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        trigger,
        setError,
        formState:{errors}
    } = useForm<FormType>();
    function validation(data : FormType){
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
            for (let [key,value] of Object.entries(data)){
                if(key == 'thumbnail'){
                    formData.append('thumbnail',data.thumbnail[0]);
                }
                else{
                    formData.append(key,value);
                }
            }
            await createCampaign(formData);
            alert('캠페인 생성이 완료 되었습니다.');
            navigate('/campaign');
        };

    }

    useEffect(()=>{
        const convertHtml = editorContent.replaceAll("<", "&lt;").replaceAll(">","&gt;");
        console.log(convertHtml)
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
                                <ImageUpload register={register} watch={watch} defaultvalue={campaignUpdateData?.thumbnail!}/>
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
                                        <div>
                                            <RecruitDate register={register} watch={watch} registername="recruitmentStartDate" setValue={setValue} trigger={trigger} errors={errors}>시작날짜</RecruitDate>
                                        </div>
                                        <RecruitDate register={register} watch={watch} registername="recruitmentEndDate" setValue={setValue} trigger={trigger}>마감날짜</RecruitDate>
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
                        <QuillEditor handleEditorChange={setEditorContent} readStatus={false} editorContent={editorContent}/>
                        <ButtonBox>
                            <ClsButton onClick={(e)=>{e.preventDefault(); navigate('/campaign')}}>취소</ClsButton>
                            <ConfirmButton>생성하기</ConfirmButton>
                        </ButtonBox>
                    </form>
                </Container1300>
            </Container>
        </>
    )
}