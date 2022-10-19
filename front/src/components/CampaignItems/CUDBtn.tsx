import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { deleteCampaignItem } from "../../api/campaignApi";
import { GET_CAMPAIGNLIST } from "../../constant/queryKeys";
import { ROUTE } from "../../constant/route";
import { ButtonBlock, ConfirmButton, DelButton } from "../common/Buttons";
const CUDBtnBox = styled(ButtonBlock)`
  justify-content: flex-end;
  margin: 0 0 30px;
  &.JCTCenter{
    justify-content: center;
    margin: 30px 0;
  }
  button + a {
    margin-left: 10px;
  }
`;



interface JCTCenter  {
  JCTCenter ?: Boolean;
  campaignId : number ;
}





export default function CUDBtn({JCTCenter, campaignId}: JCTCenter) {
  const navigate = useNavigate();
    const queryClient = useQueryClient();
  const deleteMutaion =  useMutation(deleteCampaignItem,{
    onSuccess: (data: any, variables, context) => {
      queryClient.invalidateQueries([GET_CAMPAIGNLIST]);
      navigate(ROUTE.CAMPAGIN_LIST.link);
    }
  });
  const handleOnClickDelete = (campaignId : number)=>{
    if (window.confirm("해당 캠페인을 삭제하시겠습니까?")) {
      deleteMutaion.mutate(campaignId);
    }
  }
  return (
    <CUDBtnBox className={JCTCenter ? "JCTCenter" :""}>
        <DelButton onClick={()=>{handleOnClickDelete(campaignId)}}>삭제</DelButton>
        <Link to={`${ROUTE.CAMPAGIN_UPDATE.link}${campaignId}`}>
          <ConfirmButton>
            수정
          </ConfirmButton>
        </Link>
    </CUDBtnBox>
  )
}
