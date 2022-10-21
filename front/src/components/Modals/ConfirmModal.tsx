import { SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { ROUTE } from "../../constant/route";
import { ClsButton, ConfirmButton } from "../common/Buttons";

interface ConfirmModalProps {
  returnPath: string;
  showModal: boolean;
  setShowModal: React.Dispatch<SetStateAction<boolean>>;
}

function ConfirmModal({
  returnPath,
  showModal,
  setShowModal,
}: ConfirmModalProps) {
  const navigator = useNavigate();
  console.log(returnPath)
  return (
    <ModalBack isActive={showModal}>
      <ModalContainer>
        <ModalMain>로그인 후 이용 가능한 기능입니다</ModalMain>
        <ModalContent>
          해당 기능은 로그인 후에 이용할 수 있습니다. <br />
          로그인으로 이동하시겠습니까?
        </ModalContent>
        <ButtonContainer>
          <ConfirmButton
            onClick={() => navigator(ROUTE.LOGIN.link, { state: returnPath })}>
            로그인
          </ConfirmButton>
          <ClsButton onClick={() => setShowModal(false)}>닫기</ClsButton>
        </ButtonContainer>
      </ModalContainer>
      <ModalDisableBack onClick={() => setShowModal(false)} />
    </ModalBack>
  );
}

const BackFadeIn = keyframes`
0% {
  opacity: 0;
}
33% {
  opacity: 0.5;
}
100% {
  opacity: 1;
}
`;
const ModalBack = styled.div<{ isActive?: boolean }>`
  position: fixed;
  width: 100vw;
  height: 100vh;
  display: ${({ isActive }) => (isActive ? "flex" : "none")};
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 9999;
  left: 0;
  top: 0;
  animation: ${BackFadeIn} ease-out 0.3s;
`;
const ModalDisableBack = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vw;
  top: 0;
  left: 0;
`;
const BoxSlideIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(30px)
  }
  33% {
    opacity: 0.5;
    transform: translateY(15px)
  }
  100% {
    opacity: 1;
    transform: translateY(0px)
  }
`;
const ModalContainer = styled.div`
  margin: auto;
  padding: 38px 50px;
  width: 450px;
  height: 280px;
  background: #f9f7f2;
  box-shadow: 10px 10px 15px rgba(162, 190, 231, 0.25);
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  animation: ${BoxSlideIn} ease-out 0.3s;
  z-index: 10000;
  justify-content: space-between;
`;
const ModalMain = styled.div`
  width: 100%;
  height: 43px;
  border-bottom: 1px solid #dcdcdc;
  display: flex;
  justify-content: center;
  font-weight: 500;
  font-size: 20px;
  line-height: 40px;
  align-items: center;
  text-align: center;
`;
const ModalContent = styled.div`
  height: 80px;
  text-align: center;
`;
const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export default ConfirmModal;
