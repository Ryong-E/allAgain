import styled from "styled-components"
import { ButtonBlock, ClsButton, ConfirmButton } from "../../components/common/Buttons";
import { InputBlock, InputErrorMsg, InputText, Label, Textarea } from "../../components/common/Form";

export const CampaignDescription = styled.div`
    display:flex;
    width:100%;
    height:300px;
    margin-bottom:100px;
    margin-top:200px;
    justify-content:space-between;
`
export const ThumbnailBox = styled.div`
    position:relative;
`
export const InputBox = styled.div`
    width:880px;
    height:100%;
`
export const InputNumber = styled(InputText)`
    width:180px;
    padding-right:30px;
    text-align:right;
    &::-webkit-outer-spin-button{
        -webkit-appearance:none;
    }
    &::-webkit-inner-spin-button{
        -webkit-appearance:none;
    }
`
export const InputNumberBox = styled.div`
    position:relative;
    & span{
        position:absolute;
        right:10px;
        top:50%;
        transform:translateY(-50%);
        color:black;
    }
`
export const DateFormBox = styled.div`
    position:relative;
    display:flex;
    justify-content:space-between;
    width:350px;
`
export const ButtonBox = styled(ButtonBlock)`
    justify-content:center;
    margin-top:100px;
`
export const InputErrorText = styled(InputErrorMsg)`
    position:absolute;

`
export const InputErrorBox = styled.div`
    position:absolute;
    left:0;
    bottom:0;
    width:320px;
`