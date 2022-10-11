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


type JCTCenterType = {
  JCTCenter ?: Boolean;
}

export default function CUDBtn({JCTCenter}: JCTCenterType) {
  return (
    <CUDBtnBox className={JCTCenter ? "JCTCenter" :""}>
        <DelButton>삭제</DelButton>
        <ConfirmButton>수정</ConfirmButton>
    </CUDBtnBox>
  )
}
