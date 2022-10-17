import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { deleteCampaignItem } from "../../api/campaignApi";
import { ButtonBlock, ConfirmButton, DelButton } from "../common/Buttons";
const CUDBtnBox = styled(ButtonBlock)`
  justify-content: flex-end;
  margin: 0 0 30px;
  &.JCTCenter{
    justify-content: center;
    margin: 30px 0;
  }
  button + button {
    margin-left: 10px;
  }
`;



interface JCTCenter  {
  JCTCenter ?: Boolean;
  campaignId : number ;
}





export default function CUDBtn({JCTCenter, campaignId}: JCTCenter) {
  const navigate = useNavigate();
  const deleteMutaion =  useMutation(deleteCampaignItem);
  const handleOnClickDelete = (campaignId : number)=>{
    deleteMutaion.mutate(campaignId);
    navigate("/campaign");
  }
  return (
    <CUDBtnBox className={JCTCenter ? "JCTCenter" :""}>
        <DelButton onClick={()=>{handleOnClickDelete(campaignId)}}>삭제</DelButton>
        <ConfirmButton>수정</ConfirmButton>
    </CUDBtnBox>
  )
}
