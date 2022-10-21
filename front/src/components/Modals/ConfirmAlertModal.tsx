import { SetStateAction } from "react";
import styled, { keyframes } from "styled-components";
import { ClsButton, DelButton } from "../common/Buttons";

interface ConfirmAlertModalProps {
  content: string;
  showModal: boolean;
  setShowModal: React.Dispatch<SetStateAction<boolean>>;
  onClick: () => void;
}

function ConfirmAlertModal({
  content,
  showModal,
  setShowModal,
  onClick,
}: ConfirmAlertModalProps) {
  return (
    <ModalBack isActive={showModal}>
      <ModalContainer>
        <ModalMain>{content} 삭제하기</ModalMain>
        <ModalContent>정말로 삭제하시겠습니까?</ModalContent>
        <ButtonContainer>
          <DelButton onClick={onClick}>삭제하기</DelButton>
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

export default ConfirmAlertModal;
