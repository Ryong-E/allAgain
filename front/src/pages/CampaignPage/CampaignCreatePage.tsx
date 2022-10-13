import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Container, Container1300 } from "../../components/common/Containers";
import ImageUpload from "../../components/ImageUpload";
import parse from 'html-react-parser';
import { InputBlock, InputText, Label, Textarea } from "../../components/common/Form";
import styled from "styled-components";
import Editor from "../../components/CampaignItems/testEditor";
import RecruitDate from "../../components/CampaignItems/RecruitDate";

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

export default function CampaignCreatePage(){
    const [editorContent,setEditorContent] = useState<string>("");
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        trigger,
    } = useForm();

    const onValid = (data : FieldValues) => {
        console.log(data)
    }

    useEffect(()=>{
        setValue('content',editorContent);
        trigger('content')
        console.log(editorContent,'부모')
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
                                    <Textarea style={{minHeight:"140px"}}/>
                                </InputBlock>
                            </InputBox>
                        </CampaignDescription>
                        <Editor handleEditorChange={setEditorContent} value={editorContent}/>
                        <div>
                            <pre>{editorContent}</pre>
                        </div>
                        <div>
                            <button type="submit">제출하기</button>
                        </div>
                    </form>
                    <RecruitDate/>
                </Container1300>
            </Container>
        </>
    )
}