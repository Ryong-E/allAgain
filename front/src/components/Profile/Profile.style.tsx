import styled from "styled-components";
import { InputText } from "../common/Form";
import { SaveButton } from "../common/Buttons";
import EditIcon from "../../assets/images/icons/icon_image_edit.png"
import { User } from "../../api/types";

export const ProfileImageWrap = styled.div`
  padding: 170px 80px 30px;
`;

export const ImageFormContainer = styled.div`
  position: relative;
  width: 180px;
  height: 180px;
  margin: 0 auto;
`;

export const InputImage = styled.input`
  display: none;
  visibility: hidden;
`;

export const EditImageButton = styled.label`
  position: absolute;
  top: 0;
  right: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: url(${EditIcon}) no-repeat 60% 50%/65%;
  background-color: ${({ theme }) => theme.colors.dasidaGreen};
  box-shadow: 3px 3px 8px rgb(39, 66, 64, .4);
  cursor: pointer;
`;

export const PreviewImage = styled.div<User>`
  width: 100%;
  height: 100%;
  background: no-repeat 50% 50%/contain;
  background-image: url(${(props) => props.image_url});
  border-radius: 50%;
  border: 1px solid  #E7E5E0;
  over-flow: hidden;
`;

export const FormContainer = styled.form`
  margin: 0 auto;
`;

export const Container400 = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 0 40px;
  margin: 0 auto;
`;

export const NickNameInput = styled(InputText)`
  text-align: center;
  font-size: 16px;
`;

export const InfoListWrap = styled.div`
  background: #f7f4ea;
  padding: 60px 0;
  margin: 60px 0 0;
`;

export const InfoList = styled.ul`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;

  & > li {
    display: flex;
    padding: 20px 0;

    span {
      width: 40%;
    }

    span + * {
      width: 60%;
    }
  }
`;

export const PwChangeBlock = styled.div`
  ${InputText} {

  }
`;

export const PwChangeInput = styled(InputText)`
  padding: 12px 15px;
  & + & {
    margin-top: 10px;
  }
`;

export const WithdrawalWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  height: 140px;
  padding: 0 100px;
  margin: 0 0 60px;
`;

export const WithdrawalButton = styled.div`
  color: ${({ theme }) => theme.colors.lightBeige};
  cursor: pointer;
`;

export const WithdrawalConfirmBox = styled.div`
  background: #${({ theme }) => theme.colors.bodyBg};
  color: ${({ theme }) => theme.colors.brown};
  border-radius: 5px;

  & > div {
    text-align: right;
    margin-top: 10px;
  }
`;

interface ButtonProps {
  btnType: string
}

export const WithdrawalConfirmButton = styled.button<ButtonProps>`
  background: ${(props) => props.btnType == "ok" ? "#ED5C48" : ""};
  color: ${(props) => props.btnType == "ok" ? "#fff" : ""};
  // font-weight: ${(props) => props.btnType == "ok" ? "700" : ""};
  padding: 4px 6px;
  cursor: pointer;

  & + & {
    margin-left: 10px;
  }
`;

export const SubmitButton = styled(SaveButton)`
  margin-top: 40px;
`;