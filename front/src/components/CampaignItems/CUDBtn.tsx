import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { deleteCampaignItem } from "../../api/campaignApi";
import { GET_CAMPAIGNLIST } from "../../constant/queryKeys";
import { ROUTE } from "../../constant/route";
import { ButtonBlock, ConfirmButton, DelButton } from "../common/Buttons";
import ConfirmAlertModal from "../Modals/ConfirmAlertModal";
const CUDBtnBox = styled(ButtonBlock)`
  justify-content: flex-end;
  margin: 0 0 30px;
  &.JCTCenter{
    justify-content: center;
    margin: 30px 0;
  }
  > button + a {
    margin-left: 10px;
  }
`;



interface JCTCenter  {
  JCTCenter ?: Boolean;
  campaignId : number ;
  state : string ;
}





export default function CUDBtn({JCTCenter, campaignId, state}: JCTCenter) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const deleteMutaion =  useMutation(deleteCampaignItem,{
    onSuccess: (data: any, variables, context) => {
      queryClient.invalidateQueries([GET_CAMPAIGNLIST]);
      if(state){
        navigate(state);
      }else{
        navigate(ROUTE.CAMPAGIN_LIST.link);
      }
    }
  });
  const onClick = ()=>{
    deleteMutaion.mutate(campaignId);
  }
  return (
    <CUDBtnBox className={JCTCenter ? "JCTCenter" :""}>
        <DelButton onClick={()=>{setShowModal(true)}}>삭제</DelButton>
        <Link to={`${ROUTE.CAMPAGIN_UPDATE.link}${campaignId}`}>
          <ConfirmButton>
            수정
          </ConfirmButton>
        </Link>
        {showModal && <ConfirmAlertModal content={"캠페인"} showModal={showModal} setShowModal={setShowModal} onClick={onClick} />}
    </CUDBtnBox>
  )
}
