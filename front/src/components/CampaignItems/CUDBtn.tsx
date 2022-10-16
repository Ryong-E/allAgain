import styled from "styled-components";
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
  campaign_id : number;
}




export default function CUDBtn({JCTCenter, campaign_id}: JCTCenter) {
  return (
    <CUDBtnBox className={JCTCenter ? "JCTCenter" :""}>
        <DelButton onClick={()=>{}}>삭제</DelButton>
        <ConfirmButton>수정</ConfirmButton>
    </CUDBtnBox>
  )
}
