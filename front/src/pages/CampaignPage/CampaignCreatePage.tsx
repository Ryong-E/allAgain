import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import TextEditor from "../../components/CampaignItems/textEditor";
import { Container, Container1200 } from "../../components/common/Containers";
import ImageUpload from "../../components/ImageUpload";
import parse from 'html-react-parser';
import { InputBlock, InputText, Label, Textarea } from "../../components/common/Form";
import styled from "styled-components";

const CampaignDescription = styled.div`
    display:flex;
    width:100%;
    height:250px;
    margin-bottom:20px;
`
const ThumbnailBox = styled.div`
    margin-right:30px;
`
const InputBox = styled.div`
    width:60%;
    height:100%;
`

export default function CampaignCreatePage(){
    const [editorContent,setEditorContent] = useState<string>("달빛만이 흘러 바다가 된 이곳<ul><li>한 낮이 비춰 오를떄 까지</li></ul>");
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

    const onChangeEditor = (content : string) => {
        setEditorContent(content);
        setValue('content',editorContent);
        trigger('content')
    }

    return (
        <>
            <Container>
                <Container1200>
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
                                    <Textarea style={{minHeight:"90px"}}/>
                                </InputBlock>
                            </InputBox>
                        </CampaignDescription>
                        <TextEditor onChange={onChangeEditor} value={editorContent}/>
                        <button type="submit">제출하기</button>
                    </form>
                </Container1200>
            </Container>
        </>
    )
}